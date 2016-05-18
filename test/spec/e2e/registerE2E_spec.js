describe('Registration page', function() {
  registerURL = 'http://localhost:9000/#/register';
    loginURL = 'http://localhost:9000/#/login';

  //beforeEach(browser.get('http://localhost:9000/#/home'));

  it('should redirect to the login page user clicked cancel', function() {
    //To access home page
    browser.get('http://localhost:9000/#/register');
    expect(browser.getCurrentUrl()).toEqual(registerURL);

    });


});