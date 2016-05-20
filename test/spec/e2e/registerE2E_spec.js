
'use strict';


describe('Registration page', function() {
  var registerURL = 'http://localhost:9000/#/register';
   var loginURL = 'http://localhost:9000/#/login';

  //beforeEach(browser.get('http://localhost:9000/#/home'));

  it('should redirect to the login page user clicked cancel', function() {
    //To access home page
    browser.get('http://localhost:9000/#/register');
    expect(browser.getCurrentUrl()).toEqual(registerURL);
        element(by.id('cancel')).click();
    expect(browser.getCurrentUrl()).toEqual(loginURL);

    });

 it('should add input field values to model', function(){
     browser.get('http://localhost:9000/#/register');
     element(by.model('newUser.firstName')).sendKeys("John");
     element(by.model('newUser.lastName')).sendKeys("Smith");
      element(by.model('newUser.userName')).sendKeys("john_smith");
     element(by.model('newUser.emailAddress')).sendKeys("johnSmith@demo.com");
       browser.sleep(1000);
      //element(by.id('reset')).click();
     expect(element(by.model('newUser.firstName')).getAttribute('value')).toBe('John');
  	 expect(element(by.model('newUser.lastName')).getAttribute('value')).toBe('Smith');
  	 expect(element(by.model('newUser.userName')).getAttribute('value')).toBe('john_smith');
     expect(element(by.model('newUser.emailAddress')).getAttribute('value')).toBe('johnSmith@demo.com');
  

 });

 it('should reset the model when Reset button is clicked', function(){
     browser.get('http://localhost:9000/#/register');
     element(by.model('newUser.firstName')).sendKeys("John");
     element(by.model('newUser.lastName')).sendKeys("Smith");
     element(by.model('newUser.userName')).sendKeys("john_smith");
    element(by.model('newUser.emailAddress')).sendKeys("johnSmith@demo.com");
     element(by.model('newUser.password')).sendKeys("sdf89767a?@");
     element(by.model('comparePassword')).sendKeys("sdf89767a?@");
     browser.sleep(500);

     element(by.id('reset')).click();

     expect(element(by.model('newUser.firstName')).getAttribute('value')).toBe('');
  	 expect(element(by.model('newUser.lastName')).getAttribute('value')).toBe('');
  	 expect(element(by.model('newUser.userName')).getAttribute('value')).toBe('');
     expect(element(by.model('newUser.emailAddress')).getAttribute('value')).toBe('');
 	expect(element(by.model('newUser.password')).getAttribute('value')).toBe('');
     expect(element(by.model('comparePassword')).getAttribute('value')).toBe('');

 });

 it('register button should remain disabled if form is invalid', function(){
     browser.get('http://localhost:9000/#/register');
     element(by.model('newUser.firstName')).sendKeys("John");
     element(by.model('newUser.lastName')).sendKeys("Smith");
     element(by.model('newUser.userName')).sendKeys("john_smith");
     var regBtn=element(by.id('submit'));

     	expect(regBtn.getAttribute('disabled')).toBeTruthy();
          browser.sleep(500);

      element(by.model('newUser.emailAddress')).sendKeys("johnSmith@demo.com");
     element(by.model('newUser.password')).sendKeys("sdf89767a?@");
     element(by.model('comparePassword')).sendKeys("sdf89767a?@");
             browser.sleep(500);
 
    
   
     	expect(regBtn.getAttribute('disabled')).toBeFalsy();

 });

 it('register button should be enabled when form is valid', function(){
 browser.get('http://localhost:9000/#/register');
     element(by.model('newUser.firstName')).sendKeys("John");
     element(by.model('newUser.lastName')).sendKeys("Smith");
     element(by.model('newUser.userName')).sendKeys("john_smith");
     element(by.model('newUser.emailAddress')).sendKeys("johnSmith@demo.com");
     element(by.model('newUser.password')).sendKeys("sdf89767a?@");
     element(by.model('comparePassword')).sendKeys("sdf89767a?@");
     browser.sleep(500);
     var regBtn=element(by.id('submit'));

    
   
     	expect(regBtn.getAttribute('disabled')).toBeFalsy();


 });  });


/*  this will not work because of Dependancy on Cross-origin plugin
it('should redirect to login page after successful registration', function(){
     browser.get('http://localhost:9000/#/register');
     element(by.model('newUser.firstName')).sendKeys("John");
     element(by.model('newUser.lastName')).sendKeys("Smith");
     element(by.model('newUser.userName')).sendKeys("john_smith");
    element(by.model('newUser.emailAddress')).sendKeys("johnSmith@demo.com");
     element(by.model('newUser.password')).sendKeys("sdf89767a?@");
     element(by.model('comparePassword')).sendKeys("sdf89767a?@");
     browser.sleep(500);

     element(by.id('submit')).click();
     browser.sleep(6000); 
     // alert should disappear after 5 seconds
      // and then redirects to login page. 

       expect(browser.getCurrentUrl()).toEqual(loginURL);

 });
*/ 
describe('testing validity of individual fields',function(){

var userName = element(by.model('newUser.userName'));
var firstName = element(by.model('newUser.firstName'));
var email=element(by.model('newUser.emailAddress'));
var password=element(by.model('newUser.password'));
var repeatpassword=element(by.model('comparePassword'));
var lastName=element(by.model('newUser.lastName'));

it('Username field should show invalid error when symbols are entered', function() {
	     browser.get('http://localhost:9000/#/register');
	       userName.sendKeys('!@#!@#');
		browser.sleep(1000);
		expect((userName).getAttribute('class')).toMatch('ng-invalid'); });

it('First name field should not accept numbers or symbols', function() {
	     browser.get('http://localhost:9000/#/register');
	       firstName.sendKeys('!@#1@#');
		browser.sleep(1000);
		expect((firstName).getAttribute('class')).toMatch('ng-invalid');
});

it('Email field should not accept invalid text', function() {
	     browser.get('http://localhost:9000/#/register');
	       email.sendKeys('testing#.com');
		browser.sleep(1000);
		expect((email).getAttribute('class')).toMatch('ng-invalid');
});

it('Password field should not accept less than 8 characters', function() {
	     browser.get('http://localhost:9000/#/register');
	       password.sendKeys('test123');
		browser.sleep(1000);
		expect((password).getAttribute('class')).toMatch('ng-invalid');
});

it("Repeat password field should show invalid error if passwords don't match", function() {
	     browser.get('http://localhost:9000/#/register');
	       password.sendKeys('test1234');
			repeatpassword.sendKeys('123test4');
		browser.sleep(600);

		expect((repeatpassword).getAttribute('class')).toMatch('ng-invalid');
});

it("Form fields should show error messages if required fields are not filled", function() {
	     browser.get('http://localhost:9000/#/register');
 firstName.sendKeys('a').clear(); 
   lastName.sendKeys('a').clear();
userName.sendKeys('a').clear();
 email.sendKeys('a').clear();
 password.sendKeys('a').clear();
 repeatpassword.sendKeys('a').clear();
	browser.sleep(1000);
	expect((firstName).getAttribute('class')).toMatch('ng-invalid');
		expect((lastName).getAttribute('class')).toMatch('ng-invalid');
		expect((userName).getAttribute('class')).toMatch('ng-invalid');
		expect((email).getAttribute('class')).toMatch('ng-invalid');
		expect((password).getAttribute('class')).toMatch('ng-invalid');
		expect((repeatpassword).getAttribute('class')).toMatch('ng-invalid');

});

});
