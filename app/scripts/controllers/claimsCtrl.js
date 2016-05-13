'use strict';

var app = angular.module('portalApp');

app.controller('claimsCtrl', ['$scope', '$http', function($scope, $http){
	$scope.isDatePicker = false;
	$scope.gridOptions = {
	    expandableRowTemplate: '../views/claimsdetails.html',
	    expandableRowHeight: 250
	};

	$scope.gridOptions.columnDefs = [
		{ name: 'serviceDate'},
		{ name: 'patient'},
		{ name: 'provider'},
		{ name: 'totalBilled'},
		{ name: 'status'}
	];

	$scope.gridOptions.onRegisterApi = function(gridApi){
		$scope.gridApi = gridApi;
	};

	$http.get('http://10.236.91.188:8080/SpringRestfulWebServicesWithJSONExample/claims.json')
    
    .success(function(data) {
  
        $scope.gridOptions.data = data;
    });
}]);

app.controller('claimsDashboardCtrl', ['$scope', '$http', function($scope, $http){
	/*$scope.gridOptions = {
	    expandableRowTemplate: '<div style="height:150px;">Sundar</div>',
	    expandableRowHeight: 100
	};
    
	$scope.gridOptions.columnDefs = [
		{ name: 'serviceDate'},
		{ name: 'patient'},
		{ name: 'provider'},
		{ name: 'totalBilled'},
		{ name: 'status'}
	];

	$scope.gridOptions.onRegisterApi = function(gridApi){
		$scope.gridApi = gridApi;
	};*/

	$http.get('http://10.236.91.188:8080/SpringRestfulWebServicesWithJSONExample/claims.json')
        .success(function(data) {
           /*$scope.gridOptions.data =  $scope.data;*/
           if(data!=''){
               $scope.claimsData = data;
               $scope.show = false;
           }
            else{
                $scope.errorMessage="No claims data for the current user";
                $scope.show = true;
            }
        }).error(function(data){
           $scope.errorMessage="There is a problem in the data base conectivity";
            $scope.show = true;
      }); 
}]);

app.filter("dateFormat", function(){
	return function(x) {
        x = x.replace(/\s.*/,"");
        return x;
    };
})