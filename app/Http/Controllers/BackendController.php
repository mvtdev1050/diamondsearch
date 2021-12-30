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

    public function getDiamonds(Request $request)
    { 

        $request_json = [];
        $request_json['request']['header']['username'] = 'f4ickp8pctfwszxcd9mff8hmhb7ixv'; //Essential
        $request_json['request']['header']['password'] = 's7wwA8yg'; //Essential
        $request_json["request"]["body"]["page_number"] = 1; //Essential
        $request_json["request"]["body"]["page_size"] = 20; //Essential
            if(!empty($request->range)){         
                foreach ($request->range as $key => $value){
                    if($key=="shapes"){
                        $shape[]=$value;
                        $request_json["request"]["body"][$key] = $shape;
                    }
                    else{
                    $request_json["request"]["body"][$key] = $value;
                    }
                }
            }

        $request_json = json_encode($request_json);
        $ch = curl_init('https://technet.rapaport.com/HTTP/JSON/RetailFeed/GetDiamonds.aspx');
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($ch, CURLOPT_POSTFIELDS, $request_json);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/x-www-form-urlencoded'));
        $result = curl_exec($ch);
        $response = json_decode($result, true);
        $arr = [];
        if(!empty($response['response']['body']['diamonds'])){
            $arr=$response['response']['body']['diamonds'];
        }
        return $arr;
    }
    public function singleDiamond($diamond_id)
    { 

        $request_json = [];
        $request_json['request']['header']['username'] = 'f4ickp8pctfwszxcd9mff8hmhb7ixv'; 
        $request_json['request']['header']['password'] = 's7wwA8yg'; 
        $request_json["request"]["body"]["diamond_id"] = $diamond_id; 
        $request_json = json_encode($request_json);
        $ch = curl_init('https://technet.rapaport.com/HTTP/JSON/RetailFeed/GetSingleDiamond.aspx');
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($ch, CURLOPT_POSTFIELDS, $request_json);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/x-www-form-urlencoded'));
        $result = curl_exec($ch);
        $response = json_decode($result, true);
        $arr = [];
        if(!empty($response['response']['body']['diamond'])){
            $arr=$response['response']['body']['diamond'];
        }
        return $arr;
    }
    public function addCart(Request $request)
    {
        $response='';
        $diamond = $this->singleDiamond($request->diamond_id);
         if(!empty($diamond)){
            $data=array();
            $data['product']['title']=$diamond['size'].' Carat, '.$diamond['color'].' Color, '.$diamond['clarity'].' Clarity, '.$diamond['shape'].' Shaped Diamond';
            $data['product']['handle']=$diamond['diamond_id'].'-diamond';
            $data['product']['body_html']='Carat weight : '.$diamond['size'].', Shape:'. $diamond['shape'].', Color: '.$diamond['color'].', Clarity: '.$diamond['clarity'].', Price: '.$diamond['total_sales_price'].', Symmetry : '.$diamond['symmetry'].', Polish : '.$diamond['polish'].', Cut : '.$diamond['cut'].', Stock Number : '.$diamond['stock_num'].', Report : '.$diamond['cert_num'].', Length : '.$diamond['meas_length']. ', Width : '.$diamond['meas_width'].', Depth : '.$diamond['meas_depth']. ', Table Percent:'.$diamond['table_percent'].', Depth Percent: '.$diamond['depth_percent'].', Lab :'.$diamond['lab'];
            $data['product']['product_type']="Diamond";
            $data['product']['published']=false;
            $data['product']['sku']=$diamond['stock_num'];
            $data['product']['price']=$diamond['total_sales_price'];
            // $data['product']['options'][0]['name']='Carat';
            // $data['product']['options'][0]['value']=$diamond['size'];
            // $data['product']['options'][1]['name']='Color';
            // $data['product']['options'][1]['value']=$diamond['color'];
            // $data['product']['options'][2]['name']='Shape';
            // $data['product']['options'][2]['value']=$diamond['shape'];
            // $data['product']['options'][3]['name']='Clarity';
            // $data['product']['options'][3]['value']=$diamond['clarity'];
            $create_url = "https://" . Session::get('storename') . "/admin/api/2021-10/products.json";
            $r = Store::select('access_token')->where(['store_name' => Session::get('storename')])->where(['status'=> '1'])->first();
            if(!empty($r['access_token'])){
                $header = array(
                    'Accept' => 'application/json',
                    'Content-Type' => 'application/json',
                    'X-Shopify-Access-Token' => $r['access_token']
                );
                $search_url = "https://" . Session::get('storename') . "/admin/api/2021-10/products.json?handle=".$data['product']['handle'];
                $search = $this->hitApi('GET', $search_url, $header,'');
                if(empty($search->products)){
                    $resp = $this->hitApi('POST', $create_url, $header,json_encode($data));
                    if(!empty($resp->product->id)){
                        $product_id=$resp->product->id;
                    }  
                }
                else{
                    print_r($search);
                    if(!empty($search->products[0]->id)){$product_id=$search->products[0]->id;}
                }
                if(!empty($product_id)){
                    $response=$product_id;
                }
            }
        }
        return $response;
    }
}
