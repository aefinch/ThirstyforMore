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
	return {postNewDrink:postNewDrink, getDrinks:getDrinks};
});
