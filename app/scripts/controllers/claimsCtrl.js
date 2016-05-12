'use strict';

var app = angular.module('portalApp');

app.controller('claimsCtrl', ['$scope', '$http', function($scope, $http){
	$scope.gridOptions = {
	    expandableRowTemplate: '<div style="height:150px;">Sundar</div>',
	    expandableRowHeight: 100
	};

	$scope.gridOptions.columnDefs = [
		{ name: 'ServiceDate'},
		{ name: 'Patient'},
		{ name: 'Provider'},
		{ name: 'TotalBilled'},
		{ name: 'Status'}
	];

	$scope.gridOptions.onRegisterApi = function(gridApi){
		$scope.gridApi = gridApi;
	};

	$http.get('/data/claimsData.json')
    .success(function(data) {
      $scope.gridOptions.data = data;
    });

	/*$scope.expandAllRows = function() {
		$scope.gridApi.expandable.expandAllRows();
	}

	$scope.collapseAllRows = function() {
		$scope.gridApi.expandable.collapseAllRows();
	}*/
}]);
app.controller('claimsDashboardCtrl', ['$scope', '$http', function($scope, $http){
	$scope.gridOptions = {
	    expandableRowTemplate: '<div style="height:150px;">Sundar</div>',
	    expandableRowHeight: 100
	};
//$scope.data={};
	$scope.gridOptions.columnDefs = [
		{ name: 'ServiceDate'},
		{ name: 'Patient'},
		{ name: 'Provider'},
		{ name: 'TotalBilled'},
		{ name: 'Status'}
	];

	$scope.gridOptions.onRegisterApi = function(gridApi){
		$scope.gridApi = gridApi;
	};

	$http.get('/data/claimsData.json')
    .success(function(data) {
        //$scope.data = data;
      //$scope.gridOptions.data =;
        
       for(var i=1; i<=3; i++)
           {
               $scope.data[i]=data[i];
               
           }
   // alert(JSON.stringify($scope.data));
       $scope.gridOptions.data =  $scope.data[i];
    });

	/*$scope.expandAllRows = function() {
		$scope.gridApi.expandable.expandAllRows();
	}

	$scope.collapseAllRows = function() {
		$scope.gridApi.expandable.collapseAllRows();
	}*/
}]);