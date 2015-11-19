angular.module('drone', [
  'drone.services',
  'drone.auth',
  'drone.map', 
  'drone.projects', 
  'drone.users',
  'ngRoute'
])
.config(function($routeProvider, $httpProvider) {
  $routeProvider
    .when('/signin', {
      templateUrl: 'app/auth/signin.html',
      controller: 'AuthController'
    })
    .when('/about', {
      templateUrl: 'app/about/about.html',
    })
    .when('/signup', {
      templateUrl: 'app/auth/signup.html',
      controller: 'AuthController'
    })
    .when('/map', {
      templateUrl: 'app/map/map.html',
      controller: 'MapController',
      authenticate: true,
    })
    .when('/projects', {
      templateUrl: 'app/projects/openProjects.html',
      controller: 'ProjectController',
    })
    .when('/submitProjects', {
      templateUrl: 'app/projects/projectSubmit.html',
      controller: 'ProjectController',
      authenticate: true,
    })
    .when('/userProfile', {
      templateUrl: 'app/users/users.html',
      controller: 'UsersController',
      authenticate: true,
    })
    .otherwise({
      redirectTo: '/signin'
    });
    
    // We add our $httpInterceptor into the array
    // of interceptors. Think of it like middleware for your ajax calls
    $httpProvider.interceptors.push('AttachTokens');
})
.factory('AttachTokens', function ($window) {
  // This $httpInterceptor stops all out-going requests, looks in local storage, find the user's token,
  // and then adds it to the header so the server can validate the request.
  var attach = {
    request: function (object) {
      var jwt = $window.localStorage.getItem('com.drone');
      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
})
.run(function ($rootScope, $location, Auth) {
  // Inside the run phase of Angular, our services and controllers have just been registered and our app is ready.
  // However, we want to make sure the user is authorized so we listen for when Angular is trying to change routes.
  // When it does change routes, we look for the token in localstorage and send that token to the server 
  // to see if it's a real user or hasn't expired. If it's not valid, we redirect back to signin/signup.
  $rootScope.$on('$routeChangeStart', function (evt, next, current) {
    if (next.$$route && next.$$route.authenticate && !Auth.isAuth()) {
      $location.path('/signin');
    }
  });
});
