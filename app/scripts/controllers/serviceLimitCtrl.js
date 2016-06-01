'use strict';

var app = angular.module('portalApp');

app.controller('serviceLimitCtrl', ['$scope', '$state', 'serviceLimitService', '$rootScope',
	function($scope, $state, serviceLimitService, $rootScope){
	
	if(($rootScope.login === undefined) && ($rootScope.login === '')){
		$state.go('login');
	}

	$scope.disableApplyBtn = true;
	$scope.disableMembers = true;

	$scope.getBenefitPeriods = function() {
		serviceLimitService.getBenefitPeriods().then(function(data){
			$scope.members = [];
			$scope.benefitMember = '';
			$scope.benefitPeriods = data;
		}).catch(function(error){
			console.log(error);
		});
	};

	$scope.getBenefitPeriods();

	$scope.getMemberDetails = function() {
		if (!$scope.benefitPeriod) {
			$scope.members = [];
			$scope.disableMembers = true;
			return;
		}
		serviceLimitService.getMembers($scope.benefitPeriod).then(function(data){
			$scope.members = data;
			$scope.disableMembers = false;
//			$scope.benefitMember = $scope.members[0] || '';
		}).catch(function(error){
			console.log(error);
		});
	};

	$scope.getServiceLimitData = function() {
		serviceLimitService.getServiceLimitData($scope.benefitPeriod, $scope.benefitMember).then(function(data){
			$scope.serviceLimitData = data;
		}).catch(function(error){
			console.log(error);
		});
	};

	$scope.enableApply = function() {
		$scope.disableApplyBtn = false;
	};
}]);

app.factory("serviceLimitService", function($http) {
	return {
		getMembers: function(benefitPeriod) {
			return $http.post('http://10.236.91.188:8080/ClaimsPortal/memberList', benefitPeriod)
				.then(function(data) {
					return data.data;
				}).catch(function(error){
					return error;
				});
		},

		getBenefitPeriods: function() {
			return $http.get('http://10.236.91.188:8080/ClaimsPortal/benefitPeriod')
				.then(function(data) {
					return data.data;
				}).catch(function(error){
					return error;
				});
		},

		getServiceLimitData: function(benefitPeriod, benefitMember) {
			var postData = {"BenefitPeriod":benefitPeriod,"Member":benefitMember}
			return $http.post('http://10.236.91.188:8080/ClaimsPortal/serviceLimits', postData)
				.then(function(data) {
					return data.data;
				}).catch(function(error){
					return error;
				});
		}
	};
});