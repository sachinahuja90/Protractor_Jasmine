var homePage = function () {
  this.customerLoginButton= element(by.xpath("//button[@ng-click='customer()']"));
  this.managerLoginButton= element(by.css('button[ng-click="manager()"]'));
  this.homeButton= element(by.css('[ng-click="home()"]'));
};
module.exports = new homePage();