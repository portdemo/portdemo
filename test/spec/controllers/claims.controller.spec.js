
describe('Claims Controller Test Suite', function() {
    beforeEach(module('portalApp'));
    var MainController;
    var $scope;
    
    beforeEach(module(function($urlRouterProvider) {
      $urlRouterProvider.deferIntercept();
    }));
    beforeEach(inject(function (_$rootScope_) {
        $rootScope = _$rootScope_;
    }));
    beforeEach(inject(function ($injector) {
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('GET','http://10.236.91.188:8080/ClaimsPortal/claims.json').respond([{id:"1",serviceDate:"2016-05-06 00:00:00.000000",patient:"Joe Martin",provider:"Generic Hospital",totalBilled:"60.0000",status:"Processed",pharmacyClaimNo:"LgClmAmt01",network:"In Network",medication:"N/A",type:"N/A",pay:"30.0000",quantity:"N/A"}]);
    }));
    beforeEach(inject(function($controller) {
        $scope = $rootScope.$new();

        MainController = $controller('claimsCtrl as claim', {
            $scope: $scope,
        });
    }));

    it('scope should be defined', function() {
        expect(!!$scope).toBe(true);
    });

    it('should demonstrate using when and expect (200 status)', inject(function($http) {
      var $scope = {};
      $httpBackend.expectGET('http://10.236.91.188:8080/ClaimsPortal/claims.json').respond(200,function(data) {
        expect(data[0].id).toBe(4);
      });
      $httpBackend.flush();
    }));
});