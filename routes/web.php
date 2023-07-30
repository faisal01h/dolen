<?php

use App\Http\Controllers\BudgetsController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\EventsController;
use App\Models\Event;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
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
    if(Auth::user()) {
        print_r(Auth::user()->email);
        return;
    }

    $e = Event::get();

    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'appVer' => "0.1.0b",
        'appBuild' => "2306031442001",
        'appBuilder' => 'Faisal',
        'eventCount' => count($e)
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/user/{handle}', [ProfileController::class, 'view'])->name('profile.view');

    Route::get('/events', [EventsController::class, 'index'])->name('events');
    Route::get('/event/{id}', [EventsController::class, 'detail'])->name('eventdetail');
    Route::get('/events/add', [EventsController::class, 'create'])->name('addevent');
    Route::post('/events/add', [EventsController::class, 'store'])->name('storeevent');
    Route::get('/events/route/add', [EventsController::class, 'createRoute'])->name('addeventroute');
    Route::post('/events/route/add', [EventsController::class, 'storeRoute'])->name('storeeventroute');

    Route::get('/budgets', [BudgetsController::class, 'index'])->name('budgets');
    Route::get('/budgets/allocate', [EventsController::class, 'index'])->name('budgets.allocate');
});

require __DIR__.'/auth.php';
