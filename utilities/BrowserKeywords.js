module.exports = {

  click: async function (webElement) {
    try {
      await webElement.click();
      await Logger.info("Webelement : [" + webElement.locator().toString() + "] clicked");
      return await browser.sleep(500);
    }
    catch (e) {
      await Logger.error("Webelement : [" + webElement.locator().toString() + "] clicked");
      throw await e;
    }
  },

  selectByValueFromDropdown: async function (webElement, string) {
    try {
      await this.click(webElement);
      await webElement.all(by.tagName('option')).each(async function (element, index) {
        text = await element.getText();
        if (string === text) {
          await element.click();
          await Logger.info(string + " has been selected from dropdown [" + webElement.locator().toString() + "]");
        }
      });
      return await browser.sleep(500);
    }
    catch (e) {
      await Logger.error("Didn't selected " + string + " from dropdown [" + webElement.locator().toString() + "]");
      throw await e;
    }
  },

  verifyWebElementText: async function (webElement, string) {
    try {
      text = await webElement.getText()
      expect(string).toBe(text);
      await Logger.info("Validation Pass => Webelement : [" + webElement.locator().toString() + "] contains text : " + string);
      return await browser.sleep(500);
    }
    catch (e) {
      await Logger.error("Validation Fails => Webelement with text : " + string + " doesn't found.");
      throw await e;
    }
  },

  sendKeys: async function (webElement, string) {
    try {
      await webElement.sendKeys(string);
      await Logger.info("Text : '" + string + "' typed in Webelement[" + webElement.locator().toString() + "]");
      return await browser.sleep(500);
    }
    catch (e) {
      await Logger.error("Not able to type Text : '" + string + "' in Webelement[" + webElement.locator().toString() + "]");
      throw await e;
    }

  },

  verifyElementPresence: async function (webElement) {
    try {
      await expect(webElement.isPresent()).toBe(true);
      await Logger.info("Validation Pass => Webelement[" + webElement.locator().toString() + "] present on screen");
      return await browser.sleep(500);
    }
    catch (e) {
      await Logger.error("Validation Fail => Webelement[" + webElement.locator().toString() + "] not found");
      throw await e;
    }
  },
};