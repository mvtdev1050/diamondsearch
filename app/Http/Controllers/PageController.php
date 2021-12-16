<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Session;
use App\Models\Store;
use App\Models\Setting;
use Cookie;

class PageController extends Controller
{
    public function __construct()
    {
        if(empty(Session::get('storename'))){Session::put('storename', 'moyenandco.myshopify.com');}
        if(empty(Session::get('store_id'))){Session::put('store_id', '1');}
    }   
    public function diamondPage(){
            //return view('frontend.diamond');
            $setting = Setting::where(['store_id' => Session::get('store_id')])->first();
            $contents = view('frontend.diamond')->with('setting',$setting);        
            return response($contents)->header('Content-Type', 'application/liquid');
    }
    public function viewDashboard(){
        $setting = Setting::where(['store_id' => Session::get('store_id')])->first();
        return view('adminview',compact('setting'));
    }
}
