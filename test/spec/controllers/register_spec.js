
describe('Registration factory Test Suite', function() {
var registFactory, httpBackend;
beforeEach(module('portalApp'));
beforeEach(module(function($urlRouterProvider) {
      $urlRouterProvider.deferIntercept();
    }));

beforeEach(inject(function($httpBackend, registerService) {
    httpBackend = $httpBackend;
    registFactory = registerService;
}));


it("Post call should be made to the server address", function () {
    var success=false;
  /* httpBackend.when('GET', 'views/login.html').respond(200, {
            status: 0
        });*/
   httpBackend.when('POST', 'http://10.236.91.188:8080/ClaimsPortal/validateMember')
    .respond(200, {
        status: "success"
        }); 

 
    registFactory.registerUser("data").then(function () {
        success = true;
    });    

    httpBackend.flush();
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();

    expect(success).toBe(true);
  
});

});

describe('Registration Controller Test Suite', function() {
    beforeEach(module('portalApp'));
    beforeEach(inject(function(_$rootScope_) {
      $rootScope = _$rootScope_;
    }));
    var MainController;
    var $scope;
    //var $rootScope;

    beforeEach(inject(function($controller, $rootScope) {
        $scope = $rootScope.$new();

        MainController = $controller('registerCtrl as regCtrl', {
            $scope: $scope,
            $rootScope: $rootScope
        });
    }));

    it('scope should be defined', function() {
        expect(!!$scope).toBe(true);
        expect($scope).toBeDefined();
    });

    it('alert parameters should be false initially', function() {
        expect($scope.showFailure).toBe(false);
        expect($scope.showSuccess).toBe(false);
        expect($scope.showStatus).toBe(false);

    });
    
    it('CloseAlert1 for success alert function should set show parameter to false', function(){
      $scope.closeAlert1();
      expect($scope.showSuccess).toBe(false);
    });

    it('CloseAlert2 for failure alert function should set show parameter to false', function(){
      $scope.closeAlert2();
      expect($scope.showFailure).toBe(false);
    });

    
    
});
