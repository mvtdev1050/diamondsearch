<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Unirest\Request as Unirest;
use App\Models\Setting;
use App\Models\Store;
use App\Models\Inquiry;
use App\Models\Product;
use Session;
use Response;
use Log;
use Cookie;
use Mail;

class BackendController extends Controller
{
    public function __construct()
    {
        $this->home_url=env('HOME_URL');
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
        $request_json['request']['header']['username'] = 'f4ickp8pctfwszxcd9mff8hmhb7ixv'; 
        $request_json['request']['header']['password'] = 's7wwA8yg'; 
        $request_json["request"]["body"]["page_number"] = 1; 
        $request_json["request"]["body"]["page_size"] = 50;
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
        $base='';
        $diamond = $this->singleDiamond($request->diamond_id);
        if(!empty($diamond)){
            $data=array();
            // switch($diamond['shape']){
            //     case "Round":
            //       $shape_img='round.jpg';
            //       break;
            //     case "Oval":
            //       $shape_img='oval.jpg';
            //       break;
            //     case "Cushion Modified":
            //       $shape_img='cushion.jpg';
            //       break;
            //     case "Princess":
            //       $shape_img='princess.jpg';
            //       break;
            //     case "Emerald":
            //       $shape_img='emerald.jpg';
            //       break;
            //     case "Pear":
            //       $shape_img='pear.jpg';
            //       break;
            //     case "Marquise":
            //       $shape_img='marquise.jpg';
            //       break;
            //     case "Asscher":
            //       $shape_img='asscher.jpg';
            //       break;
            //     case "Radiant":
            //       $shape_img='radiant.jpg';
            //       break;
            //     case "Heart":
            //       $shape_img='heart.jpg';
            //       break;
            //     default:
            //       $shape_img='round.jpg';
            // }
            // echo $base=base64_encode(file_get_contents($this->home_url.'img/'.$shape_img));
            $data['product']['title']=$diamond['size'].' Carats, '.$diamond['color'].' Color, '.$diamond['clarity'].' Clarity, '.$diamond['shape'].' Shaped Diamond';
            $data['product']['handle']=$diamond['diamond_id'].'-diamond';
            $data['product']['body_html']='Carat weight: '.$diamond['size'].', Shape: '. $diamond['shape'].', Color: '.$diamond['color'].', Clarity: '.$diamond['clarity'].', Price: '.$diamond['total_sales_price'].', Symmetry: '.$diamond['symmetry'].', Polish: '.$diamond['polish'].', Cut: '.$diamond['cut'].', Stock Number: '.$diamond['stock_num'].', Report: '.$diamond['cert_num'].', Length: '.$diamond['meas_length']. ', Width: '.$diamond['meas_width'].', Depth: '.$diamond['meas_depth']. ', Table Percent: '.$diamond['table_percent'].', Depth Percent: '.$diamond['depth_percent'].', Lab: '.$diamond['lab'];
            $data['product']['product_type']="Diamond";            
            $data['product']['variants'][0]['option1']='Carat weight: '.$diamond['size'].', Shape: '. $diamond['shape'].', Color: '.$diamond['color'].', Clarity: '.$diamond['clarity'].', Length: '.$diamond['meas_length']. ', Width: '.$diamond['meas_width'].', Depth: '.$diamond['meas_depth']. ', Table Percent:'.$diamond['table_percent'].', Depth Percent: '.$diamond['depth_percent'].', Lab:'.$diamond['lab'].', Symmetry: '.$diamond['symmetry'].', Polish: '.$diamond['polish'].', Cut: '.$diamond['cut'];
            $data['product']['variants'][0]['price']=$diamond['total_sales_price'];
            $data['product']['variants'][0]['sku']=$diamond['stock_num'];  
            $data['product']['variants'][0]['inventory_quantity']=10;       
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
                    //     $image['image']['src']=$this->home_url.'img/'.$shape_img;
                    //     $img_url = "https://" . Session::get('storename') . "/admin/api/2021-10/products/".$product_id."/images.json";
                    //     $img_res = $this->hitApi('POST', $img_url, $header,json_encode($image));
                    //     print_r($img_res);
                    }
                    if(!empty($resp->product->variants[0]->id)){
                        $variant_id=$resp->product->variants[0]->id;
                    }  
                }
                else{
                    if(!empty($search->products[0]->id)){
                        $product_id=$search->products[0]->id;
                        $update_url = "https://" . Session::get('storename') . "/admin/api/2021-10/products/".$product_id.".json";
                        $resp = $this->hitApi('PUT', $update_url, $header,json_encode($data));
                    }
                    if(!empty($search->products[0]->variants[0]->id)){$variant_id=$search->products[0]->variants[0]->id;}
                }
                if(!empty($variant_id)){
                    $log['store_id']=$request->store_id;
                    $log['diamond_id']= $request->diamond_id;
                    $log['product_id']=$product_id;
                    $log['title']=$data['product']['title'];
                    $log['description']=$data['product']['body_html'];
                    $set = Product::Create($log);
                    $response=$variant_id;
                }
            }
        }
        return $response;
    }
    public function shop_info()
    {  
        $r = Store::select('access_token')->where(['store_name' => Session::get('storename')])->where(['status'=> '1'])->first();
        $header = array(
            'Accept' => 'application/json',
            'Content-Type' => 'application/json',
            'X-Shopify-Access-Token' => $r['access_token']
        );
        $search_url = "https://" . Session::get('storename') . "/admin/api/2021-10/shop.json";
        $search = $this->hitApi('GET', $search_url, $header,'');
        return $search;
    }
    public function inquiry(Request $request)
    {      
        $email='';
        $set = Inquiry::Create($request->all());
        $data['firstname']=$request->firstname;
        $data['lastname']=$request->lastname;
        $data['email']=$request->email;
        $data['phone']=$request->phone;
        $data['inquiry']=$request->inquiry;
        $data['diamond_id']=$request->diamond_id;
        $data['diamond_info']='';
        $diamond = $this->singleDiamond($request->diamond_id);
        $client_mail=$request->email;
        $info = $this->shop_info();
        if(!empty($info)){
            $owner_mail=$info->shop->email;
        }
        if(!empty($diamond)){
            $data['diamond_info']='Carat weight: '.$diamond['size'].', Shape: '. $diamond['shape'].', Color: '.$diamond['color'].', Clarity: '.$diamond['clarity'].', Price: '.$diamond['total_sales_price'].', Symmetry: '.$diamond['symmetry'].', Polish: '.$diamond['polish'].', Cut: '.$diamond['cut'].', Stock Number: '.$diamond['stock_num'].', Report: '.$diamond['cert_num'].', Length: '.$diamond['meas_length']. ', Width: '.$diamond['meas_width'].', Depth: '.$diamond['meas_depth']. ', Table Percent: '.$diamond['table_percent'].', Depth Percent: '.$diamond['depth_percent'].', Lab: '.$diamond['lab'];
        }
        Mail::send('ownermail', $data, function($message) use ($owner_mail){
            $message->to('baljinderkaur.mvt@gmail.com')->subject('Diamond Inquiry');
        });
        Mail::send('clientmail', $data, function($message) use ($client_mail){
            $message->to($client_mail)->subject('Diamond Inquiry');
        });
        echo 'success';
    }
}
