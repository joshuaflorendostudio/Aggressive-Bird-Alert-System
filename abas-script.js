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
  };

  var map = new google.maps.Map(document.getElementById('map'), options);
  //USER that gets its current geolocation.
  user = navigator.geolocation;
  user.getCurrentPosition(success, fail);

  /* //watchID not yet working
  var watchID = navigator.geolocation.watchPosition(success, fail);
  navigator.geolocation.clearWatch(watchID); */

  function success(position){
    var myLat = position.coords.latitude;
    var myLng = position.coords.longitude;

    var coords = new google.maps.LatLng(myLat,myLng);
    var marker = new google.maps.Marker({map:map, position:coords, icon:'user-icon.png'});
    var userLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    map.setCenter(userLocation);

    /*
    //function working but needs to append to add marker button
    function newMarker(position){
      var birdMarker = new google.maps.Marker({
        position: userLocation,
        map: map,
        icon: 'bird-icon.png'
      });
    }/*/

    //most recent add marker button may be best to use addListener

    //newMarker();

  }
  function fail(){}

  //function and property: coordinates and message
  //add marker function
  function addMarker(props){

    var marker = new google.maps.Marker({
      position: props.coords,
      map:map,
      icon: 'bird-icon.png'

      });

    //check for infowindow property in specific marker
    if(props.content){
      var infoWindow = new google.maps.InfoWindow({
        content: props.content + reportbutton
        });

        marker.addListener('click', function(){
                   infoWindow.open(map, marker);
      });


    };//if closing bracket

  };//marker function closing bracket

  /*
  //geofence
  const markerFence = new google.maps.Circle({
    strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
      center: marker.position,
      radius: 100px,
  }); */


  //addMarker({position: props.userLocation}, {content:'<h1>Plover</h1>'})
    addMarker({coords:{lat:-12.4634, lng:130.8456},
      content:'<h1>Plover</h1>'});
    addMarker({coords:{lat:-12.4624, lng:130.8356},
      content:'<h1>Curlew</h1>'})


}; //closing for initMap

// Append the 'script' element to 'head'
document.head.appendChild(script);
//note for further development: get location and make that location to the new marker
var reportbutton = '<button onclick="report()">Report</button>';
function report(){
  console.log("Reported!")
};

window.onload = function(){
  var addmarkerbutton = document.getElementById("addmarkerBtn");
  addmarkerbutton.onclick = function (){
    confirm("Report bird location?");
    //placeMarker(e.latLng, map);
    //addMarker({coords: mapsMouseEvent.LatLng, content:'bird'});
    // #not working document.getElementById("click").onclick = newMarker();
    newMarker();
    //addMarker({coords: navigator.geolocation, content:'bird'});
    console.log('Add marker at this point');
  };
};




//trial marker connection for buttons
