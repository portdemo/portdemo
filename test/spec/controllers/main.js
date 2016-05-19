'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('portalApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('loginCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('Login Failure', function () {
    scope.onLogin('sri','sriram');
    expect($rootScope.login.length).toBe(0);
}); 
  it('Login Success', function () {
    scope.onLogin('test1','test1234');
    expect($rootScope.login.length).toBeGreaterThan(0);
}); 


});
