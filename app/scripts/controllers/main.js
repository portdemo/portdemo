'use strict';

/**
 * @ngdoc function
 * @name portalApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the portalApp
 */
angular.module('portalApp')
  .controller('loginCtrl', function ($scope, $state, $localStorage, loginService) {
    /*if($localStorage.useremail){
        alert('yes stored');
    }*/
    $scope.onLogin = function(username,password){
        //console.log(username +' '+ password);
        //console.log('you clicked');
        loginService.getUser().then(function(data) {
            $scope.users = data;
            var login = false;
            var len = $scope.users.length
            for(var i=0;i<len;i++){
                if(username == $scope.users[i].username && password == $scope.users[i].password){
                    login = true;
                    $localStorage.username = username;
                    //console.log($localStorage.useremail);
                }
            }
            if(login){
                $state.go('home');
            }
            else {
                alert('Invalid Username or Password');
                return false;
            }
        })
        
        //$state.go('home');
    }
  });
angular.module('portalApp')
    .factory('loginService', loginFactory);

function loginFactory($http) {
  this.$inject = ['$http'];
  return {
    getUser: getUser
  };

  function getUser () {
    return $http
      .get('../data/login.json')
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
