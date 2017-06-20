app.controller("chooseDrinkCtrl", function($scope, $location){
	$scope.drinkType = (type) => {
		if (type==="beer"){
			$location.url('/locations/drinkType/brewery');
		} else {
			$location.url('/locations/drinkType/winery');
		}
	};
});