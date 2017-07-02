app.controller("JournalEditCtrl", function($scope, $rootScope, $routeParams, $location, DrinkFactory, NoteFactory){
	$scope.buttonType="Update";
    $scope.edit = true;
	let loadDrinkInfo = () => {
		DrinkFactory.getSingleEntry($routeParams.id).then((drinkResult) => {
    		$scope.drink = drinkResult;
	    	if ($scope.drink.bevType==="beer"){
	    		$scope.beer=true;
	    	} else {
	    		$scope.beer=false;
	    	}
            $scope.drink.mostRecentDate = new Date();

        }).catch((error) => {
            console.log("getSingleEntry error", error);
        });
        NoteFactory.getNoteList($rootScope.user.uid).then((noteResults) => {
            $scope.previousNotes= [];
            for (i=0; i<noteResults.length; i++){
                if (noteResults[i].bevId===$scope.drink.bevId){
                    $scope.previousNotes.push(noteResults[i]);
                }
            }
        }).catch((error) => {
            console.log("get comment list error", error);
        });
    };
    loadDrinkInfo();

    $scope.submitDrink = (drink) => {
        $scope.userNote = {};
        $scope.userNote.bevId = $scope.drink.bevId;
        $scope.userNote.uid = $rootScope.user.uid;
        $scope.userNote.date = $scope.drink.mostRecentDate;
        NoteFactory.postNewNote($scope.userNote).then((results) => {
            $scope.userNote = {};
        }).catch((error) => {
            console.log("Add note error", error);
        });
    	DrinkFactory.editJournalEntry(drink).then((results) => {
    		$location.url('/journal/listView');
    	}).catch((error) => {
    		console.log("edit entry error", error);
    	});
    };
});