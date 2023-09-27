
const conn = require('../database');
var mv = require('mv');
const upload = require('../upload');



const debtsHome = async (req, res) => {

    let page_data = {
        title: "Debts",
        currrentPath: "debts"
    };

    res.render('dashboard/debts', page_data);
};

module.exports = { debtsHome };