<?php

use Illuminate\Support\Facades\Route;

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

// Auth::routes();
// Route::get('/home', 'HomeController@index')->name('home');
Route::view('/', 'welcome');

Route::get('/auth', 'AppController@auth');
Route::get('/callback', 'AppController@callback');

Route::post('/backend/admin-product', 'BackendController@adminProduct');
Route::post('/backend/save-setting', 'BackendController@saveSetting');

Route::get('/dashboard', 'PageController@viewDashboard');
Route::get('/diamond-search', 'PageController@diamondPage');
Route::get('/diamond-local', 'PageController@diamondLocal');
Route::post('/webhook/app/uninstall', 'AppController@appUninstalled');




