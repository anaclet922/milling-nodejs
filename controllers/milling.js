
const conn = require('../database');
var mv = require('mv');
const upload = require('../upload');


const millingHome = async (req, res) => {

    // let my_id = req.session.loggedInUser.id;

    const [users] = await (await conn).query("SELECT * FROM tbl_workforce WHERE type = 'PERMANENT' AND active = 'Y'");
    const [millings] = await (await conn).query("SELECT tbl_milling.id as milling_id, tbl_milling.*, tbl_workforce.*  FROM `tbl_milling` LEFT JOIN tbl_workforce ON tbl_workforce.id = tbl_milling.technician_id ORDER BY tbl_milling.created_at DESC");

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
    let output_kg_flour = req.body.output_kg_flour;
    let output_kg_branda = req.body.output_kg_branda;

    console.log(milled_at);

    const [i] = await (await conn).query("INSERT INTO tbl_milling (milled_at, technician_id, input_kg, output_kg_flour, output_kg_branda) VALUES (?,?,?,?,?)", [milled_at, technician_id, input_kg, output_kg_flour, output_kg_branda]);


    const [u] = await (await conn).query("UPDATE tbl_stock_maize SET quantity = quantity - ?", [input_kg]);
    const [b] = await (await conn).query("UPDATE tbl_stock_branda SET quantity = quantity + ?", [output_kg_branda]);
    const [f] = await (await conn).query("UPDATE tbl_stock_flour SET quantity = quantity + ?", [output_kg_flour]);


    req.flash('success', 'Milling session recorded successfully!');
    res.redirect('/dashboard/milling');

};


module.exports = { millingHome, postNewMilling };