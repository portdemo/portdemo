'use strict';

/**
 * @ngdoc function
 * @name portalApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the portalApp
 */
angular.module('portalApp')
 /*
 * Controller for authentication for login
 */
  .controller('loginCtrl', function ($scope, $state, $localStorage, loginService, $timeout, $rootScope) {
    /*if($localStorage.useremail){
        alert('yes stored');
    }*/
    $scope.hidden = true;
    if($localStorage.username || $localStorage.username !=""){
      $rootScope.login = $localStorage.username;
    }

    $scope.onLogin = function(username,password){
        //console.log(username +' '+ password);
        //console.log('you clicked');
        loginService.getUser().then(function(data) {
            $scope.users = data;
            //var login = false;
            var len = $scope.users.length;
            for(var i=0;i<len;i++){
                if(username == $scope.users[i].userName && password == $scope.users[i].password){
                    //login = true;
                    $localStorage.username = username;
                    $rootScope.login = $localStorage.username;
                }
            }
            if($rootScope.login){
                $state.go('home',{reload:true});
            }
            else {
                //alert('Invalid Username or Password');
                 $timeout(function(){
                    $scope.hidden = false;
                    $scope.startFade = true;
                    $scope.error = "Invalid Username or password";
                }, 5000);
                return false;
            }
        });
        
        //$state.go('home');
    }

    $scope.logout = function(){
      $localStorage.username = '';
      $rootScope.login = $localStorage.username;
      $state.go('login', {reload: true});
    };
  });

  /*
   * Controller for displaying banner data
   */
angular.module('portalApp')
 .controller('bannerCtrl', function($scope, $state, $localStorage, loginService){
     if(!$localStorage.username || $localStorage.username == ""){
         $state.go('login');
     }
    loginService.getUser().then(function(data){
        $scope.banners = data;
        var leng = $scope.banners.length;
        for(var i=0;i<leng;i++){
            if($localStorage.username == $scope.banners[i].userName){
                $scope.first_name =$scope.banners[i].firstName;
                $scope.member_id =$scope.banners[i].memberId;
                $scope.plan_name =$scope.banners[i].planName;
                $scope.last_login =$scope.banners[i].lastLogin.replace(/ /g,'T');
                $scope.newDate = new Date($scope.last_login);
            }
        }
    })
 });

/*
*Created a Factory for login and banner to show data
*
*/
angular.module('portalApp')
    .factory('loginService', loginFactory);

    function loginFactory($http) {
      this.$inject = ['$http'];
      return {
        getUser: getUser
      };

      function getUser () {
        return $http
          .get('http://10.236.91.188:8080/SpringRestfulWebServicesWithJSONExample/member')
          .then(complete)
          .catch(failed);
      }

      function complete(response) {
        return response.data;
      }

      function failed(error) {
        return error.statusText;
      }
    }
