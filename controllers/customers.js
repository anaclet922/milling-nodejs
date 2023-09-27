
const conn = require('../database');
var mv = require('mv');
const upload = require('../upload');



const customersHome = async (req, res) => {

    let page_data = {
        title: "Customers",
        currrentPath: "customers"
    };

    res.render('dashboard/customers', page_data);
};

module.exports = { customersHome };