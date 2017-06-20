app.controller("JournalCtrl", function ($location, $scope, $routeParams, $rootScope, DrinkFactory){
	let bevId = $routeParams.id;
	let loadDrinkInfo = (bevId) => {
		$scope.drink = [];
		DrinkFactory.getDrinks(bevId, "bevId").then((drinkz) => {
    		$scope.drink = drinkz[0];
    		$scope.drink.userRating="";
    		$scope.drink.userNotes="";
            $scope.drink.id="";
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
            $location.url(`/journal/listView`);
    	}).catch((error) => {
    		console.log("Add error", error);
    	});
    };
    $scope.buttonType="Submit";
    $scope.submitDrink = (drink) => {
	    $scope.drink.uid = $rootScope.user.uid;
	    addNewDrink($scope.drink);
	};
});