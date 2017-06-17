app.controller("LocationCtrl", function($scope, $location, $routeParams){
var service;
var map;
var bounds;
	function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 12,
          center: {lat: 36.174465, lng: -86.767960}
        });
        var geocoder = new google.maps.Geocoder();
        bounds=map.getBounds();
        document.getElementById('submit').addEventListener('click', function() {
          geocodeAddress(geocoder, map);
        });
      var request = {
	    bounds: bounds,
	    query: $routeParams.type
	  };
	  service = new google.maps.places.PlacesService(map);
	  service.textSearch(request, callback);
      }

      function geocodeAddress(geocoder, resultsMap) {
        var address = document.getElementById('address').value;
        geocoder.geocode({'address': address}, function(results, status) {
          if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);
            // 
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
        });
      }
    initMap();
    let createMarker = (position) => {
    	marker = new google.maps.Marker({
              map: map,
	          animation: google.maps.Animation.DROP,
              position: position.geometry.location
            });
             // marker.addListener('click', toggleBounce);
        // function toggleBounce() {
         //  if (marker.getAnimation() !== null) {
         //    marker.setAnimation(null);
         //  } else {
         //    marker.setAnimation(google.maps.Animation.BOUNCE);
         //  }
        // }
    };

  function callback(results, status) {
    console.log("results", results);
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        var place = results[i];
        createMarker(results[i]);
      	marker.setMap(map);
	    }
	  }
	}
});
