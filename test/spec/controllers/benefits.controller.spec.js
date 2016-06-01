'use strict';

describe('Benefits Controller Test Suite', function() {
    beforeEach(module('portalApp'));
    var MainController, $scope, $filter, $rootScope, $httpBackend;

    beforeEach(module(function($urlRouterProvider) {
      $urlRouterProvider.deferIntercept();
    }));
    
    beforeEach(inject(function (_$rootScope_) {
        $rootScope = _$rootScope_;
    }));

    beforeEach(inject(function($controller) {
        $scope = $rootScope.$new();

        MainController = $controller('benefitCtrl as benefit', {
            $scope: $scope,
        });
    }));

    beforeEach(inject(function ($injector) {
        var options = '["Apr 01, 2016 to Present","Feb 01, 2016 to Present","Mar 01, 2016 to Present"]';
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('http://10.236.91.188:8080/ClaimsPortal/benefitPeriod')
            .respond(200, options);
        $scope.options = options;
        // var planinfo = '{"benefits":"Medical","benefitPeriod":"Apr 01, 2016 to Present","member":"Claire (1/1/1942)","status":"Active"}';
        // $httpBackend.when('http://10.236.91.188:8080/ClaimsPortal/planInfo')
        //     .respond(200, planinfo);
    }));

    it('scope should be defined', function() {
        expect(!!$scope).toBe(true);
    });

    it('should demonstrate plan period in benefitFactory', inject(function(benefitFactory, $httpBackend) {
        benefitFactory.getPlanperiod()
        .then(function(data) {
            alert(data.length);
            expect(data.length).toEqual(3);
        });
        $httpBackend.flush();
    }));

    // it('should demonstrate plan details in benefitFactory', inject(function(benefitFactory, $httpBackend) {
    //     var perioddate = 'Apr 01, 2016 to Present';
    //     benefitFactory.getPlanInformation(perioddate)
    //     .then(function(data) {
    //         expect(data.member).toEqual(3);
    //     });
    //     $httpBackend.flush();
    // }));    
//
/*
    it('should filter grid data(dateRangeFilter filter) depends on search text filter value', function(){
        $scope.dtFrom = new Date('May 03, 2016 00:00:00');
        $scope.dtTo = new Date('May 06, 2016 00:00:00');
        //
        $scope.filterData();
        //console.log($scope.gridOptions.data);
        expect($scope.gridOptions.data.length).toEqual(3);
        
        $scope.searchText = 'pr';
        $scope.filterData();
        expect($scope.gridOptions.data.length).toEqual(2);
    });
    */
});