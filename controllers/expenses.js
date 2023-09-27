
const conn = require('../database');
var mv = require('mv');
const upload = require('../upload');



const expensesHome = async (req, res) => {

    let page_data = {
        title: "Expenses",
        currrentPath: "expenses"
    };

    res.render('dashboard/expenses', page_data);
};

module.exports = { expensesHome };