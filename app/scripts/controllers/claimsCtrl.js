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