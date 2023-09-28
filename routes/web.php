<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ContainerController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/dashboard', function () 
{
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () 
{
    /**
    * Auth
    */
    Route::get('/account/my', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/account/my', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/account/my', [ProfileController::class, 'destroy'])->name('profile.destroy');

    /**
    * Virtual servers
    */
    Route::get('/instances/deploy', function () 
    {
        return Inertia::render('Containers/Deploy'); 
    });
    Route::get('/instances/list', function () 
    {
        return Inertia::render('Containers/List');
    });
    Route::get('/instances/{ID}/manage', function ($id) 
    {
        return Inertia::render('Containers/Manage', 
        [
            'id' => $id
        ]);
    });    
    Route::get('/console', function () 
    {
        return Inertia::render('Containers/Console');
    }); 
    Route::get('/account/add', function () 
    {
        return Inertia::render('Auth/AddAccount');
    });

    /**
    * Software information/about page
    */
    Route::get('/software', function () 
    {
        return Inertia::render('Software');
    }); 

});

require __DIR__.'/auth.php';

?>