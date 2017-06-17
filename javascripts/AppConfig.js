let isAuth = (AuthFactory) => new Promise ((resolve, reject) => {
  if(AuthFactory.isAuthenticated()){
    // console.log("User is authenticated, resolve route promise");
    resolve();
  } else {
    // console.log("User is not authenticated, reject route promise");
    reject();
  }
});

app.run(function($location, $rootScope, FIREBASE_CONFIG, GOOGLE_CONFIG, AuthFactory) {
  firebase.initializeApp(FIREBASE_CONFIG);
  GoogleMapsLoader.KEY = GOOGLE_CONFIG;
  GoogleMapsLoader.LIBRARIES = ['places'];
  GoogleMapsLoader.load(function(google) {
});

  //watch method that fires on change of a route.  3 inputs. 
  //event is a change event
  //currRoute is information about your current route
  //prevRoute is information about the route you came from
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
  .when('/locations/drinkType/:type', {
    templateUrl: 'partials/locations.html',
    controller: 'LocationCtrl',
    resolve: {isAuth}
  })
  .when('/location/view/:id', {
    templateUrl: '/partials/drinkList.html',
    controller: 'DrinkCtrl',
    resolve: {isAuth}
  })
  .when('/wine/view/:id', {
    templateUrl: '/partials/wineJournal.html',
    controller: 'DrinkCtrl',
    resolve: {isAuth}
  })
  .when('/beer/view/:id', {
    templateUrl: '/partials/beerJournal.html',
    controller: 'DrinkCtrl',
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