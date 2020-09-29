// Initialize and add the map
// Create the script tag, set the appropriate attributes
var script = document.createElement('script');
script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAhvNby-L503-0uckQZdGAuVs3VSKg4EDQ&callback=initMap';
script.defer = true;

// Attach your callback function to the `window` object
window.initMap = function() {

  var options = {
    zoom:16,
    center: {lat:-12.4634,lng:130.8456}
  }

  var map = new google.maps.Map(document.getElementById('map'), options);

  user = navigator.geolocation;
  user.getCurrentPosition(success, fail);

  function success(position){
    var myLat = position.coords.latitude;
    var myLng = position.coords.longitude;

    var coords = new google.maps.LatLng(myLat,myLng);
    var marker = new google.maps.Marker({map:map, position:coords, icon:'user-icon.png'});
  }

  function fail(){}

  //function and property: coordinates and message
    function addMarker(props){
      var marker = new google.maps.Marker({
        position:props.coords,
        map:map,
        icon: 'bird-icon.png'
      });

      //check for infowindow property in specific marker
      if(props.content){
        var infoWindow = new google.maps.InfoWindow({
          content:props.content
        });

        marker.addListener('click', function(){
          infoWindow.open(map, marker);
        });
      }

    }


          //add marker function
        addMarker({coords:{lat:-12.4634, lng:130.8456},
          content:'<h1>Plover</h1>'});
        addMarker({coords:{lat:-12.4624, lng:130.8356},
          content:'<h1>Curlew</h1>'})
  // JS API is loaded and available

};

// Append the 'script' element to 'head'
document.head.appendChild(script);
