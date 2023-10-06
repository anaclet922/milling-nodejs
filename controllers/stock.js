
const conn = require('../database');
var mv = require('mv');
const upload = require('../upload');



const stockHome = async (req, res) => {

    let page_data = {
        title: "Stock",
        currrentPath: "stock"
    };

    res.render('dashboard/stock', page_data);

};




module.exports = { stockHome };