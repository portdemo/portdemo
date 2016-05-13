'use strict';

/**
 * @ngdoc overview
 * @name portalApp
 * @description
 * # portalApp
 *
 * Main module of the application.
 */
angular
  .module('portalApp', [
    'ui.router',
    'ui.bootstrap',
    'ngMessages',
    'ui.validate',
    'ngStorage',
    'ui.grid',
    'ui.grid.expandable'
  ]).config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'loginCtrl',
        authRequired : 0,
      })
      .state('home', {
        url: '/home',
        templateUrl: 'views/dashboard.html',
        authRequired : 1,
        //controller: 'dashboardCtrl'
      })
      .state('claims', {
        url: '/claims',
        templateUrl: 'views/claims.html',
        authRequired : 1,
        /*controller: 'claimsCtrl'*/
      })
      .state('register',{
        url: '/register',
        templateUrl: 'views/register.html',
        authRequired : 0,
        controller: 'registerCtrl'
      });   

    $urlRouterProvider.otherwise('/login');
  })
  .run(function($rootScope, $state, $stateParams, $location, $localStorage) {
  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
    if(toState.authRequired) {
      if($localStorage.username == ''){
        $state.go('login',{'reload':true});
      }
    }else{
      if($localStorage.username.length>0){
        $state.go($state.current.name,{reload:true});
      }
    }
  });
});
