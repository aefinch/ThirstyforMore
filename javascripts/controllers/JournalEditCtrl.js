app.controller("JournalEditCtrl", function($scope, $routeParams, $location, DrinkFactory){
	$scope.buttonType="Update";
	let loadDrinkInfo = () => {
		DrinkFactory.getSingleEntry($routeParams.id).then((drinkResult) => {
    		$scope.drink = drinkResult;
	    	if ($scope.drink.bevType==="beer"){
	    		$scope.beer=true;
	    	} else {
	    		$scope.beer=false;
	    	}
    	}).catch((error) => {
    		console.log("getSingleEntry error", error);
    	});
    };
    loadDrinkInfo();

    $scope.submitDrink = (drink) => {
    	console.log(drink);
    	DrinkFactory.editJournalEntry(drink).then((results) => {
    		$location.url('/journal/listView');
    	}).catch((error) => {
    		console.log("edit entry error", error);
    	});
    };
});