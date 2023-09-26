
const conn = require('../database');
var mv = require('mv');
const upload = require('../upload');



const purchasesHome = async (req, res) => {

    let page_data = {
        title: "Purchase",
        currrentPath: "purchase"
    };

    res.render('dashboard/purchase', page_data);
};

module.exports = { purchasesHome };