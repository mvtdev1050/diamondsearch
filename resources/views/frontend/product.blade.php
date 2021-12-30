<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
  <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta name="csrf-token" content="{{ csrf_token() }}">
      <title>Diamond Search</title>
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;600&display=swap" rel="stylesheet">
      <link rel="stylesheet" href="https://unpkg.com/@shopify/polaris@7.0.0/build/esm/styles.css" />
      <link rel="stylesheet" href="{{env('HOME_URL')}}css/product.css" />
      </script>
  </head>

  <body>
    <div class='serch-outer diamond-product' id='searchProduct'>
          <div class='cust-container'>
            <div class="product-wrap">
              <div class="product-info">
                <div class="product-img">
                  <?php 
                  switch($product['shape']){
                    case "Round":
                      $shape_img='round.jpg';
                      break;
                    case "Oval":
                      $shape_img='oval.jpg';
                      break;
                    case "Cushion Modified":
                      $shape_img='cushion.jpg';
                      break;
                    case "Princess":
                      $shape_img='princess.jpg';
                      break;
                    case "Emerald":
                      $shape_img='emerald.jpg';
                      break;
                    case "Pear":
                      $shape_img='pear.jpg';
                      break;
                    case "Marquise":
                      $shape_img='marquise.jpg';
                      break;
                    case "Asscher":
                      $shape_img='asscher.jpg';
                      break;
                    case "Radiant":
                      $shape_img='radiant.jpg';
                      break;
                    case "Heart":
                      $shape_img='heart.jpg';
                      break;
                    default:
                      $shape_img='round.jpg';
                  }
                  ?>
                    <img src="{{env('HOME_URL')}}img/{{$shape_img,''}}">
                </div>
                <div class="product-desc">
                      <h4 class="product-title">{{$product['size'],''}} Carat, {{$product['color'],''}} Color, {{$product['shape'],''}} Shaped Diamond</h4>
                      <br/>
                      <p class="short-info">{{$product['size'],''}} Carat, {{$product['color'],''}} Color, {{$product['clarity'],''}} Clarity, {{$product['shape'],''}} Shaped Diamond</p>
                      <br/>
                        {% if customer %}
                          <div class='diamond-price'><p><strong>Price:</strong> {{$product['currency_symbol'],''}}{{$product['total_sales_price'],''}}  <small>(Diamond Only)</small></p></div>
                          <br/>
                          <div class="diamond-actions" id='add-to-cart'></div>
                        {% endif %}
                      <hr/>
                      <div class="diamond-details">
                          <h4 class="iconic">Diamond Details</h4>
                          <div class="product-left">
                              <ul>
                              <li><strong>Carat weight </strong>: {{$product['size'],''}}</li>
                                  <li><strong>Shape</strong>: {{$product['shape'],''}}</li>
                                  <li><strong>Color</strong>: {{$product['color'],''}}</li>
                                  <li><strong>Clarity</strong>: {{$product['clarity'],''}}</li>
                                  <li> <strong>Symmetry </strong>: {{$product['symmetry'],''}}</li>
                                  <li> <strong>Polish </strong>: {{$product['polish'],''}}</li>
                                  <li><strong>Cut </strong>: {{$product['cut'],''}}</li>
                              </ul>
                          </div>
                          <div class="product-right">
                              <ul>
                                  <li><strong>Stock Number </strong>: {{$product['stock_num'],''}}</li>
                                  <li><strong>Report </strong>: {{$product['cert_num'],''}}</li>                               
                                  <li><strong>Measurements </strong>{{$product['meas_length'],''}} x {{$product['meas_width'],''}} x {{$product['meas_depth'],''}}</li>
                                  <li><strong>Table </strong>: {{$product['table_percent'],''}} %</li>
                                  <li><strong>Depth </strong>: {{$product['depth_percent'],''}} %</li>
                                  <li><strong>Lab </strong>:  {{$product['lab'],''}}</li>
                                  <li><strong>Fluorescence</strong>: {{$product['fluor_intensity'],''}}</li>
                              </ul>
                          </div>
                      </div>
                </div>
                <div class="clearfix"></div>
              </div>
            </div>
          </div>
      </div>
      <script>
        window.home_url="{{env('HOME_URL')}}";
        window.diamond_id="{{$product['diamond_id'],''}}";;
    </script>
    <div id="searchProduct"></div> 
    <script src="{{env('HOME_URL')}}js/app.js"> </script>
  </body>
</html>