app.factory("UserFactory", function($q, $http, FIREBASE_CONFIG) {
	let addUser = (authData) => {
		return $q((resolve, reject) => {
			console.log("consoling auth", authData);
			$http.post(`${FIREBASE_CONFIG.databaseURL}/users.json`,
				JSON.stringify({
					uid: authData.uid,
					name: authData.name,
					avatar: authData.avatar,
					registrationDate: authData.date,
					philosophy: authData.philosophy
				})
			).then((storeUserSuccess) => {
				resolve(storeUserSuccess);
			}).catch((storeUserError) => {
				reject(storeUserError);
			});
		});
	};

	let getUser = (userId) => {
		return $q((resolve, reject) => {
			$http.get(`${FIREBASE_CONFIG.databaseURL}/users.json?orderBy="uid"&equalTo' ="${userId}"`)
			.then((userObject) => {
				let users = [];
				Object.keys(userObject.data).forEach((key) => {
					users.push(userObject.data[key]);
					users[0].id = key;
				});
				resolve(users[0]);
			}).catch((error) => {
				reject(error);
			});
		});
	};

	return {addUser:addUser, getUser:getUser};

});