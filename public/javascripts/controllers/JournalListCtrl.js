app.controller("JournalListCtrl", function($scope, $rootScope, $location, DrinkFactory){
	$scope.userName = $rootScope.user.name;
	$scope.philosophy = $rootScope.user.philosophy;

	let getFullJournal = () => {
		$scope.drinks = [];
		DrinkFactory.getDrinks($rootScope.user.uid, "uid").then((drinkz) => {
    		$scope.drinks = drinkz;
    	}).catch((error) => {
    		console.log("getFullJournal error", error);
    	});
	};
	getFullJournal();

	$scope.editJournalEntry = (id) => {
		$location.url(`/journal/edit/${id}`);
	};
	$scope.deleteJournalEntry = (id) => {
		DrinkFactory.deleteEntry(id).then((results) => {
			getFullJournal();
		}).catch((error) => {
			console.log("deleteError", error);
		});
	};

	$scope.sortResults = (value) => {
		$scope.sortBy = value;
	};
	$scope.filterResults = (value) => {
		$scope.filterBy = value;
	};
	$scope.filterByFavorite = () => {
		$scope.favoriteFilter  = true;
		console.log($scope.favoriteFilter);
	};
	$scope.favoriteIt = (entry) => {
		entry.favorite = !entry.favorite;
		DrinkFactory.editJournalEntry(entry)
		.then((results) => {

		}).catch((error) => {
			console.log("edit journal entry error", entry);
		});
	};

});
