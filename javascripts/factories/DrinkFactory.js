app.factory("DrinkFactory", function($q, $http, FIREBASE_CONFIG){

	let getDrinks = (sortId) => {
		let drinks = [];
		return $q((resolve, reject) => {
			$http.get(`${FIREBASE_CONFIG.databaseURL}/beverages.json?orderBy="placeId"&equalTo="${sortId}"`)
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
		console.log("newDrink in factory", newDrink);
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
