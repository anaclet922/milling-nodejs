
const conn = require('../database');
var mv = require('mv');
const upload = require('../upload');



const inventoryHome = async (req, res) => {

    let page_data = {
        title: "Inventory",
        currrentPath: "inventory"
    };

    res.render('dashboard/inventory', page_data);
};

module.exports = { inventoryHome };