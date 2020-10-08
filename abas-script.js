// Initialize and add the map
// Create the script tag, set the appropriate attributes
var script = document.createElement('script');
script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAhvNby-L503-0uckQZdGAuVs3VSKg4EDQ&callback=initMap';
script.defer = true;

// Attach callback function to the `window` object
window.initMap = function() {
  var options = {
    zoom:16,
    center: {lat:-12.4634,lng:130.8456}
  }

  var map = new google.maps.Map(document.getElementById('map'), options);
  //USER that gets its current geolocation.
  user = navigator.geolocation;
  user.getCurrentPosition(success, fail);

  function success(position){
    var myLat = position.coords.latitude;
    var myLng = position.coords.longitude;

    var coords = new google.maps.LatLng(myLat,myLng);
    var marker = new google.maps.Marker({map:map, position:coords, icon:'user-icon.png'});
    var userLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    map.setCenter(userLocation);
  }
  function fail(){}

  //function and property: coordinates and message
  //add marker function
  function addMarker(props){
    var marker = new google.maps.Marker({
      position:props.coords,
      map:map,
      icon: 'bird-icon.png'
      });

     //will add report function
    //create report function

    //check for infowindow property in specific marker
    if(props.content){
      var text ='Report'
      var reportString = text
      var infoWindow = new google.maps.InfoWindow({
        content: props.content + reportString
        });

        marker.addListener('click', function(){
                   infoWindow.open(map, marker);
                 });
    };//if closing bracket
  }//marker function closing bracket

    addMarker({coords:{lat:-12.4634, lng:130.8456},
      content:'<h1>Plover</h1>'});
    addMarker({coords:{lat:-12.4624, lng:130.8356},
      content:'<h1>Curlew</h1>'})

  /*
  //new Marker - works but contradicts the infoWindow listener
  map.addListener('click', function(mapsMouseEvent){
    //create Marker
    //addMarker({coords: mapsMouseEvent.LatLng, content:'bird'});
    console.log('Add marker at this point')
  })*/

}; //closing for initMap



// Append the 'script' element to 'head'
document.head.appendChild(script);

window.onload = function(){
  var addmarkerbutton = document.getElementById("addmarkerBtn")
  addmarkerbutton.onclick = function newMarker(){
    confirm("Report bird location?");
  };
}
