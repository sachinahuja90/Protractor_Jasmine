var customerPage = function(){
  this.customerNameDropdown= element(by.model('custId'));
  this.currencyTypeDropdown= element(by.model('currency'));
  this.depositButton= element(by.css('[ng-click="deposit()"]'));
  this.withdrawButton= element(by.css('[ng-click="withdrawl()"]'));
  this.transactionButton= element(by.css('[ng-click="transactions()"]'));
  this.resetTransaction= element(by.xpath("//button[@ng-click='reset()']"));
  this.amount= element(by.xpath("//input[@placeholder='amount']"));
  this.submitButton= element(by.xpath("//button[@type='submit']"));
  this.validationMessage= element(by.xpath("//span[@class='error ng-binding']"));
  this.welcomeMessage= element(by.xpath("//span[@class='fontBig ng-binding']"));
  this.balanceAmount= element(by.xpath("//div[@ng-hide='noAccount']//Strong[2]"));
  this.depositSuccessMsg= element(by.xpath("//span[text()='Deposit Successful']"));
};
module.exports = new customerPage();