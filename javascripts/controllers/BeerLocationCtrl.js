app.controller("BeerLocationCtrl", function($scope, $location, $routeParams){
var service;
var infoWindow;
wateringHoles = [];
  let initMap = () => {
    var map = new google.maps.Map(document.getElementById('beerMap'), {
      zoom: 12,
      center: {lat: 36.174465, lng: -86.767960}
    });
    var geocoder = new google.maps.Geocoder();
    document.getElementById('submit').addEventListener('click', function() {
      geocodeAddress(geocoder, map);
    });

    map.addListener("bounds_changed", () => {
      var bounds=map.getBounds();
      var request = {
        bounds: bounds,
        query: "brewery"
      };
      
      infoWindow = new google.maps.InfoWindow();
      service = new google.maps.places.PlacesService(map);
      service.textSearch(request, callback);
    });


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

  function createMarker(place) {
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location
    });
    marker.addListener('click', function() {
      infoWindow.setContent(place.name);
      infoWindow.open(map, this);
        if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(google.maps.Animation.BOUNCE);
        }
    });
  }


  function callback(results, status) {
      wateringHoles=[];
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
            results[i].type = "brewery";
            wateringHoles.push(results[i]);
          }
        }
        $scope.$apply(function(){
          $scope.places = wateringHoles;
          wateringHoles=[];
        });
      }
  };

  initMap();
});
