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
    public function singleDiamond($id)
    { 

        $request_json = [];
        $request_json['request']['header']['username'] = 'f4ickp8pctfwszxcd9mff8hmhb7ixv'; 
        $request_json['request']['header']['password'] = 's7wwA8yg'; 
        $request_json["request"]["body"]["diamond_id"] = $id; 
        $request_json = json_encode($request_json);
        $ch = curl_init('https://technet.rapaport.com/HTTP/JSON/RetailFeed/GetSingleDiamond.aspx');
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($ch, CURLOPT_POSTFIELDS, $request_json);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/x-www-form-urlencoded'));
        $result = curl_exec($ch);
        $response = json_decode($result, true);
        return $response['response']['body']['diamond'];
    }   
    public function diamondPage(){
            $setting = Setting::where(['store_id' => Session::get('store_id')])->first();
            $contents = view('frontend.diamond')->with('setting',$setting);      
         //   return response($contents)->header('Content-Type', 'application/liquid');
            return view('frontend.diamond')->with('setting',$setting); 
    }
    public function diamondProduct($id){
        $product= $this->singleDiamond($id);
        $contents = view('frontend.product')->with('product',$product);       
       // return response($contents)->header('Content-Type', 'application/liquid'); 
        return view('frontend.product')->with('product',$product);     
    }
    public function diamondLocal(){
        $setting = Setting::where(['store_id' => Session::get('store_id')])->first();
        return view('frontend.diamondlocal')->with('setting',$setting);        
}
    public function viewDashboard(){
        $setting = Setting::where(['store_id' => Session::get('store_id')])->first();
        return view('adminview',compact('setting'));
    }
}
