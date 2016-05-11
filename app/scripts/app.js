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
    'ngStorage'
  ]).config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'loginCtrl'
      })
      .state('home', {
        url: '/home',
        templateUrl: 'views/dashboard.html',
        //controller: 'dashboardCtrl'
      })
      .state('claims',{
        url: '/claims',
        templateUrl: 'views/claims.html',
        //controller: 'claimsCtrl'
      })
      .state('register',{
        url: '/register',
        templateUrl: 'views/register.html',
        controller: 'registerCtrl'
      });   

    $urlRouterProvider.otherwise('/login');
  });
