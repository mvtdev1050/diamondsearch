<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Laravel</title>
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://unpkg.com/@shopify/polaris@7.0.0/build/esm/styles.css" />
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
  </script>
    <style>
        .Polaris-Layout {
            justify-content: unset !important;
            margin-top: 0rem !important;
            margin-left: 0rem !important;
        }
        .Polaris-Card__Section img{
            max-width:100% !important;
        }
    </style>
</head>

<body> <script>
        window.home_url="{{env('HOME_URL')}}";
        window.api_key="{{env('SHOPIFY_API_KEY')}}";
        window.storename = "{{Session::get('storename')}}";
        window.store_id = "{{Session::get('store_id')}}";
    </script>
    @if (!empty($setting)) 
        <script>
            document.body.style.setProperty('--colors', "{{$setting['color']}}");
            document.body.style.setProperty('--sizes', "{{$setting['font_size']}}");
            window.option = "{{$setting['column_option']}}";
            window.size = "{{$setting['font_size']}}";
            window.color = "{{$setting['color']}}";
        </script>
    @endif
    <div class="row">
        <div class="col-md-8">
            <div id="dashboard">
            </div>
        </div>
        <div class="col-md-4">
            <div id="layout-form">
            </div>
        </div>
    </div>
    <script src="js/app.js"> </script>
</body>

</html>