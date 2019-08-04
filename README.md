# Protractor
Protractor is an end-to-end test framework for Angular and AngularJS applications. Protractor is a Node.js program built on top of WebDriverJS. Protractor runs tests against your application running in a real browser, interacting with it as a user would.

# E2E Test Automation using Protractor

## Features supported
1. Dependency management using package.json file.
2. E2E GUI Automation by using Protractor-Jasmine Framework.
3. Modular Approach via Page Object model, Common methods and Hooks implementation.
4. Browser supported - Chrome, IE and Firefox.
5. Parallel Execution on Multiple Browsers.
6. Headless browsers.
7. HTML Report by including protractor-jasmine2-html-reporter.
8. Logging implementation via Log4js.
9. Jasmine Expect is used for assertions.
10. Capture screen shots for failed testcases.
11. Parameterized Test cases via Jasmine Data Provider.
12. Exception handling
13. Different hooks used - beforeEach, specDone, suiteDone, onPrepare.


## Pre-requisite
1. Node js

## How to install & Run using command prompt
1. Please extract the project at your desired path.
2. Open Terminal and Run "npm install"
3. Run command "webdriver-manager start"
4. On another Terminal Run command "npm test" or "protractor config.js"
5. All the automated test cases in the config.js will be executed.


## To view Report 
1. Go to the root directory under `reports/latestReports/<browser>/Report<Browser><Version>_DateTime`


Note: Test cases are available in `.\Testcases.xlsx` for your reference.
