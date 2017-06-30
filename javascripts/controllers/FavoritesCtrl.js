app.controller("FavoritesCtrl", function($scope, $rootScope, $routeParams, DrinkFactory, PlaceFactory){
	let getFavoriteDrinks = () => {
		$scope.favoriteDrinks = [];
		DrinkFactory.getDrinks($rootScope.user.uid, "uid").then((drinkz) => {
    		for (i=0; i < drinkz.length; i++) {
    			if (drinkz[i].favorite===true){
    				$scope.favoriteDrinks.push(drinkz[i]);
    			}
    		}
    	}).catch((error) => {
    		console.log("getFullJournal error", error);
    	});
	};
	let getFavoritePlaces = () => {
		$scope.favoritePlaces = [];
		PlaceFactory.getPlaces($rootScope.user.uid).then((places) => {
			$scope.favoritePlaces = places;
		}).catch((error) => {
			console.log("get favorite place list error", error);
		});
	};

	$scope.removeFavoriteDrink = (entry) => {
		entry.favorite = !entry.favorite;
		DrinkFactory.editJournalEntry(entry)
		.then((results) => {
			getFavoriteDrinks();
		}).catch((error) => {
			console.log("edit journal entry error", entry);
		});
	};

	$scope.removeFavoritePlace = (place) => {
		PlaceFactory.deletePlace(place.fbID)
		.then((results) => {
			getFavoritePlaces();
		}).catch((error) => {
			console.log("remove favorite place error", error);
		});
	};


	getFavoritePlaces();
	getFavoriteDrinks();
});