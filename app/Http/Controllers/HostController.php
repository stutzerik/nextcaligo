<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HostController extends Controller
{
    //Memory 
    public function memory()
    {
        $memory_usage = shell_exec("/usr/bin/sudo free -m | awk 'NR==2{print $3/$2*100}'");
        return response()->json(['memory_usage' => round($memory_usage, 2)]);
    }

    //CPU
    public function cpu()
    {
        $cpu_usage = shell_exec("/usr/bin/sudo top -bn1 | grep 'Cpu(s)' | awk '{print $2 + $4}'");
        return response()->json(['cpu_usage' => $cpu_usage]);
    }

    //Disk read/write
    public function disk_rw()
    {
        //Disk read
        $disk_read = shell_exec("/usr/bin/sudo cat /proc/diskstats | awk '{ read+=$6 } END { print read/2048 }'");
        //Disk write
        $disk_write = shell_exec("/usr/bin/sudo cat /proc/diskstats | awk '{ write+=$10 } END { print write/2048 }'");
            
        return response()->json([
            'disk_read' => round($disk_read, 2), 
            'disk_write' => round($disk_write, 2)
        ]);
    }

    //Bandwith I/O
    public function traffic()
    {
        //Incoming
        $traffic_incoming = shell_exec("/usr/bin/sudo cat /sys/class/net/br0/statistics/rx_bytes");
        //Outgoing
        $traffic_outgoing = shell_exec("/usr/bin/sudo cat /sys/class/net/br0/statistics/tx_bytes");
            
        return response()->json([
            'traffic_incoming' => round(($traffic_incoming / 1024), 2),
            'traffic_outgoing' => round(($traffic_outgoing / 1024), 2)
        ]);
    }
}
