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
<<<<<<< HEAD
      $rootScope.first_name = $localStorage.fName;
=======
      $rootScope.frstName = $localStorage.fName;
>>>>>>> kannan
        $state.go('home',{reload:true});
    }

    $scope.onLogin = function(username,password){
        //console.log(username +' '+ password);
        //console.log('you clicked');
        $scope.logindata = {};
        $scope.logindata.userName = username;
        $scope.logindata.password = password
        loginService.getUser(angular.toJson($scope.logindata)).then(function(data) {
            $scope.users = data;
            if(JSON.stringify($scope.users) === '{}'){
                 $timeout(function(){
                    $scope.hidden = false;
                    $scope.startFade = true;
                   $scope.error = "Invalid Username or password";
                }, 1000);
                return false;
            }
            else{
                //console.log($scope.users.firstName +" "+ $scope.users.memberId + " "+ $scope.users.planName + " " + $scope.users.lastLogin );
                $localStorage.fName = $scope.users.firstName;
                $localStorage.mId = $scope.users.memberId;
                $localStorage.pName = $scope.users.planName;
                $localStorage.lLogin = $scope.users.lastLogin;
                $localStorage.username = username;
                $rootScope.login = $localStorage.username;
                $rootScope.first_name = $localStorage.fName;
                $state.go('home',{reload:true});
            }
        }); 
        
        //$state.go('home');
    }
    $scope.logout = function(){
      $localStorage.username = '';
      $rootScope.login = $localStorage.username;
      $state.go('login', {reload: true});
    };

    $scope.printDiv = function(divName) {
      var printContents = document.getElementById(divName).innerHTML;
      var popupWin = window.open('', '_blank', 'width=300,height=300');
      popupWin.document.open();
      popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + printContents + '</body></html>');
      popupWin.document.close();
    }
  });

  /*
   * Controller for displaying banner data
   */
angular.module('portalApp')
 .controller('bannerCtrl', function($scope, $state, $localStorage, loginService){
     if(!$localStorage.username || $localStorage.username == ""){
         $state.go('login');
     }
    
    if($localStorage.username != ""){
        $scope.first_name = $localStorage.fName;
        $scope.member_id = $localStorage.mId;
        $scope.plan_name = $localStorage.pName;
        $scope.last_login = $localStorage.lLogin.replace(/ /g,'T');
        $scope.newDate = new Date($scope.last_login);
    }
})


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

      function getUser (data) {
        return $http
          .post('http://10.236.91.188:8080/ClaimsPortal/validateLoginUser',data)
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