var Customer = function () {

    this.depositAmount = function () {
        return [
            {
                'CustomerName': 'Harry Potter',
                'amount': 200,
                'message':'Deposit Successful'
            },
            {
                'CustomerName': 'Harry Potter',
                'amount': 310,
                'message':'Deposit Successful'
            }
        ]
    };

    this.withdrawAmount = function () {
        return [
            {
                'CustomerName': 'Harry Potter',
                'amount': 200,
                'message':'Transaction successful'
            },
            {
                'CustomerName': 'Harry Potter',
                'amount': 310,
                'message':'Transaction successful'
            }
        ]
    };

    this.customer = function () {
        return [
            {
                'CustomerName': 'Harry Potter'
            }
        ]
    };
};
module.exports = new Customer();