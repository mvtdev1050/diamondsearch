<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;
use Session;

class BackendController extends Controller
{
    public function saveSetting(Request $request)
    {      
        $set = Setting::updateOrCreate(
            ['store_id' => $request->store_id],
            $request->all()
        );
        echo 'success';
    }
}
