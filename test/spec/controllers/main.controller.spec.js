'use strict';

describe('Hello World example', function() {

beforeEach(module('portalApp'));
var HelloWorldController, scope;

beforeEach(inject(function ($rootScope, $controller) {
scope = $rootScope.$new();
HelloWorldController = $controller('HelloWorldController', {
$scope: scope
});
}));
it('says hello world!', function () {
expect(scope.greeting).toEqual('Hello World!');
});

});

describe('Banner Unit Testing', function(){
   beforeEach(module('portalApp'));
   var bannerController, scope, loginService, $localStorage;
    beforeEach(inject(function($rootScope, $controller)
    {
       scope = $rootScope.$new();   
       bannerController = $controller('bannerCtrl', {
           $scope: scope
      });
    }));
     beforeEach(inject(function($injector) {
        loginService = $injector.get('loginService');
        $localStorage = $injector.get('$localStorage');
     }));
    it('says unit test', function(){
        for(var i=0; i<loginService.getUser.length; i++){
        expect(loginService.getUser[i].firstName).toEqual('testsss');
        }
    })
});