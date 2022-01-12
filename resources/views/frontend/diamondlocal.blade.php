<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
  <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta name="csrf-token" content="{{ csrf_token() }}">
      <title>Diamond Search</title>
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;600&display=swap" rel="stylesheet">
      <link rel="stylesheet" href="https://unpkg.com/@shopify/polaris@7.0.0/build/esm/styles.css" />
    </script>
  </head>
  <body>
 <script>
        window.home_url="http://localhost:8000/";
        window.api_key="{{env('SHOPIFY_API_KEY')}}";
        window.storename = "{{Session::get('storename')}}";
        window.store_id = "{{Session::get('store_id')}}";
    </script> 
       @if (!empty($setting)) 
          <script>
            document.body.style.setProperty('--color', "{{$setting['color']}}");
            document.body.style.setProperty('--size', "{{$setting['font_size']}}");
            window.option="{{$setting['column_option']}}";
            window.color_min = "{{$setting['color_min']}}";
            window.color_max = "{{$setting['color_max']}}";
            window.clarity_min = "{{$setting['clarity_min']}}";
            window.clarity_max = "{{$setting['clarity_max']}}";
          </script>
      @endif 
    <div id="searchLocal"></div>
    <script src="js/app.js"> </script>
  </body>
</html>