'use strict';
var app=angular.module('portalApp');
app.controller('registerCtrl',['$scope','$state', '$http',/*AuthService,*/ function($scope,$state,$http){
//If user is authenticated already, redirected to home page.  
/* if(Authentication.isauthenticated()===true){
              $state.go('home');  
          }  */


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
//	console.log(angular.toJson($scope.newUser));
$scope.newUser.memberId="3";
$scope.newUser.planName="testing";
$scope.newUser.lastLogin="2016-05-12 11:00:00.000000";
console.log(angular.toJson($scope.newUser));
$http.post('http://10.236.91.188:8080/ClaimsPortal/requestbody',angular.toJson($scope.newUser))
		.success(function(data, status){
			console.log(data);
			console.log(status);
		});

	/*
		$scope.showStatus=true;

	$scope.showSuccess=true; 
	$scope.statusMsg="Your account has been created successfully!";


  //Just to see failure msg:
    $scope.showStatus=true;
    $scope.showSuccess=false;
    $scope.showFailure=true;
   $scope.statusMsg="Account registration has failed. Please try again!"; */
};

$scope.closeAlert=function(){
	$scope.showFailure=false;
};
 
}]);