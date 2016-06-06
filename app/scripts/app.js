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
    'ui.grid.expandable',
    'daterangepicker'
  ]).config(function($stateProvider, $urlRouterProvider,$httpProvider) {
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
      })
      .state('benefits',{
        url: '/benefits',
        templateUrl: 'views/benefits.html',
        authRequired : 1,
      })
      .state('benefits.find',{
        url: '/find',
        templateUrl: 'views/benefits-find-benefits.html',
        authRequired : 1,
        controller: 'benefitsCtrl'
      })
      .state('benefits.info',{
        url: '/info',
        templateUrl: 'views/benefits-plan-information.html',
        authRequired : 1,
      })
      .state('memberIdCard', {
        url: '/memberIdCard',
        templateUrl: 'views/memberIdCard.html',
        authRequired : 1,
        controller: 'memberCardCtrl'
      })
      .state('benefits.progress',{
        url: '/progress',
        templateUrl: 'views/benefits-plan-progress.html',
        authRequired : 1,
      })
      .state('benefits.service',{
        url: '/service',
        templateUrl: 'views/service-limits.html',
        authRequired : 1,
        controller: 'serviceLimitCtrl'
      });

    $urlRouterProvider.otherwise('/login');



$httpProvider.defaults.headers.common = {};
$httpProvider.defaults.headers.post = {};
$httpProvider.defaults.headers.put = {};
$httpProvider.defaults.headers.patch = {};


  })
  .run(function($rootScope, $state, $stateParams, $location, $localStorage) {
  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
    if(toState.authRequired) {
      if($localStorage.username == '' || $localStorage.username == undefined || $localStorage.username == null){
        $state.go('login',{'reload':true});
      }
    }else{
      if($localStorage.username){
        $state.go($state.current.name,{reload:true});
      }
    }
  });
})
.controller('HelloWorldController', ['$scope', function($scope) {
$scope.greeting = 'Hello World!';
}]);
