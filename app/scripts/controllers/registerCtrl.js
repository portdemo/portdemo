


'use strict';
var app=angular.module('portalApp');
app.controller('registerCtrl',['$scope','$state', '$http','registerService', '$localStorage', function($scope,$state,$http, registerService, $localStorage){
//If user is authenticated already, redirected to home page.  
/* if(Authentication.isauthenticated()===true){
              $state.go('home');  
          }  */

  if($localStorage.username){
         $state.go('home');
     }  

// Need to add register button action function and reset status.
$scope.startFade=true;
$scope.showFailure=false;
$scope.showSuccess=false; 
$scope.showStatus=false;

$scope.formReset=function(){
	  $scope.signupForm.$setPristine();
              $scope.signupForm.$setUntouched();
};



$scope.registerUser=function(){
$scope.newUser.memberId="3";
$scope.newUser.planName="testing";
$scope.newUser.lastLogin=new Date();

registerService.registerUser(angular.toJson($scope.newUser)).then(function(status){
	$scope.showStatus=true;
	//console.log(status);
	var regStatus=status; 
	if(regStatus>1){
		$scope.showSuccess=true; 
	$scope.statusMsg="Your account has been created successfully!";
	}
	if(regStatus<1){
	$scope.showSuccess=false;
    $scope.showFailure=true;
   	$scope.statusMsg="Account registration has failed. Please try again!"; 
	}
});


};

$scope.closeAlert1=function(){
	$scope.showSuccess=false;
	$state.go('login');
};

$scope.closeAlert2=function(){
	$scope.showFailure=false;
};


}]);



    function registerFactory($http) {

    	function registerUser(data) {
      	console.log(data);
       	return $http
       	.post('http://10.236.91.188:8080/ClaimsPortal/requestbody',data)
		.then(success)
		.catch(failure);
	}
	function success(response){
		//console.log(status + " Success");
		return response.data;  //return data
		}
	function failure(error){
		//console.log(error.status + " Failure");
		return error.status; 
	}
//      this.$inject = ['$http'];
      return {
        registerUser: registerUser
              }; 

      }
app.factory('registerService', registerFactory);