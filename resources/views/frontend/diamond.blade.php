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
      @if (!empty($setting)) 
          <script>
              window.option = "{{$setting['column_option']}}";
              window.weight = "{{$setting['font_weight']}}";
              window.size = "{{$setting['font_size']}}";
              window.family = "{{$setting['font_family']}}";
              window.color = "{{$setting['color']}}";
          </script>
      @endif
    <div id="searchPage"></div>
    <script src="{{env('HOME_URL')}}js/app.js"> </script>
  </body>
</html>