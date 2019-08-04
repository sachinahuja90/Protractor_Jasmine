var managerPage = function(){
  this.addCustomerButton = element(by.css("[ng-click='addCust()']"));
  this.openAccountButton = element(by.css("[ng-click='openAccount()']"));
  this.customerButton = element(by.css("[ng-click='showCust()']"));
  this.firstName =  element(by.model('fName'));
  this.lastName = element(by.model('lName'));
  this.postalCode = element(by.model('postCd'));
  this.submitButton=  element(by.xpath("//button[@type='submit']"));
};
module.exports = new managerPage();