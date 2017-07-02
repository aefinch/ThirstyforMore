let isAuth = (AuthFactory) => new Promise ((resolve, reject) => {
  if(AuthFactory.isAuthenticated()){
    resolve();
  } else {
    reject();
  }
});

app.run(function($location, $rootScope, FIREBASE_CONFIG, GOOGLE_CONFIG, AuthFactory) {
  firebase.initializeApp(FIREBASE_CONFIG);
  GoogleMapsLoader.KEY = GOOGLE_CONFIG;
  GoogleMapsLoader.LIBRARIES = ['places'];
  GoogleMapsLoader.load(function(google) {
});

  $rootScope.$on('$routeChangeStart', function(event, currRoute, prevRoute) {
    // checks to see if there is a current user
    var logged = AuthFactory.isAuthenticated();

    var appTo;

    // to keep error from being thrown on page refresh
    if (currRoute.originalPath) {
      // check if the user is going to the auth page = currRoute.originalPath
      // if user is on auth page then appTo is true
      // if it finds something other than /auth it return a -1 and -1!==-1 so resolves to false
      appTo = currRoute.originalPath.indexOf('/auth') !== -1;
    }

    //if not on /auth page AND not logged in redirect to /auth
    if (!appTo && !logged) {
      event.preventDefault();
      $location.path('/auth');
    }
  });
});



app.config(function($routeProvider) {
  $routeProvider
  .when('/auth', {
    templateUrl: 'partials/auth.html',
    controller: 'AuthCtrl'
  })
  .when('/logout', {
    templateUrl: 'partials/auth.html',
    controller: 'AuthCtrl', 
    resolve: {isAuth}
  })
  .when('/home', {
    templateUrl: 'partials/chooseDrinkType.html',
    controller: 'chooseDrinkCtrl',
    resolve: {isAuth}
  })
  .when('/locations/drinkType/brewery', {
    templateUrl: 'partials/beerLocations.html',
    controller: 'BeerLocationCtrl',
    resolve: {isAuth}
  })
  .when('/locations/drinkType/winery', {
    templateUrl: 'partials/wineLocations.html',
    controller: 'WineLocationCtrl',
    resolve: {isAuth}
  })
  .when('/locations/brewery/:id', {
    templateUrl: '/partials/drinkList.html',
    controller: 'DrinkCtrl',
    resolve: {isAuth}
  })
  .when('/locations/winery/:id', {
    templateUrl: '/partials/drinkList.html',
    controller: 'DrinkCtrl', 
    resolve: {isAuth}
  })
  .when('/journal/drink/:id', {
    templateUrl: '/partials/journalEntry.html',
    controller: 'JournalCtrl',
    resolve: {isAuth}
  })
  .when('/journal/listView', {
    templateUrl: '/partials/journalList.html',
    controller: 'JournalListCtrl',
    resolve: {isAuth}
  })
  .when('/journal/edit/:id', {
    templateUrl: '/partials/journalEntry.html',
    controller: 'JournalEditCtrl',
    resolve: {isAuth}
  })
  .when('/user/profile', {
    templateUrl: '/partials/userAccount.html',
    controller: 'AccountCtrl',
    resolve: {isAuth}
  })
  .when('/user/favorites', {
    templateUrl: '/partials/favorites.html',
    controller: 'FavoritesCtrl',
    resolve: {isAuth}
  })
  .otherwise('/home');
});