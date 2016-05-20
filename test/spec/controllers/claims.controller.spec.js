'use strict';

describe('Claims Controller Test Suite', function() {
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

        MainController = $controller('claimsCtrl as claim', {
            $scope: $scope,
        });
    }));

    beforeEach(inject(function ($injector, _$filter_) {
        var gridData = [{'id':'1','serviceDate':'2016-05-06 00:00:00.000000','patient':'Joe Martin','provider':'Generic Hospital','totalBilled':'60.0000','status':'Processed'},
                        {'id':'3','serviceDate':'2016-05-10 00:00:00.000000','patient':'Mark Waugh','provider':'Generic Hospital','totalBilled':'50.0000','status':'Processed'},
                        {'id':'7','serviceDate':'2016-05-11 00:00:00.000000','patient':'Tim Tester','provider':'Generic Hospital','totalBilled':'55.0000','status':'Processed'},
                        {'id':'2','serviceDate':'2016-05-13 00:00:00.000000','patient':'Steve Smith','provider':'Generic Hospital','totalBilled':'70.0000','status':'Processed'},
                        {'id':'4','serviceDate':'2016-05-03 00:00:00.000000','patient':'Steve Waugh','provider':'Generic Hospital','totalBilled':'40.0000','status':'Processed'},
                        {'id':'5','serviceDate':'2016-05-09 00:00:00.000000','patient':'Claire Smith','provider':'Generic Hospital','totalBilled':'20.0000','status':'Processed'},
                        {'id':'6','serviceDate':'2016-05-05 00:00:00.000000','patient':'Tom Cruise','provider':'Generic Hospital','totalBilled':'10.0000','status':'Pending'}];
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('GET','http://10.236.91.188:8080/ClaimsPortal/claims.json')
            .respond(200, gridData);
        $filter = _$filter_;
        $scope.gridData = $scope.gridOptions.data = gridData;
    }));

    it('scope should be defined', function() {
        expect(!!$scope).toBe(true);
    });

    it('should demonstrate claimsService', inject(function(claimsService, $httpBackend) {
        claimsService.getClaims()
        .then(function(data) {
            expect(data.length).toEqual(7);
        });

        $httpBackend.flush();
    }));

    it('should change date format(dateFormat filter) to dd-MMMM-yyyy', inject(function() {
        expect($filter('dateFormat')('2016-05-06 00:00:00.000000')).toBe('06/05/2016');
    }));

    it('should filter grid data(dateRangeFilter filter) depends on datepicker filter values', function(){
        $scope.dtFrom = new Date('May 03, 2016 00:00:00');
        $scope.dtTo = new Date('May 06, 2016 00:00:00');
        //
        $scope.filterData();
        //console.log($scope.gridOptions.data);
        expect($scope.gridOptions.data.length).toEqual(3);
    });

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
});