
var Manager = function () {
    this.addNewCustomer = function () {
        return [
            {
                'FirstName': 'Rahul',
                'LastName': 'Kant',
                'PostalCode': 'E1234'
            },
            {
                'FirstName': 'Ravneet',
                'LastName': 'Kaul',
                'PostalCode': '121234'
            }
        ]
    };


    this.openAccount = function () {
        return [
            {
                'CustomerName': 'Rahul Kant',
                'Currency': 'Pound'
            },
            {
                'CustomerName': 'Ravneet Kaul',
                'Currency': 'Dollar'
            }
        ]
    };

    this.openAccount = function () {
        return [
            {
                'CustomerName': 'Rahul Kant',
                'Currency': 'Pound'
            },
            {
                'CustomerName': 'Ravneet Kaul',
                'Currency': 'Dollar'
            }
        ]
    };

};
module.exports = new Manager();