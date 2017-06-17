app.controller("DrinkCtrl", function ($location, $scope, $rootScope, $routeParams, DrinkFactory){
	
    $scope.newBev=false;
    $scope.drinks = [];
    let getDrinkOptions = (placeId) => {
    	DrinkFactory.getDrinks(placeId).then((drinkz) => {
    		$scope.drinks = drinkz;
    	}).catch((error) => {
    		console.log("getDrinkOptions error", error);
    	});
    };
    getDrinkOptions($routeParams.id);

    $scope.addNew = () => {
    	$scope.newBev = true;
	    $scope.drink={};
    };
    
    let addNewDrink = (drink) => {
    	DrinkFactory.postNewDrink(drink).then((results) => {
    		$scope.drink = {};
            $location.url(`/journal/drink/${drink.bevId}`);
    	}).catch((error) => {
    		console.log("Add error", error);
    	});
    };

    $scope.submitNewDrink = (drink) => {
    	$scope.drink.bevId = $scope.drink.drinkName.toLowerCase().replace(/ /g, "");
	    $scope.drink.placeId = $routeParams.id;
	    $scope.drink.uid = $rootScope.user.uid;
	    $scope.drink.bevName = $scope.drink.drinkName;
	    $scope.drink.bevType = "";
	    $scope.drink.userRating = "";
	    $scope.drink.tastedDate = "";
	    $scope.drink.userNotes = "";
	    $scope.drink.vineyard = "";
	    $scope.drink.varietal = "";
	    $scope.drink.wineType = "";
	    $scope.drink.brewery = "";
	    $scope.drink.beerStyle = "";
	    $scope.drink.ABV = "";
	    $scope.drink.IBU = "";
	    addNewDrink($scope.drink);
	};


});