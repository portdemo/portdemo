'use strict';
var app=angular.module('portalApp');
app.controller('registerCtrl',['$scope','$state', /*AuthService,*/ function($scope,$state){
//If user is authenticated already, redirected to home page.  
/* if(Authentication.isauthenticated()===true){
              $state.go('home');  
          }  */


// Need to add register button action function and reset status.

$scope.formReset=function(){
	  $scope.signupForm.$setPristine();
              $scope.signupForm.$setUntouched();
}
$scope.registerUser=function(){
	console.log($scope.newUser);
	
}
}]);