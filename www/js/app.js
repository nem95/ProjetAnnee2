// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('myApp', ['ionic','HomeController'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {


  $stateProvider.state('home', {
      url: '/home',
      templateUrl: 'templates/home.html'
    })

  $stateProvider.state('signup', {
      url: '/signup',
      templateUrl: 'templates/signup.html'
    })

  $stateProvider.state('login', {
    url: '/login',
    templateUrl: 'templates/login.html'
  })
  $stateProvider.state('updateprofil', {
    url: '/updateprofil',
    templateUrl: 'templates/updateprofil.html'
  })
  $stateProvider.state('updatemdp', {
    url: '/updatemdp',
    templateUrl: 'templates/updatemdp.html'
  })

  $stateProvider.state('profil', {
    url: '/profil/:id',
    templateUrl: 'templates/profil.html'
  })
  $stateProvider.state('user', {
    url: '/user-profil/:id',
    templateUrl: 'templates/user-profil.html'
  })

  $stateProvider.state('event_create', {
    url: '/create_event',
    templateUrl: 'templates/event_create.html'
  })

  $stateProvider.state('event', {
    url: '/event/:id',
    templateUrl: 'templates/event.html'
  })

  $urlRouterProvider.otherwise('/signup')
})
