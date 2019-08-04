var fs = require('fs-extra');
var HTMLReport = require('protractor-html-reporter-2');
var jasmineReporters = require('jasmine-reporters');
var log4js = require('log4js');

var util = require('./utilities/Util');
var dashboardReportDirectory = '';
var reportsDirectory = './reports/latestReports';
var archivedReports = './reports/archived';
var htmlReport = "";

exports.config = {
  // The address of a running selenium server.
  seleniumAddress: 'http://localhost:4444/wd/hub',

  //Framework used
  framework: 'jasmine',

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
    },
    {
      'browserName': 'internet explorer',
      'version': 'ANY',
      'ignoreZoomSetting': 'ANY'
    }
    // {
    //   'browserName': 'chrome',
    //   'chromeOptions': {
    //     'args': ["--headless", "--disable-gpu", "--window-size=800,600"]
    //   },
    // },
  ],


  onPrepare: async function () {
    await browser.manage().window().maximize();
    global.applicationURL = 'http://www.way2automation.com/angularjs-protractor/banking/#/login';
    global.using = require('jasmine-data-provider');

    log4js.configure({
      appenders: {
        everything: {
          type: 'file',
          filename: 'logs.log',
          maxLogSize: 20480,
          backups: 4,
          compress: true
        }
      },
      categories: {
        default: { appenders: ['everything'], level: 'info' }
      }
    });

    global.caps;
    await browser.getCapabilities().then(async function (cap) {
      caps = await cap;
    });
    global.commonLogger = await log4js.getLogger('ProtractorTest');

    global.Logger = await log4js.getLogger('ProtractorTest - ' + caps.get('browserName'));
    global.browserName = await caps.get('browserName');


    browserDirectory = reportsDirectory + "/" + browserName;
    dashboardReportDirectory = browserDirectory + "/dashboardReport";

    await util.createFolder(dashboardReportDirectory);


    await jasmine.getEnv().addReporter({
      // Called when as it block completed.
      // Prints Testcase status and Exception
      specDone: async function (result) {
        await Logger.info('Test case - ' + await result.status + " : " + await result.fullName);
        await console.log('Test case - ' + await result.status + " : " + await result.fullName);
        for (var i = 0; i < result.failedExpectations.length; i++) {
          Logger.error('Failure: '
            + result.failedExpectations[i].message);
          Logger.error(result.failedExpectations[i].stack);
        }


        if (await result.status == 'failed') {
          //browser.getCapabilities().then(function (caps) {
          //var browserName = caps.get('browserName');
          
          var attach = this.attach;
          var png = await browser.takeScreenshot();
          var decodedImage = new Buffer(png, "base64");
            return await attach(decodedImage, "image/png");
//          var stream = await fs.createWriteStream(dashboardReportDirectory + '/' + browserName + '-' + result.fullName + '.png');
          // + "_" + await util.getDatePostFix() 
  //        await stream.write(new Buffer(png, 'base64'));
   //       await stream.end();


        }


      },

      // Called when a describe block completed.
      // Prints Test Suite status


      suiteDone: async function (result) {
        await Logger.info('Test Suite - ' + await result.description + " : " + await result.status);
        await console.log('Test Suite - ' + await result.description + " : " + await result.status);
      },


      // Called when all suites are completed.
      // Prints overall status


      jasmineDone: async function (result) {
        await Logger.info('Finished  Suite - ' + + await result.overallStatus);
        await console.log('Finished  Suite - ' + + await result.overallStatus);
      }
    });



    // xml report generated for dashboard
    await jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
      consolidateAll: true,
      savePath: browserDirectory + '/xmlReports',
      filePrefix: 'xmlOutput'
    }));




    await jasmine.getEnv().addReporter({
    });
  },

  onComplete: async function () {
    var browserName, browserVersion;
    browserName = caps.get('browserName');
    browserVersion = caps.get('browserVersion');
    platform = caps.get('platformName')
    htmlReport = browserName + '_htmlReport_' + await util.getDatePostFix();
    testConfig = {
      reportTitle: 'NAGP EXAM - Protractor Test Execution Report',
      outputPath: dashboardReportDirectory,
      outputFilename: htmlReport,
      screenshotPath: './',
      testBrowser: browserName,
      browserVersion: browserVersion,
      modifiedSuiteName: false,
      screenshotsOnlyOnFailure: true,
      testPlatform: platform
    };
    await new HTMLReport().from(browserDirectory + '/xmlReports/xmlOutput.xml', testConfig);
  },

  afterLaunch:function(){

  },
} 