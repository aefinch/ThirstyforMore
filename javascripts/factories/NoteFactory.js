app.factory("NoteFactory", function($q, $http, FIREBASE_CONFIG){

	let getNoteList = (uid) => {
		let comments = [];
		return $q((resolve, reject) => {
			$http.get(`${FIREBASE_CONFIG.databaseURL}/userNotes.json?orderBy="uid"&equalTo="${uid}"`)
			.then((fbNotes) => {
				let userNotes = fbNotes.data;
				Object.keys(userNotes).forEach((key) => {
					userNotes[key].id=key;
					comments.push(userNotes[key]);
				});
				resolve(comments);
			}).catch((error) => {
				reject(error);
			});
		});
	};

	// let getSingleEntry = (entryId) => {
	// 	return $q((resolve, reject) => {
	// 		$http.get(`${FIREBASE_CONFIG.databaseURL}/beverages/${entryId}.json`)
	// 		.then((results) => {
	// 			results.data.id = entryId;
	// 			resolve(results.data);
	// 		}).catch((error) => {
	// 			reject(error);
	// 		});
	// 	});
	// };

	let postNewNote = (newNote) => {
		return $q((resolve, reject) => {
			$http.post(`${FIREBASE_CONFIG.databaseURL}/userNotes.json`, JSON.stringify(newNote))
			.then((results) => {
				resolve(results);
			}).catch((error) => {
				reject(error);
			});
		});
	};

	return {postNewNote:postNewNote, getNoteList:getNoteList};
});
