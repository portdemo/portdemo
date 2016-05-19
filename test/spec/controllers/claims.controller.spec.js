describe('Claims Controller Test Suite', function() {
    beforeEach(module('portalApp'));
    var MainController;
    var $scope;
    /*
    beforeEach(inject(function(_$rootScope_) {
      $rootScope = _$rootScope_;
    }));*/
    
beforeEach(inject(function (_$rootScope_, _$httpBackend_) {
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
}));

/*
beforeEach(inject(function ($rootScope, _$httpBackend_, _datacontext_, _config_) {
    $rootScope = _$rootScope_;
    datacontext = _datacontext_;
    $httpBackend = _$httpBackend_;
    config = _config_;
}));
*/

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

      /* code under test */
      $http.get('http://10.236.91.188:8080/SpringRestfulWebServicesWithJSONExample/claims.json')
        .success(function(data, status, headers, config) {
          $scope.valid = true;
          $scope.response = data;
        }).error(function(data, status, headers, config) {
          $scope.valid = false;
      });


    // var url = 'http://10.236.91.188:8080/SpringRestfulWebServicesWithJSONExample/claims.json';
    //   successCallback = jasmine.createSpy();
    //     $httpBackend.expectGET(url).respond(200, 'id');
    //     $http.get(url).success(successCallback);
    //     expect(successCallback).not.toHaveBeenCalled();
    //     //$httpBackend.flush();
    //     expect(successCallback.mostRecentCall.args).toContain('id');
    //     expect(successCallback.mostRecentCall.args[1]).toBe(200);        


      /* end */

      $httpBackend
        .when('GET', 'http://10.236.91.188:8080/SpringRestfulWebServicesWithJSONExample/claims.json')
        .respond(200);
        
      $httpBackend.expectGET('http://10.236.91.188:8080/SpringRestfulWebServicesWithJSONExample/claims.json').respond(200, 'mock data')
      $httpBackend
        .expect('GET', 'http://10.236.91.188:8080/SpringRestfulWebServicesWithJSONExample/claims.json');

      //expect($httpBackend.flush).not.toThrow();
      expect($scope.valid).toBe(true);
      //expect($scope.response).toEqual({ foo: 'bar' });

    }));
    
});

/*
//1.
describe('myserv', function () {
    var myserv, httpBackend;
    //2.
    beforeEach(function () {
        //3. load the module.
        module('portalApp');
 
        // 4. get your service, also get $httpBackend
        // $httpBackend will be a mock.
        inject(function ($httpBackend, _myserv_) {
            myserv = _myserv_;
            httpBackend = $httpBackend;
        });
    });
 
    // 5. make sure no expectations were missed in your tests.
    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });
 
    //6.
    it('ServiceTestSpec', function () {
 
        var returnData = {};
 
        //7. expectGET to make sure this is called once.
        httpBackend.expectGET("http://10.236.91.188:8080/SpringRestfulWebServicesWithJSONExample/claims.json").respond(returnData);
 
        //8. make the call.
        var returnedPromise = myserv.get(1);
 
        //9. set up a handler for the response, that will put the result
        // into a variable in this scope for you to test.
        var result;
        returnedPromise.then(function (response) {
            result = response.data;
        });
 
        //10. flush the backend to "execute" the request to do the expectedGET assertion.
        httpBackend.flush();
 
        //11. check the result. 
         
        expect(result).toEqual(returnData);
 
    });
 
 
});
*/