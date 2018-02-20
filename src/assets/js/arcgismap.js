
      var myArray = [];
      color1=226;
      color2=119;


require([
      "esri/Map",
      "esri/PopupTemplate",
      "esri/views/MapView",
      "esri/Graphic",
      "esri/geometry/Polyline",
      "esri/geometry/support/webMercatorUtils",
      "esri/symbols/SimpleMarkerSymbol",
      "esri/symbols/SimpleLineSymbol",
      "esri/symbols/SimpleFillSymbol",
      "dojo/domReady!"
    ], function(
      Map, PopupTemplate, MapView,
      Graphic, Polyline, webMercatorUtils,
      SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol
    ) {

      var map = new Map({
        basemap: "hybrid"
      });

      var view = new MapView({
        center: [18.6196, 45.5650],
        container: "viewDiv",
        map: map,
        zoom: 17
      });


      /***************************
       * JSON format.
       *************************/

      /*
             var myArray = [
      {
      id: 18,
      vehicle_Nr: 356823033277554,
      lat: 4534.1123,
      lng: 1837.2132,
      time: "2018-02-12T16:24:29"
      },
      {
      id: 20,
      vehicle_Nr: 356823033277554,
      lat: 4534.2123,
      lng: 1937.1942,
      time: "2018-02-12T23:45:41"
      }
      ];
      */

      var PolylinesCollection = new Array();

      // For each vehicle draw a route
      // 356823033277554, 356823033277555

      /*******************************************
      * For each vehicle draw a route.
      * Just a example of vehicle numbers hardcoded.
      * This should be retrieved from database.
      * 356823033277554, 356823033277555
      ******************************************/

      var vehicles = [356823033277554, 356823033277555];

      var vehicleLen;
      vehicleLen = vehicles.length;

      for (i = 0; i < vehicleLen; i++) {
        //console.log(vehicles[i]);
        //console.log(vehicleLen);
        preparePolylines(vehicles[i]);
      }

      async function getCoordinates(xhr) {         
        var url = "http://35.204.150.105/api/coordinates/"+xhr;
      }

      function moveDecimal(n) {
        var l = n.toString().length-3;
        var v = n/Math.pow(10, 2);
        return v;
      }

      async function preparePolylines(vehicle){

      //console.log(vehicle);

        var v = vehicle;
        var i;
        var coords = []; 
        

        getCoordinates(v);
        
        //console.log(myArray);

        //console.log(myArray);

        let data = await (await fetch('http://35.204.150.105/api/coordinates/'+vehicle)).json();
        //console.log(data);
        var myArray = JSON.parse(JSON.stringify(data));
      
      /*
       var myArray = [
      {
      id: 18,
      vehicle_Nr: 356823033277554,
      lat: 4534.1123,
      lng: 1837.2132,
      time: "2018-02-12T16:24:29"
      },
      {
      id: 20,
      vehicle_Nr: 356823033277554,
      lat: 4534.2123,
      lng: 1937.1942,
      time: "2018-02-12T23:45:41"
      },
            {
      id: 20,
      vehicle_Nr: 356823033277555,
      lat: 4534.2823,
      lng: 1937.1942,
      time: "2018-02-12T23:45:41"
      },
            {
      id: 20,
      vehicle_Nr: 356823033277555,
      lat: 4534.2123,
      lng: 1937.2942,
      time: "2018-02-12T23:45:41"
      },
      ];

     */ 

     // console.log(myArray);

      /*******************************************
      * Iterate received json with gps data.
      * Gps data should be converted to match
      * esri map coordinates format.
      ******************************************/

      for(i = 0; i < myArray.length; i++) {
        moveDecimal(myArray[i].lng, myArray[i].lat);
        coords.push([moveDecimal(myArray[i].lng), moveDecimal(myArray[i].lat)]);
        //console.log([moveDecimal(myArray[i].lng), moveDecimal(myArray[i].lat)]);
      }


      var polylineLatLong = new Polyline();
    
      polylineLatLong.addPath(coords);  

      var webMercatorPolyline = webMercatorUtils.geographicToWebMercator(polylineLatLong);
      
      

      // Create a symbol for drawing the line
      var lineSymbol = new SimpleLineSymbol({
        color: [color1, color2, 40],
        width: 4
      });

      color1=color1+100;
      color2=color2+100;

      // Create an object for storing attributes related to the line
      var lineAtt = {
        Name: "Put po slavoniji",
        Owner: vehicle,
      };
      
      var polylineGraphic = new Graphic({
        geometry: webMercatorPolyline,
        symbol: lineSymbol,
        attributes: lineAtt,
        popupTemplate: new PopupTemplate({
          title: "{Name}",
          content: "{*}"
        })
      });

      view.graphics.addMany([polylineGraphic]);

      }

    });
