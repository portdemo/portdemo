


'use strict';
var app=angular.module('portalApp');
app.controller('registerCtrl',['$scope','$state', '$http','registerService', '$rootScope',function($scope,$state,$http, registerService, $rootScope){

  if(($rootScope.login !== undefined) && ($rootScope.login !== '')){
         $state.go('home');
     }  

$scope.showFailure=false;
$scope.showSuccess=false; 
$scope.showStatus=false;

$scope.formReset=function(){
	$scope.signupForm.$setPristine();
    $scope.signupForm.$setUntouched();
    $scope.showStatus=false;
};



$scope.registerUser=function(){
$scope.newUser.memberId="3";
$scope.newUser.planName="testing";
$scope.newUser.lastLogin="2016-05-12 11:00:00.000000";

registerService.registerUser(angular.toJson($scope.newUser)).then(function(status){
	$scope.showStatus=true;
	//console.log(status);
	var regStatus=status; 
	if(regStatus===1 || regStatus ===2){
		$scope.showSuccess=true; 
		    $scope.showFailure=false;

	$scope.statusMsg="Your account has been created successfully! Redirecting to login...";
	}
	else if(regStatus<1){
	$scope.showSuccess=false;
    $scope.showFailure=true;
   	$scope.statusMsg="Account registration has failed. Please try again!"; 
	}
	if(regStatus===5){
	$scope.showSuccess=false;
    $scope.showFailure=true;
   	$scope.statusMsg="Username or Email already belongs to another user. Try again"; 
   	$scope.newUser.userName='';
   	$scope.newUser.emailAddress='';
	}

}).catch(function(status){
	$scope.showSuccess=false;
    $scope.showFailure=true;
   	$scope.statusMsg=status + " : Unexpected network error occured. Please try again"; 
   	
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
      	//console.log(data);
       	return $http
       	.post('http://10.236.91.188:8080/ClaimsPortal/validateMember',data)
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