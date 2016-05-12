'use strict';

var app = angular.module('portalApp');

app.controller('claimsCtrl', ['$scope', '$http', function($scope, $http){
	$scope.gridOptions = {
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
	};

	$http.get('http://10.236.91.188:8080/SpringRestfulWebServicesWithJSONExample/claims.json')
    
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

	$http.get('http://10.236.91.188:8080A/SpringRestfulWebServicesWithJSONExample/claims.json')
    .success(function(data) {
        $scope.data = [];

       for(var i=0; i<3; i++)
           {
             if(data[i]===undefined){break;}                 
             $scope.data[i]=data[i];
           }
   
       $scope.gridOptions.data =  $scope.data;
    })
    .error(function(data){
          
        $scope.gridOptions.data = [{"serviceDate":"Claims data was not found. Please contact customer support if you need further assistance",}];
        $scope.gridOptions.RowHeight=10;
           });
    

	/*$scope.expandAllRows = function() {
		$scope.gridApi.expandable.expandAllRows();
	}

	$scope.collapseAllRows = function() {
		$scope.gridApi.expandable.collapseAllRows();
	}*/
}]);