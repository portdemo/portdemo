angular.module('portalApp')
 .controller('benefitCtrl', function($scope, benefitFactory){
 	$scope.options = [], $scope.planinformation = [];
    
 	benefitFactory.getPlanperiod().then(function(data) {
 			$scope.options = data;
         $scope.options.push('Jan 01, 2016 to Present');
 	});

 	$scope.filterPlan = function(perioddate){
 		benefitFactory.getPlanInformation(perioddate).then(function(data) {
 			$scope.planinformation = data;
           
 		});
 	}

    $scope.printDiv = function(divName) {
      var printContents = document.getElementById(divName).innerHTML;
      var popupWin = window.open('', '_blank', 'width=400,height=400');
      popupWin.document.open();
      popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="bower_components/bootstrap/dist/css/bootstrap.css" /></head><body onload="window.print()">' + printContents + '</body></html>');
      popupWin.document.close();
    }
});

angular.module('portalApp')
    .factory('benefitFactory', benefitFactory);

function benefitFactory($http) {
      this.$inject = ['$http'];
      return {
        getPlanInformation: getplan,
        getPlanperiod:getPeriod,
      };

      function getPeriod(){
        return $http
          .get('http://10.236.91.188:8080/ClaimsPortal/benefitPeriod')
          .then(complete)
          .catch(failed);
      }

      function getplan(data) {
        return $http
          .post('http://10.236.91.188:8080/ClaimsPortal/planInfo',data)
          .then(complete)
          .catch(failed);
      }

      function complete(response) {
        return response.data;
      }

      function failed(error) {
        return error.statusText;
      }
}