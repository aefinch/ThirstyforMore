app.factory("DrinkFactory", function($q, $http, FIREBASE_CONFIG){

	let getDrinks = (sortId, sortType) => {
		let drinks = [];
		return $q((resolve, reject) => {
			$http.get(`${FIREBASE_CONFIG.databaseURL}/beverages.json?orderBy="${sortType}"&equalTo="${sortId}"`)
			.then((fbDrinks) => {
				let drinkOptions = fbDrinks.data;
				Object.keys(drinkOptions).forEach((key) => {
					drinkOptions[key].id=key;
					drinks.push(drinkOptions[key]);
				});
				resolve(drinks);
			}).catch((error) => {
				reject(error);
			});
		});
	};

	let getSingleEntry = (entryId) => {
		return $q((resolve, reject) => {
			$http.get(`${FIREBASE_CONFIG.databaseURL}/beverages/${entryId}.json`)
			.then((results) => {
				resolve(results.data);
			}).catch((error) => {
				reject(error);
			});
		});
	};

	let postNewDrink = (newDrink) => {
		return $q((resolve, reject) => {
			$http.post(`${FIREBASE_CONFIG.databaseURL}/beverages.json`, JSON.stringify(newDrink))
			.then((results) => {
				resolve(results);
			}).catch((error) => {
				reject(error);
			});
		});
	};

	let editJournalEntry = (revisedEntry) => {
		console.log("in the factory", revisedEntry);
		return $q((resolve, reject) => {
			$http.put(`${FIREBASE_CONFIG.databaseURL}/beverages/${revisedEntry.id}.json`,
				JSON.stringify({
		        	ABV: revisedEntry.ABV,
		        	IBU: revisedEntry.IBU,
		        	beerStyle: revisedEntry.beerStyle,
		        	bevId: revisedEntry.bevId,
		            bevName: revisedEntry.bevName,
		            bevType: revisedEntry.bevType,
		        	brewery: revisedEntry.brewery,
		        	id: revisedEntry.id,
					placeId: revisedEntry.placeId,
		        	tastedDate: revisedEntry.tastedDate,
		            uid: revisedEntry.uid,
		            userNotes: revisedEntry.userNotes,
		            userRating: revisedEntry.userRating,
		        	varietal: revisedEntry.varietal,
		        	vineyard: revisedEntry.vineyard,
		        	wineType: revisedEntry.wineType
				}))
			.then((results) => {
				resolve(results);
			}).catch((error) => {
				reject(error);
			});
		});
	};

	let deleteEntry = (id) => {
		return $q((resolve, reject) => {
			$http.delete(`${FIREBASE_CONFIG.databaseURL}/beverages/${id}.json`)
			.then((results) => {
				resolve(results);
			}).catch((error) => {
				reject(error);
			});
		});
	};

	return {postNewDrink:postNewDrink, getDrinks:getDrinks, getSingleEntry:getSingleEntry, editJournalEntry: editJournalEntry, deleteEntry:deleteEntry};
});
