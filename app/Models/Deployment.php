<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Deployment extends Model
{
    protected $table = 'deployments';

    protected $fillable = [
        'container_id',
        'template',
        'ip_address',
        'vcpu',
        'memory',
        'swap',
        'disk_size',
    ];
}