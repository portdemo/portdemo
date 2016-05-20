'use strict';
describe('Banner Unit Testing', function() {
    beforeEach(module('portalApp'));
    var MainController;
    var $scope, $rootScope, $httpBackend;
    
    beforeEach(module(function($urlRouterProvider) {
      $urlRouterProvider.deferIntercept();
    }));
    beforeEach(inject(function (_$rootScope_, _$httpBackend_) {
        $rootScope = _$rootScope_;
        $httpBackend = _$httpBackend_;
    }));
    beforeEach(inject(function ($injector) {
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('GET','http://10.236.91.188:8080/ClaimsPortal/member').respond([{id:"1",firstName:"asdasd",lastName:"asdasd",emailAddress:"Test@accenture.com",userName:"dataNew",password:"asdasdasd",memberId:"3",planName:"testing",lastLogin:"2016-05-12 11:00:00.000000"}]);
    }));
    beforeEach(inject(function($controller) {
        $scope = $rootScope.$new();

        MainController = $controller('bannerCtrl as banner', {
            $scope: $scope,
        });
    }));

    it('scope should be defined', function() {
        expect(!!$scope).toBe(true);
    });

    it('should demonstrate using when and expect (200 status)', inject(function($http) {
      var $scope = {};
      $httpBackend.expectGET('http://10.236.91.188:8080/ClaimsPortal/member').respond(200,function(data) {
        expect(data[0].id).toBe(1);
      });
      //$httpBackend.flush();
    }));
});