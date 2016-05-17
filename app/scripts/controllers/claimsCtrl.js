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
		{ name: 'serviceDate', cellFilter: 'dateFormat'},
		{ name: 'patient'},
		{ name: 'provider'},
		{ name: 'totalBilled'},
		/*{ name: 'status', cellTemplate: '<div><i class="glyphicon" ng-class="getStatusClass(row)"></i>{{row.entity.status}}</div>'}*/
		{ name: 'status', cellTemplate: '<div><i class="glyphicon" ng-class="getStatusClass(row)"></i>{{row.entity.status}}</div>'}
	];

	function getStatusClass(row) {
		var statusClass = "glyphicon-ok-sign";
		if (row.entity.status == "Denied") {
			statusClass = "glyphicon-ban-circle";
		} else if (row.entity.status == "Pending") {
			statusClass = "glyphicon-exclamation-sign";
		}
		return statusClass;
	}

	$scope.gridOptions.onRegisterApi = function(gridApi){
		$scope.gridApi = gridApi;
	};

	$http.get('http://10.236.91.188:8080/SpringRestfulWebServicesWithJSONExample/claims.json')
    .success(function(data) {
    	gridData = data;
        $scope.gridOptions.data = data;
    });


    /******* Start of Datepicker *******/

	$scope.dtFrom = new Date();
	$scope.dtTo = new Date();
	$scope.popups = {};

	$scope.open1 = function($event) {
		$scope.popups.opened1 = !$scope.popups.opened1;
		$scope.popups.opened2 = $scope.popups.opened2 ? false : $scope.popups.opened2;
	};

	$scope.open2 = function($event) {
		$scope.popups.opened2 = !$scope.popups.opened2;
		$scope.popups.opened1 = $scope.popups.opened1 ? false : $scope.popups.opened1;
	};

	$scope.dateOptions1 = {
		maxDate: new Date()
	};

	$scope.dateOptions2 = {
		dateDisabled: disabled,
		maxDate: new Date()
	};

	$scope.format = 'dd-MMMM-yyyy';

	// Disable weekend selection
	function disabled(data) {
		var date = data.date,
		mode = data.mode;
		return mode === 'day' && (date <= $scope.dtFrom);
	}

	$scope.$watch('dtTo', function(oldVal, newVal) {
		var dateFormatted = newVal.getFullYear()+'-'+newVal.getMonth()+'-'+newVal.getDate();
		$scope.gridOptions.data = $filter('filter')(gridData, dateFormatted, undefined);
		console.log("Yet to be done!!");
	});

	$scope.refreshData = function() {
		$scope.gridOptions.data = $filter('filter')(gridData, $scope.searchText, undefined);
	};

	/*$scope.ClearDateRange = function(){
		$scope.gridOptions.data = $filter('filter')(gridData, '', undefined);
		$scope.dtFrom = $scope.dtTo = new Date();
	};*/

	/******* End of Datepicker *******/
}]);

app.controller('claimsDashboardCtrl', ['$scope', '$http', function($scope, $http){
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