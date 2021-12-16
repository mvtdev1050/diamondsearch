<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Unirest\Request as Unirest;
use App\Models\Store;
use Response;
use Session;
use Log;
use Cookie;

class AppController extends Controller
{  
    protected $scopes;
    public function __construct()
    {
        $this->key = env('SHOPIFY_API_KEY');
        $this->secret = env('SHOPIFY_API_SECRET');
        $this->callback = env('HOME_URL').'callback';
        $this->url=env('HOME_URL');
    }

    public function auth(Request $request)
    {
        Session::put('storename', $request['shop']);
      //  $cookie = Cookie::forever('storename', $request['shop']);
      //  echo '----'.Cookie::get('storename');die;
        $check = Store::where(['store_name' => Session::get('storename')])->where(['status'=> '1'])->count();
        if($check=='0'){
            $data = $request->all();
            $storename = $data['shop']; 
            $scopes = "read_orders, write_orders, read_locations, read_fulfillments, write_fulfillments,read_products,write_products";
            $nonce = base64_decode(rand(1, 1000));
            $url = 'https://{shop}/admin/oauth/authorize?client_id={api_key}&amp;scope={scopes}&amp;redirect_uri={redirect_uri}&amp;state={nonce}';
            $search = ['{shop}', '{api_key}', '{scopes}', '{redirect_uri}', '{nonce}'];
            $replace = [$storename, $this->key, $scopes, $this->callback, $nonce];
            $installUrl = str_replace($search, $replace, $url);
            return redirect($installUrl);
        }
        else{
            return redirect('dashboard');
        }  
    }

    public function callback(Request $request)
    {
        Session::put('storename', $request['shop']);
        $data = array(
            'client_id' => $this->key,
            'client_secret' => $this->secret,
            'code' => $request['code'],
        ); 
        $url = '/oauth/access_token';
        $resp = $this->shopifyApi('POST', $url, json_encode($data));
        $appPage = $url = "https://" . Session::get('storename') . "/admin/apps/" ;
        $testresp = $this->registerWebhooks($resp->access_token);
        Store::create([
            'store_name' => $request->shop,
            'code' => $request->code,
            'host' => $request->host,
            'hmac' => $request->hmac,
            'state' => $request->state,
            'access_token' => $resp->access_token,
            'scope' => $resp->scope
        ]);
        return redirect($appPage);
    }
    
    public function shopifyApi($method, $endpoint, $body)
    {
        if (($endpoint == '/oauth/access_token')){
            $url = "https://" . Session::get('storename') . "/admin" . $endpoint;
        } else{
            $url = "https://" . Session::get('storename') . "/admin/api/2021-04/" . $endpoint;
        }
        $url = "https://" . Session::get('storename') . "/admin" . $endpoint; 
        $header = array(
            'Accept' => 'application/json',
            'Content-Type' => 'application/json',
        );
        $resp = $this->hitApi($method, $url, $header, $body);
        return $resp;
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
    public function registerWebhooks($token)
    {

        $shop = "https://" . Session::get('storename') . "/admin/api/2021-10/webhooks.json";
        $requestHeader = array(
            'Accept' => 'application/json',
            'Content-Type' => 'application/json',
            'X-Shopify-Access-Token' => $token,
        );
        # app delete
        $appUninstall = array(
            'webhook' => array(
                'topic' => 'app/uninstalled',
                'address' => $this->url.'webhook/app/uninstall?shop=' . Session::get('storename'),
                'format' => 'json',
            ),
        );
        $das = url('/') . '/webhook/app/uninstall?shop=' . Session::get('storename');
        $addHook = Unirest::post($shop, $requestHeader, json_encode($appUninstall));
        return $addHook;
    }
    public function appUninstalled(Request $request){
        // $request->shop;
        Store::where(['store_name' => $request->shop])->update(['status'=> '0']); die;
    }
   
}
