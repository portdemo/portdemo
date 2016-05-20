// E2e Test
describe('Testing Static Page', function() {
  // loginURL = 'http://localhost:9000/#/login';
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
  browser.get('http://localhost:9000/#/login');
      element(by.id('here')).click();

      expect(browser.driver.getCurrentUrl()).toEqual("https://www.google.co.in/?gfe_rd=cr&ei=os89V-yDNYbT8gep35-oBg");
});

});