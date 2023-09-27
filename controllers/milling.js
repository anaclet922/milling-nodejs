
const conn = require('../database');
var mv = require('mv');
const upload = require('../upload');



const millingHome = async (req, res) => {

    let page_data = {
        title: "Milling",
        currrentPath: "milling"
    };

    res.render('dashboard/milling', page_data);
};

module.exports = { millingHome };