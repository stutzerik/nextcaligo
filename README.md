# NextCaligo VPS IaaS Platform
NextCaligo is a VPS infrastructure management system that allows you to deploy and manage Linux containers from a web interface. Create your own VPS in less than a minute &amp; monitor your VPS or access it live SSH console! VPS management made easy!

<p align="center">
  <img src="http://nextcaligo.cloud/img/nextcaligo-intro.png">
</p>

## Project Overview
NextCaligo is an open source, free <b>VPS management platform</b>. The aim of the project is to offer a modern, free alternative to the currently used VPS hosting softwares. Most web hosting companies use the same expensive, cumbersome VPS control panel softwares. Imagine a fast interface where you can create VPSs, application containers & high availability (HA) VMs in less than 1 minute with just one click. This is the future and will be the main direction of the project.

## Software Functions
...and this is just the beginning. Different versions will have different functions.

<table style="border: 0px !important;">
 <tr style="border: 0px !important;">
    <td><b style="font-size:18px;margin-bottom: 12px">VPS deployment</b></td>
    <td><b style="font-size:18px;margin-bottom: 12px">Manage server</b></td>
    <td><b style="font-size:18px;margin-bottom: 12px">Track statistics</b></td>
 </tr>
 <tr>
    <td>Create your VPS easily with the VPS wizard. You select the operating system, set the IPv4 address, use a slider to select the necessary resources and your VPS is up to date.</td>
    <td>Start, stop, restart, change the root password, or even connect to the SSH client automatically from the web interface.</td>
    <td>You can monitor the use of the VPS resource in real-time from the interface: CPU, RAM, Disk Read/Write & Bandwidth usage.</td>
 </tr>
</table>

<p align="center">
  <img src="http://nextcaligo.cloud/img/nextcaligo-vps-control-panel.png">
</p>

## Technology stack

- Virtualization: OpenVZ 7/8
- Frontend: ReactJS, Material UI + Material Icons, Bootstrap Grid, ApexCharts, Font-Logos, Roboto
- Backend: PHP, Laravel 10 (with Breeze), NodeJS (Socket.io, Express)
- Database engine: MySQL
- Webserver: Apache2 (with HTACCESS)

## Installation Guide (manual)

The software only runs on CentOS-based systems, since the latest OpenVZ can be operated on them.
The most viable way is to install the <i>OpenVZ Linux distribution, then install epel-release and then the technologies mentioned above</i>.

1. Install Apache2
   ```
   yum -y install httpd && systemctl enable httpd.service
   ```


