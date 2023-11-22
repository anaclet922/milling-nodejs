
const conn = require('../database');
var mv = require('mv');
const upload = require('../upload');



const stockHome = async (req, res) => {

    const [maize] = await (await conn).query("SELECT * FROM tbl_stock_maize");
    const [flour] = await (await conn).query("SELECT * FROM tbl_stock_flour");
    const [branda] = await (await conn).query("SELECT * FROM tbl_stock_branda");

    let page_data = {
        title: "Stock",
        currrentPath: "stock",
        maize : maize.length > 0 ? maize[0].quantity : 0,
        flour : flour.length > 0 ? flour[0].quantity : 0,
        branda : branda.length > 0 ? branda[0].quantity : 0
    };

    res.render('dashboard/stock', page_data);

};


const addToStock = async (req,res) => {

    let addValue = req.body.what_to_add; 
    let stock = req.body.stock;

    const [branda] = await (await conn).query("UPDATE tbl_stock_" + stock + " SET quantity = quantity + ?", [addValue]);

    req.flash('success', 'Stock successfully updated!');
    res.redirect('/dashboard/stock');

}


const removeToStock = async (req,res) => {

    let removeValue = req.body.what_to_remove;
    let stock = req.body.stock;

    
    const [branda] = await (await conn).query("UPDATE tbl_stock_" + stock + " SET quantity = quantity - ?", [removeValue]);

    req.flash('success', 'Stock successfully updated!');
    res.redirect('/dashboard/stock');

}


 
module.exports = { stockHome, addToStock, removeToStock };