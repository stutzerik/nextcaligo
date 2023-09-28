<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContainerController;
use App\Http\Controllers\HostController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\DB;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) 
{
    return $request->user();
});

Route::middleware(['auth:sanctum'])->group(function () 
{
    /**
    * Virtual servers
    */
    Route::post('/deploy', [ContainerController::class, 'create']);
    Route::get('/deployments', [ContainerController::class, 'index']);
    Route::get('/container/{id}', [ContainerController::class, 'show']);
    Route::post('/container/{id}/start', [ContainerController::class, 'start']);
    Route::post('/container/{id}/stop', [ContainerController::class, 'stop']);
    Route::post('/container/{id}/restart', [ContainerController::class, 'restart']);
    Route::get('/container/{id}/memory', [ContainerController::class, 'memory']);
    Route::get('/container/{id}/cpu', [ContainerController::class, 'cpu']);
    Route::get('/container/{id}/disk_rw', [ContainerController::class, 'disk_rw']);
    Route::get('/container/{id}/traffic', [ContainerController::class, 'traffic']);
    Route::post('/container/{id}/show_root', [ContainerController::class, 'show_root']);
    Route::post('/container/{id}/setpwd', [ContainerController::class, 'update_root_password']);
    Route::post('/container/{id}/setns', [ContainerController::class, 'reset_nameservers']);

    /**
    * Host stats
    */
    Route::get('/server/memory', [HostController::class, 'memory']);
    Route::get('/server/cpu', [HostController::class, 'cpu']);
    Route::get('/server/disk_rw', [HostController::class, 'disk_rw']);
    Route::get('/server/traffic', [HostController::class, 'traffic']);

});


