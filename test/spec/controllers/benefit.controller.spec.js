describe('Benefits Real testing', function(){
	beforeEach(module('portalApp'));
	var benefitController, scope;
	beforeEach(inject(function($rootScope, $controller){
		scope = $rootScope.$new();
		benefitController = $controller('benefitsCtrl', {
			$scope: scope
		});
	}));
	it('says message', function(){
		expect(scope.message).toEqual("Sorry, looks like something isn't working with the find benefits page. Please give us some time to fix it. Then, try again.");
	})
});