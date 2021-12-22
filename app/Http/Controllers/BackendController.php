<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Unirest\Request as Unirest;
use App\Models\Setting;
use App\Models\Store;
use Session;
use Response;
use Log;
use Cookie;

class BackendController extends Controller
{
    public function __construct()
    {
        $this->url=env('HOME_URL');
        if(empty(Session::get('storename'))){Session::put('storename', 'moyenandco.myshopify.com');}
        if(empty(Session::get('store_id'))){Session::put('store_id', '1');}  
    }
    public function hitApi($type, $url, $options, $data)
    {
        if ($type == 'GET') {
            $response = Unirest::get($url, $options, $data);
        } else if ($type == 'POST') {
            $response = Unirest::post($url, $options, $data);
        } else if ($type == 'PUT') {
            $response = Unirest::put($url, $options, $data);
        } else if ($type == 'DELETE') {
            $response = Unirest::delete($url, $options, $data);
        }
        return $response->body;
    }
    public function saveSetting(Request $request)
    {      
        $set = Setting::updateOrCreate(
            ['store_id' => $request->store_id],
            $request->all()
        );
        echo 'success';
    }
    public function adminProduct(Request $request)
    {
        if(!empty($request->data)){$data=$request->data;}else{$data=array();}
        if($request->type == 'create'){$method='POST';} 
        else if($request->type == 'update'){$method='PUT';} 
        else if($request->type=='delete'){$method='DELETE';}
        else{$method='GET';}
        if(!empty($request->product_id)){
            $url = "https://" . Session::get('storename') . "/admin/api/2021-10/products/" . $request->product_id.'.json';
        }
        else{
            $url = "https://" . Session::get('storename') . "/admin/api/2021-10/products.json";
        }
       
        $r = Store::select('access_token')->where(['store_name' => Session::get('storename')])->where(['status'=> '1'])->first();
        if(!empty($r['access_token'])){
            $header = array(
                'Accept' => 'application/json',
                'Content-Type' => 'application/json',
                'X-Shopify-Access-Token' => $r['access_token']
            );
            $resp = $this->hitApi($method, $url, $header,json_encode($data));
            return json_encode($resp);
        }
        return "end";
       
    }
    public function rapnetApi(Request $request)
    { 
        if(!empty($request->data)){$shape=$request->shape;}
        else{$shape='round';}
        $url='https://technet.rapaport.com/HTTP/JSON/Prices/GetPriceSheet.aspx';
        $request_json = [];
        $request_json['request']['header']['username'] = 'f4ickp8pctfwszxcd9mff8hmhb7ixv'; 
        $request_json['request']['header']['password'] = 's7wwA8yg'; 
        $request_json["request"]["body"]["shape"] = $shape;
        $request_json = json_encode($request_json);
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($ch, CURLOPT_POSTFIELDS, $request_json);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/x-www-form-urlencoded'));
        $result = curl_exec($ch);
        $response = json_decode($result, true);
        echo "-----<pre>";print_r($response);echo "</pre>";
    }
}
