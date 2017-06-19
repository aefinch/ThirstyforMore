app.controller("DrinkCtrl", function ($location, $scope, $rootScope, $routeParams, DrinkFactory){
	
    $scope.newBev=false;
    $scope.drinks = [];
    let getDrinkOptions = (placeId) => {
    	DrinkFactory.getDrinks(placeId, "placeId").then((drinkz) => {
    		for (i=0; i<drinkz.length; i++){
                if(drinkz[i].userRating===""){
                    $scope.drinks.push(drinkz[i]);
                }
            }
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
    	DrinkFactory.postNewDrink(drink)
        .then((results) => {
    		$scope.drink = {};
            $location.url(`/journal/drink/${drink.bevId}`);
    	}).catch((error) => {
    		console.log("Add error", error);
    	});
    };

    $scope.submitNewDrink = (newDrink) => {
        let currentLocation = $location.url();
        if (currentLocation.includes("brewery")){
            $scope.drink.bevType = "beer";
        } else {
            $scope.drink.bevType = "wine";
        }
    	$scope.drink.bevId = newDrink.toLowerCase().replace(/ /g, "");
	    $scope.drink.placeId = $routeParams.id;
	    $scope.drink.uid = "";
	    $scope.drink.bevName = newDrink;
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
        $scope.drink.id = "";
	    addNewDrink($scope.drink);
	};


});