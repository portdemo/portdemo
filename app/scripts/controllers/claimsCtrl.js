'use strict';

var app = angular.module('portalApp');

app.controller('claimsCtrl', ['$scope', '$http', '$filter', function($scope, $http, $filter){
	var gridData = [];
	$scope.isDatePicker = false;
	$scope.gridOptions = {
	    expandableRowTemplate: '../views/claimsdetails.html',
	    expandableRowHeight: 250
	};

	$scope.gridOptions.columnDefs = [
		{ name: 'serviceDate', type: 'date', cellFilter: 'dateFormat'},
		{ name: 'patient'},
		{ name: 'provider'},
		{ name: 'totalBilled', cellFilter: 'currency'},
		{ name: 'status'}
		/*{ name: 'status', cellTemplate: '<div><i class="glyphicon" ng-class="getStatusClass(row)"></i>{{row.entity.status}}</div>'}*/
	];

	function getStatusClass(row) {
		var statusClass = "glyphicon-ok-sign";
		if (row.entity.status === "Denied") {
			statusClass = "glyphicon-ban-circle";
		} else if (row.entity.status === "Pending") {
			statusClass = "glyphicon-exclamation-sign";
		}
		return statusClass;
	}

	$http.get('http://10.236.91.188:8080/SpringRestfulWebServicesWithJSONExample/claims.json')
	    .success(function(data) {
	    	gridData = data;
	        $scope.gridOptions.data = data;
	    }).error(function(error){
			alert("There is the problem in the conectivity");
		});

    /******* Start of Datepicker *******/

	$scope.dtFrom = new Date();
	$scope.dtTo = new Date();
	$scope.popups = {};

	$scope.open1 = function() {
		$scope.popups.opened1 = !$scope.popups.opened1;
		$scope.popups.opened2 = $scope.popups.opened2 ? false : $scope.popups.opened2;
	};

	$scope.open2 = function() {
		$scope.popups.opened2 = !$scope.popups.opened2;
		$scope.popups.opened1 = $scope.popups.opened1 ? false : $scope.popups.opened1;
	};

	$scope.dateOptions1 = {
		maxDate: new Date()
	};

	// Disable weekend selection
	function disabled(data) {
		var date = data.date,
		mode = data.mode;
		return mode === 'day' && (date <= $scope.dtFrom);
	}

	$scope.dateOptions2 = {
		dateDisabled: disabled,
		maxDate: new Date()
	};

	$scope.format = 'dd-MMMM-yyyy';

	function filterData() {
		/*if ($scope.dtFrom === '') {
			return;
		}*/
		$scope.dtFrom.setHours(0,0,0,0);
		$scope.dtTo.setHours(0,0,0,0);
		var $dtToepoch = Date.parse($scope.dtTo);
		var $dtFromEpoch = Date.parse($scope.dtFrom);

		var filterDate = $filter('dateRangeFilter')(gridData, $dtFromEpoch, $dtToepoch);
		$scope.gridOptions.data = $filter('filter')(filterDate, $scope.searchText);
	}

	$scope.$watch('dtTo', function(newVal, oldVal) {
		filterData();
	});

	$scope.refreshData = function() {
		filterData();
	};
/*
	$scope.ClearDateRange = function(){
		$scope.gridOptions.data = $filter('filter')(gridData, '', undefined);
		$scope.dtFrom = $scope.dtTo = '';
	};*/

	/******* End of Datepicker *******/
}]);

app.controller('claimsDashboardCtrl', ['$scope', '$http', function($scope, $http){
	$http.get('http://10.236.91.188:8080/SpringRestfulWebServicesWithJSONExample/claims.json')
		.success(function(data) {
			if(data !== ''){
				$scope.claimsData = data;
				$scope.show = false;
			}
			else{
				$scope.errorMessage="No claims data for the current user";
				$scope.show = true;
			}
		}).error(function(error){
			$scope.errorMessage="There is a problem in the data base conectivity";
			$scope.show = true;
		});
}]);

app.filter("dateFormat", function($filter){
	return function(x) {
		var _date = $filter('date')(new Date(x), 'dd-MMM-yyyy');
        return _date;
    };
});


app.filter("dateRangeFilter", function(){
	return function(tableData, fromDate, toDate) {
		var filterData = tableData.filter(function(rowData) {
			var serviceDate = Date.parse(rowData.serviceDate);
			if(serviceDate >= fromDate &&  serviceDate <= toDate) {
				return rowData;
			}
		});
		return filterData;
    };
});