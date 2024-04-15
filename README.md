<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="NextCaligo VPS manager - GitHub">
    <meta name="keywords" content="VPS, Linux VPS, VPS Platform, Container Platform, Hosting, Control Panel, Stütz Erik">
    <meta name="author" content="Stütz Erik">
    <meta name="robots" content="index, follow">
    <meta name="revisit-after" content="1 Week">
    <meta name="distribution" content="local">
    <meta name="rating" content="general">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css">
</head>
<body>
    
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

## Installation Guide

The software only runs on CentOS-based systems, since the latest OpenVZ can be operated on them.
The most viable way is to install the <i>OpenVZ Linux distribution, then install epel-release and then the technologies mentioned above</i>.

1. Install Apache2
   ```
   yum -y install httpd nano && systemctl enable httpd.service
   ```

   Edit httpd.conf:
   ```
   sudo nano /etc/httpd/conf/httpd.conf
   ```

   <b>The DocumentRoot should be set to the /var/nextcaligo</b> directory and the <i>AllowOverride None</i> value should be overwritten with AllowOverride All</i>.
   Also, wherever there is /var/www/html, change it to /var/nextcaligo.

2. Install PHP 8.2
   ```
   sudo yum -y install https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
   sudo yum -y install http://rpms.remirepo.net/enterprise/remi-release-7.rpm
   sudo yum-config-manager --enable remi-php82
   sudo yum install php8.2-{bz2,cli,common,curl,intl,mbstring,mysql,zip}
   sudo usermod -aG wheel apache
   service httpd restart
   ```

3. Node, NPM, Composer
   ```
   sudo yum install nodejs -y
   sudo yum install php-cli php-zip wget unzip -y
   php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
   php composer-setup.php --install-dir=/usr/local/bin --filename=composer
   ```

4. Install MySQL
   ```
   sudo yum install https://dev.mysql.com/get/mysql80-community-release-el7-3.noarch.rpm
   sudo yum install mysql-community-server
   sudo systemctl start mysqld
   sudo systemctl enable mysqld
   sudo grep 'temporary password' /var/log/mysqld.log
   sudo mysql_secure_installation
   mysql -u root -p
   CREATE DATABASE nextcaligo;
   exit;
   ```

5. Download NextCaligo & Install
   ```
   yum -y install wget unzip
   cd /var && wget https://github.com/stutzerik/nextcaligo/archive/refs/heads/master.zip
   unzip master.zip -d /var/nextcaligo
   ```

6. Virtualization environment
   ```
   wget http://repo.virtuozzo.com/vzlinux/vzdeploy/vzdeploy8
   chmod 755 vzdeploy8
   ./vzdeploy8
   ```

   More information: https://docs.virtuozzo.com/virtuozzo_linux_8_quick_start_guide/converting-from-centos/

7. Enable NextCaligo
   ```
   cd /var/nextcaligo
   npm install
   npm run build
   npm run dev # Then Ctrl + V
   composer install
   cd nodejs && npm install && npm run build && node server.js && cd ..
   ```

   Rename <b>env.example to .env</b>, and fill with MySQL login details (MySQL username, password, and for DATABASE_NAME write nextcaligo)!
   ```
   php artisan migrate
   ```

### Done, ready to use! Go to http://localhost or http://Your-IP in your browser.
<b>Default login details:</b>
- Email: admin@domain.tld
- Password: admin
(Change after first login)

## Further development opportunities

In the future, you will get a permission system, a teamwork option, and an end-user API. In addition to the container-based OpenVZ VPS, 1-Click app containers and XEN virtualization high-availability VMs will come. This version will be available on the project's official website.

## Sources

I used the following libraries, frameworks and technologies for my work: PHP, Laravel, Laravel Breeze, Node, Express, Socket.io, SSH2, MySQL, ReactJS, Material UI 5.13, Material Icons, Bootstrap, TailwindCSS, Roboto fonts, ApexChart, NPM, Composer, OpenVZ, Axios, Linux - these technologies are not my intellectual products, I just use them for writing code.

<i>All of them are open source - at least that's the version I use - and the comments on internet forums helped a lot in the coding.</i>

I ❤️ Open Source.

## License
Feel free to use my software, but don't forget to mention the author. In fact, I will be proud if you link to my Github. 

</body>
</html>

