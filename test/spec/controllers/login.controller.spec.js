'use strict'
describe('Login Testing', function(){

   beforeEach(module('portalApp'));
   var logincontroller, $scope, $rootScope, loginService, $localStorage;
   beforeEach(inject(function (_$rootScope_) {
    $rootScope = _$rootScope_;

}));
    beforeEach(inject(function($rootScope, $controller)
    {
      $scope = $rootScope.$new();   
      logincontroller = $controller('loginCtrl', {
      $scope: $scope,$rootScope:$rootScope
      });
    }));
      it('Login Failure', function () {
        $rootScope.login='';
    $scope.onLogin('sri','sriram');
     expect($rootScope.login.length).toBe(0);
 }); 
  it('Login Success', function () {
   $rootScope.login='0';
    $scope.onLogin('dataNew','asdasdasd');
    expect($rootScope.login.length).toEqual(1);
});
    it('scope should be defined', function() {
        expect(!!$scope).toBe(true);
    });

    it('Cleaning of root scope login', function() {
        $rootScope.login = 'test';
        expect($rootScope.login.length).toBe(4);
        $scope.logout();
        expect($rootScope.login.length).toBe(0);
    }); 
});
