// E2e Test
describe('Testing Static Page', function() {
  loginURL = 'http://localhost:9000/#/home';
  // beforeEach(browser.get('http://localhost:9000/#/home'));

  // it('should redirect to the login page if trying to load home page while not authenticated', function() {
  //   //To access home page
  //   browser.get('http://localhost:9000/#/home');
  //   expect(browser.getCurrentUrl()).toEqual(loginURL);

  //   });

  // it('About redirects to home page', function(){
  //       element(by.id('dropdownMenu1')).click();
  //       element(by.id('aboutus')).click();
  //       expect(browser.driver.getCurrentUrl()).toEqual("http://localhost:9000/#/login");
  // });

  // it('Contact redirects to home page', function(){
  //       element(by.id('dropdownMenu1')).click();
  //       element(by.id('contactus')).click();
  //       expect(browser.driver.getCurrentUrl()).toEqual("http://localhost:9000/#/login");
  // });


it('About redirects when clicks here', function(){
      element(by.id('here')).click();
      expect(browser.driver.getCurrentUrl()).toEqual("https://www.anthem.com/health-insurance/about-us/pressreleasedetails/WI/2015/1813/statement-regarding-cyber-attack-against-anthem");
});

});