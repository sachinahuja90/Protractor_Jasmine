var homePage = require('../pageObjects/HomePage');
var customerPage = require('../pageObjects/CustomerPage');
var browserKeywords = require('../Utilities/BrowserKeywords');
var testDataCustomer = require('../testData/Customer');

describe('Verify Customer Account', function () {
    using(testDataCustomer.customer, function (data) {
        it('Validate the Customer login into the application', async function () {
            await browserKeywords.verifyElementPresence(homePage.managerLoginButton);
            await browserKeywords.click(homePage.customerLoginButton);
            await browserKeywords.selectByValueFromDropdown(customerPage.customerNameDropdown, data.CustomerName);
            await browserKeywords.click(customerPage.submitButton);
            await browserKeywords.verifyWebElementText(customerPage.welcomeMessage, data.CustomerName);
            return browser.sleep(200);
        });
    });

    using(testDataCustomer.depositAmount, function (data) {
        it('Validate that customer is able to deposit amount in his account.', async function () {
            await browserKeywords.verifyElementPresence(homePage.managerLoginButton);
            await browserKeywords.click(homePage.customerLoginButton);
            await browserKeywords.selectByValueFromDropdown(customerPage.customerNameDropdown, data.CustomerName);
            await browserKeywords.click(customerPage.submitButton);
            await browserKeywords.verifyWebElementText(customerPage.welcomeMessage, data.CustomerName);
            await browserKeywords.click(customerPage.depositButton);
            await browserKeywords.sendKeys(customerPage.amount, data.amount);
            await browserKeywords.click(customerPage.submitButton);
            await browserKeywords.verifyWebElementText(customerPage.validationMessage, data.message);
            return browser.sleep(20);
        });
    });

    using(testDataCustomer.withdrawAmount, function (data) {
        it('Validate that customer is able to withdraw amount in his account.', async function () {
            await browserKeywords.verifyElementPresence(homePage.managerLoginButton);
            await browserKeywords.click(homePage.customerLoginButton);
            await browserKeywords.selectByValueFromDropdown(customerPage.customerNameDropdown, data.CustomerName);
            await browserKeywords.click(customerPage.submitButton);
            await browserKeywords.verifyWebElementText(customerPage.welcomeMessage, data.CustomerName);
            await browserKeywords.click(customerPage.withdrawButton);
            await browserKeywords.sendKeys(customerPage.amount, data.amount);
            await browserKeywords.click(customerPage.submitButton);
            await browserKeywords.verifyWebElementText(customerPage.validationMessage, data.message);
            return browser.sleep(20);
        });
    });


    using(testDataCustomer.customer, function (data) {
        it('Validate that customer is able to withdraw amount in his account.', async function () {
            await browserKeywords.verifyElementPresence(homePage.managerLoginButton);
            await browserKeywords.click(homePage.customerLoginButton);
            await browserKeywords.selectByValueFromDropdown(customerPage.customerNameDropdown, data.CustomerName);
            await browserKeywords.click(customerPage.submitButton);
            await browserKeywords.verifyWebElementText(customerPage.welcomeMessage, data.CustomerName);
            await browserKeywords.click(customerPage.withdrawButton);
            await customerPage.balanceAmount.getText().then(async function (text) {
                await browserKeywords.sendKeys(customerPage.amount, text + 12);
                await browserKeywords.click(customerPage.submitButton);
            });
            await browserKeywords.verifyWebElementText(customerPage.validationMessage, 'Transaction Failed. You can not withdraw amount more than the balance.');
            return browser.sleep(20);
        });
    });
});