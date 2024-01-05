
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
        maize: maize.length > 0 ? maize[0].quantity : 0,
        flour: flour.length > 0 ? flour[0].quantity : 0,
        branda: branda.length > 0 ? branda[0].quantity : 0
    };

    res.render('dashboard/stock', page_data);

};


const addToStock = async (req, res) => {

    let output_5kg_flour = req.body.output_5kg_flour;
    let output_10kg_flour = req.body.output_10kg_flour;
    let output_25kg_flour = req.body.output_25kg_flour;

    let branda_quantity = req.body.branda_quantity;
    let ibitiritiri_quantity = req.body.ibitiritiri_quantity;

    const [b2] = await (await conn).query("UPDATE tbl_stock_branda SET quantity = quantity + ?", [branda_quantity]);
    const [f2] = await (await conn).query("UPDATE tbl_stock_flour SET quantity_5kg = quantity_5kg + ?, quantity_10kg = quantity_10kg + ?, quantity_25kg = quantity_25kg + ?", [output_5kg_flour, output_10kg_flour, output_25kg_flour]);
    const [bit] = await (await conn).query("UPDATE tbl_stock_ibitiritiri SET quantity = quantity + ?", [ibitiritiri_quantity]);


    req.flash('success', 'Stock successfully updated!');
    res.redirect('/dashboard/stock');

}


const removeToStock = async (req, res) => {

    let removeValue = req.body.what_to_remove;
    let stock = req.body.stock;


    const [branda] = await (await conn).query("UPDATE tbl_stock_" + stock + " SET quantity = quantity - ?", [removeValue]);

    req.flash('success', 'Stock successfully updated!');
    res.redirect('/dashboard/stock');

}


const newStock = async (req, res) => {

    const [flour] = await (await conn).query("SELECT * FROM tbl_stock_flour");
    const [branda] = await (await conn).query("SELECT * FROM tbl_stock_branda");
    const [ibitiritiri] = await (await conn).query("SELECT * FROM tbl_stock_ibitiritiri");



    let page_data = {
        title: "New Stock",
        currrentPath: "new-stock",
        flour: flour,
        branda: branda,
        ibitiritiri: ibitiritiri
    };
    res.render('dashboard/new-stock', page_data);

}


module.exports = { stockHome, addToStock, removeToStock, newStock };