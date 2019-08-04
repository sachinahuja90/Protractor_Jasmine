
// Executed before each testcase
beforeEach(async function(){
    await Logger.info("**** Started a new testcase ****");
    await browser.get(applicationURL);
    await Logger.info("User Navigated to : " + applicationURL);
    await browser.sleep(100);
});
