'use strict';

describe('Banner Controller Test Suite', function() {
    beforeEach(module('portalApp'));
    var /*MainController, $scope, $rootScope,*/ $httpBackend;
    
    beforeEach(module(function($urlRouterProvider) {
      $urlRouterProvider.deferIntercept();
    }));

    /*beforeEach(inject(function (_$rootScope_) {
        $rootScope = _$rootScope_;
    }));

    beforeEach(inject(function($controller) {
        $scope = $rootScope.$new();

        MainController = $controller('bannerCtrl as banner', {
            $scope: $scope,
        });
    }));*/

    beforeEach(inject(function ($injector) {
        var bannerData = [{'id':1,'firstName':'asdasd','lastName':'asdasd','emailAddress':'Test@accenture.com','userName':'dataNew','password':'asdasdasd','memberId':'3','planName':'testing','lastLogin':'2016-05-12 11:00:00.000000'},{'id':23,'firstName':'asdasd','lastName':'asdsad','emailAddress':'gokul@example.com','userName':'gokul','password':'asdasdasd','memberId':'3','planName':'testing','lastLogin':'2016-05-12 11:00:00.000000'},{'id':24,'firstName':null,'lastName':'hjg','emailAddress':null,'userName':null,'password':null,'memberId':null,'planName':null,'lastLogin':null},{'id':25,'firstName':'TestUser','lastName':'test','emailAddress':'11111@test.com','userName':'testNow','password':'test','memberId':'1','planName':'TestPlan','lastLogin':'2016-05-12 11:00:00.000000'},{'id':26,'firstName':'TestUser','lastName':'test','emailAddress':'@test.com','userName':'Now','password':'test','memberId':'1','planName':'TestPlan','lastLogin':'2016-05-12 11:00:00.000000'}];
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('GET','http://10.236.91.188:8080/ClaimsPortal/member')
            .respond(200, bannerData);
    }));

    /*it('scope should be defined', function() {
        expect(!!$scope).toBe(true);
    });*/

    it('should demonstrate bannerService', inject(function(loginService, $httpBackend) {
        loginService.getUser()
        .then(function(data) {
            //console.log(data);
            expect(data.length).toEqual(5);
        });

        $httpBackend.flush();
    }));

});