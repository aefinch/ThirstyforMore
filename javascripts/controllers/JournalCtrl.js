app.controller("JournalCtrl", function ($location, $scope, $routeParams, $rootScope, DrinkFactory){
	let bevId = $routeParams.id;

	let loadDrinkInfo = (bevId) => {
		$scope.drinks = [];
		DrinkFactory.getDrinks(bevId, "bevId").then((drinkz) => {
    		$scope.drink = drinkz[0];
    		$scope.drink.userRating="";
    		$scope.drink.userNotes="";
	    	if ($scope.drink.bevType==="beer"){
	    		$scope.beer=true;
	    	} else {
	    		$scope.beer=false;
	    	}
    	}).catch((error) => {
    		console.log("getDrinkOptions error", error);
    	});
    };
    loadDrinkInfo(bevId);

    let addNewDrink = (drink) => {
    	DrinkFactory.postNewDrink(drink).then((results) => {
    		$scope.drink = {};
            // $location.url(`/journal/drink/${drink.bevId}`);
    	}).catch((error) => {
    		console.log("Add error", error);
    	});
    };

    $scope.submitNewDrink = (drink) => {
	    $scope.drink.uid = $rootScope.user.uid;
	    addNewDrink($scope.drink);
	};
});