'use strict';

var app = angular.module('portalApp');

app.controller('claimsCtrl', ['$scope', '$http', '$filter', 'claimsService', '$rootScope', '$state', function($scope, $http, $filter, claimsService, $rootScope, $state){
	
	if(($rootScope.login === undefined) && ($rootScope.login === '')){
		$state.go('login');
	}
 
	$scope.gridData = [];
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
		//{ name: 'status'}
		{ name: 'status', cellTemplate: '<div><i class="glyphicon" ng-class="{\'glyphicon-ban-circle\' : row.entity.status === \'Denied\', \'glyphicon-exclamation-sign\' : row.entity.status === \'Pending\', \'glyphicon-ok-sign\' : row.entity.status === \'Processed\' }"></i>&nbsp;{{row.entity.status}}</div>'}
	];

	claimsService.getClaims().then(function(data){
		$scope.gridData = data;
		$scope.gridOptions.data = data;
	}).catch(function(error){
		alert("There is the problem in the connectivity");
	});

    /******* Start of Datepicker *******/

	$scope.dtFrom = '';
	$scope.dtTo = '';
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
		return mode === 'day' && (date < $scope.dtFrom);
	}

	$scope.dateOptions2 = {
		dateDisabled: disabled,
		maxDate: new Date()
	};

	$scope.format = 'dd-MMMM-yyyy';

	$scope.filterData = function() {
		var $dtToepoch = 0, $dtFromEpoch = 0, filterData = $scope.gridData;
		if ($scope.dtFrom !== '') {
			/*$scope.dtFrom.setUTCHours(0,0,0,0);
			$scope.dtTo.setUTCHours(0,0,0,0);*/
			$dtToepoch = Date.parse($scope.dtTo);
			$dtFromEpoch = Date.parse($scope.dtFrom);
			filterData = $filter('dateRangeFilter')($scope.gridData, $dtFromEpoch, $dtToepoch);
		}
		$scope.gridOptions.data = $filter('filter')(filterData, $scope.searchText);
	}

	/*$scope.$watch('dtTo', function(newVal, oldVal) {
		$scope.filterData();
	});*/

	$scope.refreshData = function() {
		$scope.filterData();
	};

	$scope.filterDateRange = function(){
		$scope.filterData();
		/*$scope.gridOptions.data = $filter('filter')(gridData, '', undefined);
		$scope.dtFrom = $scope.dtTo = '';*/
	};

	$scope.clearDateRange = function(){
		$scope.dtFrom = $scope.dtTo = '';
		$scope.filterData();
	};

	/******* End of Datepicker *******/
}]);

app.controller('claimsDashboardCtrl', ['$scope', '$http', 'claimsService', function($scope, $http, claimsService){
	claimsService.getClaims().then(function(data){
		if(data !== ''){
			$scope.claimsData = data;
			$scope.show = false;
		}
		else{
			$scope.errorMessage="No claims data for the current user";
			$scope.show = true;
		}
	}).catch(function(error){
		$scope.errorMessage="There is a problem in the data base conectivity";
		$scope.show = true;

	});
}]);

app.filter("dateFormat", function($filter){
	return function(x) {
		x = x.replace(/\s.*/, '').split('-');
		return x[2]+'/'+x[1]+'/'+x[0];
    };
});


app.filter("dateRangeFilter", function(){
	return function(tableData, fromDate, toDate) {
		var filterData = tableData.filter(function(rowData) {
			var y = rowData.serviceDate;
			y = y.replace(/\s.*/, '');
			var serviceDate = new Date(Date.parse(y));
			serviceDate.setHours(0,0,0,0);
			serviceDate = Date.parse(serviceDate);
			if(serviceDate >= fromDate &&  serviceDate <= toDate) {
				return rowData;
			}
		});
		return filterData;
    };
});

app.factory("claimsService", function($http) {
	return {
		getClaims: function() {
			return $http.get('http://10.236.91.188:8080/ClaimsPortal/claims.json')
			.then(function(data) {
				return data.data;
			}).catch(function(error){
				return error;
			});
		}
	}
});