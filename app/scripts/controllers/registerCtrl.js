'use strict';
var app=angular.module('portalApp');
app.controller('registerCtrl',['$scope','$state', /*AuthService,*/ function($scope,$state){
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
}



$scope.registerUser=function(){
	console.log($scope.newUser);
		$scope.showStatus=true;

	$scope.showSuccess=true; 
	$scope.statusMsg="Your account has been created successfully!";


  //Just to see failure msg:
    $scope.showStatus=true;
    $scope.showSuccess=false;
    $scope.showFailure=true;
   $scope.statusMsg="Account registration has failed. Please try again!";
}

$scope.closeAlert=function(){
	$scope.showFailure=false;
}

}]);