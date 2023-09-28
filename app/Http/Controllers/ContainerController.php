<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use App\Models\Deployment;

class ContainerController extends Controller
{
    /**
    * Show virtual servers 
    * List container's ID, RAM/CPU/HDD resources, status
    */
    public function index()
    {
        $deployments = DB::table('deployments')->get();
        return response()->json($deployments);
    }
        
    /**
    * Deploy new virtual server
    * API for VPS deployment. Set operating system & root password, IPv4 address, 
    * hostname, number of vCPU cores, memory, swap & disk size.
    */
    public function create(Request $request)
    {
        try 
        {
            //API request variables
            $template = $request->input('template');
            $ip_address = $request->input('ip_address');
            $hostname = $request->input('hostname');
            $vcpu = $request->input('vcpu');
            $memory = $request->input('memory');
            $swap = $request->input('swap');
            $disk_size = $request->input('disk_size');
            $password = $request->input('password');
            $autopower = $request->has('autopower'); 
            $networkprotection = $request->has('networkprotection');
            $container_id = rand(100, 999);

            /**
            * Error handling
            * It must be checked that the container ID is not repeated. 
            * The container ID is a unique identifier.
            */
            $existingContainerIds = DB::table('deployments')->pluck('container_id')->toArray();
            if (in_array($container_id, $existingContainerIds)) 
            {
                return response()->json(['message' => 'Error: the generated VPS ID already exists. Try again!'], 400);
            }
            else
            {

                //Insert variables into the SQL database
                $deployment = new Deployment();
                $deployment->container_id = $container_id; 
                $deployment->template = $template;
                $deployment->ip_address = $ip_address;
                $deployment->vcpu = $vcpu;
                $deployment->memory = $memory;
                $deployment->swap = $swap;
                $deployment->disk_size = $disk_size;
                $deployment->save();

                //Create the VPS
                $deploymentCommand = "/usr/bin/sudo /usr/sbin/vzctl create {$container_id} --ostemplate {$template}
                /usr/bin/sudo /usr/sbin/vzctl set {$container_id} --cpus {$vcpu} --ram {$memory}G --swap {$swap}M --diskspace {$disk_size}G:{$disk_size}G --save
                /usr/bin/sudo /usr/sbin/vzctl set {$container_id} --hostname {$hostname} --ipadd {$ip_address} --nameserver 8.8.8.8 --nameserver 8.8.4.4 --save
                /usr/bin/sudo /usr/sbin/vzctl set {$container_id} --userpasswd root:{$password} --save
                /usr/bin/sudo /usr/sbin/vzctl start {$container_id}"; 
                $result = shell_exec($deploymentCommand);

                /**
                * VPS autopower
                * Automatically start the virtual server 
                * when the physical server machine starts.
                */
                if ($autopower === true) 
                {
                    $autopowerCommand = "/usr/bin/sudo /usr/sbin/vzctl set {$container_id} --onboot yes --save";
                    shell_exec($autopowerCommand);
                }

                /**
                * Default network protection
                * Enable iptables for network protection. 
                * This provides an external protection for the VPS.
                */
                if ($networkprotection === true) 
                {
                    $protectionCommand = "/usr/bin/sudo /usr/sbin/vzctl set {$container_id} --iptables ipt_REJECT --iptables ipt_tos --iptables ipt_TOS --iptables ipt_LOG --iptables ip_conntrack --iptables ipt_limit --iptables ipt_multiport --iptables iptable_filter --iptables iptable_mangle --iptables ipt_TCPMSS --iptables ipt_tcpmss --iptables ipt_ttl --iptables ipt_length --iptables ipt_state --iptables iptable_nat --iptables ip_nat_ftp --save";
                    shell_exec($protectionCommand);
                }

                //Storage first root password for WebSSH connection
                $password = base64_encode($password);
                shell_exec("/usr/bin/sudo sh -c 'echo {$password} >> /var/nextcaligo/container_keys/{$container_id}.key'");

                //Feedback to the enduser
                if ($result !== null) 
                {
                    //Success
                    return response()->json(['message' => 'VPS successfully created. It may take a minute to install the system.'], 200);
                } 
                else 
                {
                    //Error
                    return response()->json(['message' => "An error occurred while executing the command ({$container_id} : {$template})"], 500);
                }
            }
        }
        catch (\Exception $e) 
        {
            //PHP API error messages (Internal Server Error)
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    /**
     * Show container details by ID
    */
    public function show($id)
    {
        $container = Deployment::find($id);

        if (!$container) 
        {
            return response()->json(['message' => 'VPS not found.'], 404);
        }
    
        return response()->json($container);
    }

    //Start VPS
    public function start($id)
    {
        $container_id = DB::table('deployments')
        ->where('id', $id)
        ->value('container_id');

        shell_exec("/usr/bin/sudo /usr/sbin/vzctl start {$container_id} > /dev/null 2>&1");
    }

    public function stop($id)
    {
        $container_id = DB::table('deployments')
        ->where('id', $id)
        ->value('container_id');

        shell_exec("/usr/bin/sudo /usr/sbin/vzctl stop {$container_id} > /dev/null 2>&1");
    }

    public function restart($id)
    {
        $container_id = DB::table('deployments')
        ->where('id', $id)
        ->value('container_id');

        shell_exec("/usr/bin/sudo /usr/sbin/vzctl restart {$container_id} > /dev/null 2>&1");
    }

    /**
    * VPS server resource stats
    */

    //Memory 
    public function memory($id)
    {

        $container_id = DB::table('deployments')
        ->where('id', $id)
        ->value('container_id');

        $status = shell_exec("/usr/bin/sudo /usr/sbin/vzctl status {$container_id}");
        if (!str_contains($status, "running"))
        {
            return response()->json([
                'message' => 'This VPS powered off.'
            ], 200);
        } 
        else
        {
            $memory_usage = shell_exec("/usr/bin/sudo /usr/sbin/vzctl exec {$container_id} free -m | awk 'NR==2{print $3/$2*100}'");
            return response()->json(['memory_usage' => round($memory_usage, 2)]);
        }
    }

    //CPU
    public function cpu($id)
    {

        $container_id = DB::table('deployments')
        ->where('id', $id)
        ->value('container_id');

        $status = shell_exec("/usr/bin/sudo /usr/sbin/vzctl status {$container_id}");
        if (!str_contains($status, "running"))
        {
            return response()->json([
                'message' => 'This VPS powered off.'
            ], 200);
        } 
        else
        {
            $cpu_usage = shell_exec("/usr/bin/sudo /usr/sbin/vzctl exec {$container_id} top -bn1 | grep 'Cpu(s)' | awk '{print $2 + $4}'");
            return response()->json(['cpu_usage' => $cpu_usage]);
        }

    }

    //Disk read/write
    public function disk_rw($id)
    {

        $container_id = DB::table('deployments')
        ->where('id', $id)
        ->value('container_id');

        $status = shell_exec("/usr/bin/sudo /usr/sbin/vzctl status {$container_id}");
        if (!str_contains($status, "running"))
        {
            return response()->json([
                'message' => 'This VPS powered off.'
            ], 200);
        } 
        else
        {
            //Disk read
            $disk_read = shell_exec("/usr/bin/sudo /usr/sbin/vzctl exec {$container_id} cat /proc/diskstats | awk '{ read+=$6 } END { print read/2048 }'");
            //Disk write
            $disk_write = shell_exec("/usr/bin/sudo /usr/sbin/vzctl exec {$container_id} cat /proc/diskstats | awk '{ write+=$10 } END { print write/2048 }'");
            
            return response()->json([
                'disk_read' => round($disk_read, 2), 
                'disk_write' => round($disk_write, 2)
            ]);
        }
    }

    //Bandwith I/O
    public function traffic($id)
    {
        $container_id = DB::table('deployments')
        ->where('id', $id)
        ->value('container_id');

        $status = shell_exec("/usr/bin/sudo /usr/sbin/vzctl status {$container_id}");
        if (!str_contains($status, "running"))
        {
            return response()->json([
                'message' => 'This VPS powered off.'
            ], 200);
        } 
        else
        {
            //Incoming
            $traffic_incoming = shell_exec("/usr/bin/sudo /usr/sbin/vzctl exec {$container_id} cat /sys/class/net/venet0/statistics/rx_bytes");
            //Outgoing
            $traffic_outgoing = shell_exec("/usr/bin/sudo /usr/sbin/vzctl exec {$container_id} cat /sys/class/net/venet0/statistics/tx_bytes");
            
            return response()->json([
                'traffic_incoming' => round(($traffic_incoming / 1024), 2),
                'traffic_outgoing' => round(($traffic_outgoing / 1024), 2)
            ]);
        }
    }

    //Decode and send root password for WebSSH
    public function show_root($id)
    {
        $container_id = DB::table('deployments')
        ->where('id', $id)
        ->value('container_id');

        $hash = file_get_contents("/var/nextcaligo/container_keys/{$container_id}.key");
        $password = base64_decode($hash);

        return response()->json([
            'ssh_password' => $password, 
        ]);
    }

    //Update root password
    public function update_root_password(Request $request)
    {
        $id = $request->input('id');
        $container_id = DB::table('deployments')
        ->where('id', $id)
        ->value('container_id');

        $rootpwd = $request->input('rootpwd');

        shell_exec("/usr/bin/sudo /usr/sbin/vzctl set {$container_id} --userpasswd root:{$rootpwd} --save");

        $rootpwd = base64_encode($rootpwd);
        shell_exec("/usr/bin/sudo sh -c 'echo {$rootpwd} > /var/nextcaligo/container_keys/{$container_id}.key'");

        return response()->json(['message' => "VPS password successfully updated."], 200);
    }

    //Reset nameservers
    public function reset_nameservers(Request $request)
    {
        $id = $request->input('id');
        $container_id = DB::table('deployments')
        ->where('id', $id)
        ->value('container_id');

        $rootpwd = $request->input('rootpwd');

        shell_exec("/usr/bin/sudo /usr/sbin/vzctl set {$container_id} --nameserver 8.8.8.8 --nameserver 8.8.4.4 --save");

        return response()->json(['message' => 'VPS nameservers successfully changed.'], 200);
    }

    //Delete container
    public function terminate(Request $request)
    {
        $id = $request->input('id');
        $container_id = DB::table('deployments')
        ->where('id', $id)
        ->value('container_id');
    }
}