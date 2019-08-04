var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
var util = require('./utilities/Util');
var dashboardReportDirectory = './reports/latestReports';
var log4js = require('log4js');


exports.config = {
  // The address of a running selenium server.
  seleniumAddress: 'http://localhost:4444/wd/hub',

  //Framework used
  framework: 'jasmine',

  //ignoring uncaught exception to avoid skipping of other testcases
  ignoreUncaughtExceptions: true,


  jasmineNodeOpts: {
    defaultTimeoutInterval: 50000
  },

  // Disabled selenium promise manager
  SELENIUM_PROMISE_MANAGER: false,


  // Define which tests should execute
  specs: ['./specifications/*.js'],


  // ###### Multi browser Parallel Execution
  multiCapabilities: [
    {
      'browserName': 'chrome',
      'chromeOptions': {
        'args': ['show-fps-counter=true'],
      }
    },
    {
      'browserName': 'firefox',
      'moz:firefoxOptions': {
        'args': ['--safe-mode'],
        //'args': [ "--headless" ]
      }
    }
  ],



  onPrepare: async function () {
    await log4js.configure("./config/log4js.json");
    global.commonLogger = await log4js.getLogger('ProtractorTest');

    await browser.manage().window().maximize();
    global.applicationURL = 'http://www.way2automation.com/angularjs-protractor/banking/#/login';
    global.using = require('jasmine-data-provider');

    global.caps;
    await browser.getCapabilities().then(async function (cap) {
      caps = await cap;
    });

    global.browserName = await caps.get('browserName');
    global.Logger = await log4js.getLogger('ProtractorTest - ' + browserName);

    dashboardReportDirectory = await dashboardReportDirectory + "/" + browserName + "_" + await caps.get('webdriver.remote.sessionid')
    await util.createFolder(dashboardReportDirectory);

    var htmlFileName = "Report_" + browserName + "[" + await caps.get("browserVersion") + "]_"
    jasmine.getEnv().addReporter(
      new Jasmine2HtmlReporter({
        savePath: dashboardReportDirectory,
        screenshotsFolder: 'images',
        takeScreenshots: true,
        takeScreenshotsOnlyOnFailures: true,
        cleanDestination: false,
        fileName: htmlFileName,
        fileNameDateSuffix: true,
        fileNameSeparator: '_'
      })
    );

    await jasmine.getEnv().addReporter({
      // Called when as it block completed.
      // Prints Testcase status and Exception
      specDone: async function (result) {
        await Logger.info('Test case - ' + await result.status + " : " + await result.fullName);
        await console.log('Test case - ' + await result.status + " : " + await result.fullName);
        for (var i = 0; i < result.failedExpectations.length; i++) {
          await Logger.error('Failure: '
            + result.failedExpectations[i].message);
          await Logger.error(result.failedExpectations[i].stack);
        }
      },

      // Called when a describe block completed.
      // Prints Test Suite status
      suiteDone: async function (result) {
        await Logger.info('Test Suite - ' + await result.description + " : " + await result.status);
        await console.log('Test Suite - ' + await result.description + " : " + await result.status);
      },
    });
  },
} 