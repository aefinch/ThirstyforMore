app.factory("PlaceFactory", function($q, $http, FIREBASE_CONFIG){
	let getPlaces = (uid) => {
		let favoritePlaces = [];
		return $q((resolve, reject) => {
			$http.get(`${FIREBASE_CONFIG.databaseURL}/places.json?orderBy="uid"&equalTo="${uid}"`)
			.then((fbPlaces) => {
				favoritePlaces = fbPlaces.data;
				Object.keys(favoritePlaces).forEach((key) => {
					favoritePlaces[key].fbID=key;
					if (favoritePlaces[key].drinkType==="beer"){
					favoritePlaces[key].type="brewery";
				} else {
					favoritePlaces[key].type="winery";
				}
				});
				resolve(favoritePlaces);
			}).catch((error) => {
				reject(error);
			});
		});
	};

	let addFavoritePlace = (newPlace) => {
		return $q((resolve, reject) => {
			$http.post(`${FIREBASE_CONFIG.databaseURL}/places.json`, JSON.stringify(newPlace))
			.then((results) => {
				resolve(results);
			}).catch((error) => {
				reject(error);
			});
		});
	};

	let deletePlace = (id) => {
		return $q((resolve, reject) => {
			$http.delete(`${FIREBASE_CONFIG.databaseURL}/places/${id}.json`)
			.then((results) => {
				resolve(results);
			}).catch((error) => {
				reject(error);
			});
		});
	};
	return {addFavoritePlace:addFavoritePlace, getPlaces:getPlaces, deletePlace:deletePlace};
});