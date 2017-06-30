app.controller("JournalCtrl", function ($location, $scope, $routeParams, $rootScope, DrinkFactory, NoteFactory){
	let bevId = $routeParams.id;
    $scope.edit = false;
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

    let addNewDrink = (drink, comment) => {
        NoteFactory.postNewNote(comment).then((results) => {
            $scope.userNote = {};
        }).catch((error) => {
            console.log("Add note error", error);
        });
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
        $scope.drink.tastedDate = new Date();
        $scope.drink.favorite = false;
        $scope.userNote.bevId = $scope.drink.bevId;
        $scope.userNote.uid = $rootScope.user.uid;
        $scope.userNote.date = $scope.drink.tastedDate;
	    addNewDrink($scope.drink, $scope.userNote);
	};
});