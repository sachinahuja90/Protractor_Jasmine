var homePage = require('../pageObjects/HomePage');
var managerPage = require('../pageObjects/ManagerPage');
var customerPage = require('../pageObjects/CustomerPage');
var browserKeywords = require('../Utilities/BrowserKeywords');
var testDataManager = require('../testData/Manager');
describe('Verify Manager Account', function () {
    using(testDataManager.addNewCustomer, function (data) {
        it('Verify Add Customer', async function () {
            await browserKeywords.verifyElementPresence(homePage.managerLoginButton);
            await browserKeywords.click(homePage.managerLoginButton);
            await browserKeywords.click(managerPage.addCustomerButton);
            await browserKeywords.sendKeys(managerPage.firstName, data.FirstName);
            await browserKeywords.sendKeys(managerPage.lastName, data.LastName);
            await browserKeywords.sendKeys(managerPage.postalCode, data.PostalCode);
            await browserKeywords.click(managerPage.submitButton);
            await browser.sleep(200);
            await browser.switchTo().alert().accept();
            await browserKeywords.click(managerPage.customerButton);
            await browserKeywords.verifyElementPresence(element(by.xpath("//tbody/tr/td[text()='" + data.FirstName + "']")));
            return browser.sleep(200);
        });
    });

    using(testDataManager.openAccount, function (data) {
        it('Verify Open Account', async function () {
            await browserKeywords.verifyElementPresence(homePage.customerLoginButton);
            await browserKeywords.click(homePage.managerLoginButton);
            await browserKeywords.click(managerPage.openAccountButton);
            await browserKeywords.selectByValueFromDropdown(customerPage.customerNameDropdown, data.CustomerName);
            await browserKeywords.selectByValueFromDropdown(customerPage.currencyTypeDropdown, data.Currency);
            await browserKeywords.click(customerPage.submitButton);
            await browser.sleep(200);
            await browser.switchTo().alert().accept();
            await browserKeywords.click(managerPage.customerButton);
            await element(by.xpath("(//tbody/tr/td[text()='" + data.CustomerName.split(" ")[0] + "']/following-sibling::td)[3]")).getText().then(async function (text) {
                if (isNaN(text.split(" ")[0])) {
                    const exists = true;
                    await expect(!exists).to.throw('Account not created');
                }
            });
            return browser.sleep(200);
        });
    });
});