/*
Create an e2e spec that tests TODO MVC.

1. Install protractor globally with `npm install -g protractor`
2. Run `webdriver-manager update`, then `webdriver-manager start` to setup the Selenium server.
3. Use Jasmine syntax to setup the test suite.
4. Use the URL: http://todomvc.com/examples/angularjs/#/
5. Use the commands: browser.get, element, by.model, by.repeater, browser.actions().sendKeys(protractor.Key.ENTER).perform();
*/

//Write your e2e test here!

describe('Testing Static Page', function() {
  loginURL = 'http://localhost:9000/#/login';
  //beforeEach(browser.get('http://localhost:9000/#/home'));

  it('should redirect to the login page if trying to load home page while not authenticated', function() {
    //To access home page
    browser.get('http://localhost:9000/#/home');
    expect(browser.getCurrentUrl()).toEqual(loginURL);

    });

  it('About redirects to home page', function(){
        element(by.id('dropdownMenu1')).click();
        element(by.id('aboutus')).click();
        expect(browser.getCurrentUrl()).toEqual("http://localhost:9000/#/login");
  });

  it('Contact redirects to home page', function(){
        element(by.id('dropdownMenu1')).click();
        element(by.id('contactus')).click();
        expect(browser.getCurrentUrl()).toEqual("http://localhost:9000/#/login");
  });
});