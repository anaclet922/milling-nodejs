
const conn = require('../database');
var mv = require('mv');
const upload = require('../upload');


const millingHome = async (req, res) => {

    // let my_id = req.session.loggedInUser.id;

    // const [users] = await (await conn).query("SELECT * FROM tbl_workforce WHERE type = 'PERMANENT' AND active = 'Y'");
    const [users] = await (await conn).query("SELECT * FROM tbl_workforce WHERE active = 'Y'");
    const [millings] = await (await conn).query("SELECT tbl_milling.id as milling_id, tbl_milling.*, tbl_workforce.*  FROM `tbl_milling` LEFT JOIN tbl_workforce ON tbl_workforce.id = tbl_milling.technician_id ORDER BY tbl_milling.created_at DESC");
    console.log(millings);
    let page_data = {
        title: "Milling",
        currrentPath: "milling",
        users: users,
        millings: millings
    };

    res.render('dashboard/milling', page_data);
};

const postNewMilling = async (req, res) => {

    let milled_at = req.body.milled_at;
    let technician_id = req.body.technician_id;
    let input_kg = req.body.input_kg;
    let output_5kg_flour = req.body.output_5kg_flour;
    let output_10kg_flour = req.body.output_10kg_flour;
    let output_25kg_flour = req.body.output_25kg_flour;
    let output_kg_branda = req.body.output_kg_branda;
    let output_kg_ibitiritiri = req.body.output_kg_ibitiritiri;


    const [i] = await (await conn).query("INSERT INTO tbl_milling (milled_at, technician_id, input_kg, output_5kg_flour, output_10kg_flour, output_25kg_flour, output_kg_branda, output_kg_ibitiritiri) VALUES (?,?,?,?,?,?,?,?)", [milled_at, technician_id, input_kg, output_5kg_flour, output_10kg_flour, output_25kg_flour, output_kg_branda, output_kg_ibitiritiri]);


    const [u] = await (await conn).query("UPDATE tbl_stock_maize SET quantity = quantity - ?", [input_kg]);
    const [b] = await (await conn).query("UPDATE tbl_stock_branda SET quantity = quantity + ?", [output_kg_branda]);
    const [f] = await (await conn).query("UPDATE tbl_stock_flour SET quantity_5kg = quantity_5kg + ?, quantity_10kg = quantity_10kg + ?, quantity_25kg = quantity_25kg + ?", [output_5kg_flour, output_10kg_flour, output_25kg_flour]);
    const [bit] = await (await conn).query("UPDATE tbl_stock_ibitiritiri SET quantity = quantity + ?", [output_kg_ibitiritiri]);


    req.flash('success', 'Milling session recorded successfully!');
    res.redirect('/dashboard/milling');

};


const deleteMilling = async (req, res) => {

    let id = req.query.id;

    const [milling] = await (await conn).query("SELECT * FROM tbl_milling WHERE id = ?", [id]);

    if (milling.length) {

        let flour_5kg_quantity = milling[0].output_5kg_flour;
        let flour_10kg_quantity = milling[0].output_10kg_flour;
        let flour_25kg_quantity = milling[0].output_25kg_flour;
        let branda_quantity = milling[0].output_kg_branda;
        let ibitiritiri_quantity = milling[0].output_kg_ibitiritiri;

        const [f] = await (await conn).query("UPDATE tbl_stock_flour SET quantity_5kg = quantity_5kg - ?, quantity_10kg = quantity_10kg - ?, quantity_25kg = quantity_25kg - ?", [flour_5kg_quantity, flour_10kg_quantity, flour_25kg_quantity]);
        const [b] = await (await conn).query("UPDATE tbl_stock_branda SET quantity = quantity - ?", [branda_quantity]);
        const [biti] = await (await conn).query("UPDATE tbl_stock_ibitiritiri SET quantity = quantity - ?", [ibitiritiri_quantity]);

        const [deleted] = await (await conn).query("DELETE FROM tbl_milling WHERE id = ?", [id]);
        req.flash('success', 'Successfully deleted!');
        res.redirect('/dashboard/milling');

    } else {
        req.flash('error', 'Milling recorded not found!');
        res.redirect('/dashboard/milling');
    }

};


const editMilling = async (req, res) => {


    let milled_at = req.body.milled_at;
    let technician_id = req.body.technician_id;
    let input_kg = req.body.input_kg;
    let output_5kg_flour = req.body.output_5kg_flour;
    let output_10kg_flour = req.body.output_10kg_flour;
    let output_25kg_flour = req.body.output_25kg_flour;
    let output_kg_branda = req.body.output_kg_branda;
    let output_kg_ibitiritiri = req.body.output_kg_ibitiritiri;

    let milling_id = req.body.milling_id;

    const [oldMilling] = await (await conn).query("SELECT * FROM tbl_milling WHERE id = ?", [milling_id]);

    if (oldMilling.length) {

        let flour_5kg_quantity = oldMilling[0].output_5kg_flour;
        let flour_10kg_quantity = oldMilling[0].output_10kg_flour;
        let flour_25kg_quantity = oldMilling[0].output_25kg_flour;
        let branda_quantity = oldMilling[0].output_kg_branda;
        let ibitiritiri_quantity = oldMilling[0].output_kg_ibitiritiri;

        const [f] = await (await conn).query("UPDATE tbl_stock_flour SET quantity_5kg = quantity_5kg - ?, quantity_10kg = quantity_10kg - ?, quantity_25kg = quantity_25kg - ?", [flour_5kg_quantity, flour_10kg_quantity, flour_25kg_quantity]);
        const [b] = await (await conn).query("UPDATE tbl_stock_branda SET quantity = quantity - ?", [branda_quantity]);
        const [biti] = await (await conn).query("UPDATE tbl_stock_ibitiritiri SET quantity = quantity - ?", [ibitiritiri_quantity]);


        const [i] = await (await conn).query("UPDATE tbl_milling SET milled_at = ?, technician_id = ?, input_kg = ?, output_5kg_flour = ?, output_10kg_flour = ?, output_25kg_flour = ?,output_kg_branda = ?, output_kg_ibitiritiri = ? WHERE id = ?", [milled_at, technician_id, input_kg, output_5kg_flour, output_10kg_flour, output_25kg_flour, output_kg_branda, output_kg_ibitiritiri, milling_id]);


        const [u] = await (await conn).query("UPDATE tbl_stock_maize SET quantity = quantity - ?", [input_kg]);
        const [b2] = await (await conn).query("UPDATE tbl_stock_branda SET quantity = quantity + ?", [output_kg_branda]);
        const [f2] = await (await conn).query("UPDATE tbl_stock_flour SET quantity_5kg = quantity_5kg + ?, quantity_10kg = quantity_10kg + ?, quantity_25kg = quantity_25kg + ?", [output_5kg_flour, output_10kg_flour, output_25kg_flour]);
        const [bit] = await (await conn).query("UPDATE tbl_stock_ibitiritiri SET quantity = quantity + ?", [output_kg_ibitiritiri]);



        req.flash('success', 'Milling session updated successfully!');
        res.redirect('/dashboard/milling');

    } else {
        req.flash('error', 'Milling recorded not found!');
        res.redirect('/dashboard/milling');
    }

};

module.exports = { millingHome, postNewMilling, deleteMilling, editMilling };