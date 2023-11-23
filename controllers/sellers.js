
const conn = require('../database');
var mv = require('mv');
const upload = require('../upload');



const sellersHome = async (req, res) => {

    const [sellers] = await (await conn).query("SELECT * FROM tbl_sellers");

    let page_data = {
        title: "sellers",
        currrentPath: "sellers",
        sellers: sellers
    };

    res.render('dashboard/sellers', page_data);
};


const postNewSeller = async (req, res) => {

    let id_no = req.body.id_no;
    let phone = req.body.phone;
    let first_name = req.body.first_name;
    // let last_name = req.body.last_name;
    let last_name = '';
    let about = req.body.about;
    let location = req.body.location;

    const [i] = await (await conn).query("INSERT INTO tbl_sellers (id_no, phone, first_name, last_name, about, location) VALUES (?,?,?,?,?,?)", [id_no, phone, first_name, last_name, about, location]);

    req.flash('success', 'Customer successfully created!');
    res.redirect('/dashboard/sellers');

}


const postEditSeller = async (req, res) => {

    let id_no = req.body.id_no;
    let phone = req.body.phone;
    let first_name = req.body.first_name;
    // let last_name = req.body.last_name;
    let last_name = '';
    let about = req.body.about;
    let location = req.body.location;

    
    let id = req.body.id;

    const [i] = await (await conn).query("UPDATE tbl_sellers SET id_no = ?, phone = ?, first_name = ?, last_name = ?, about = ?, location = ? WHERE id = ?", [id_no, phone, first_name, last_name, about, location, id]);

    req.flash('success', 'Customer successfully updated!');
    res.redirect('/dashboard/sellers');

}


const deleteSeller = async (req, res) => {

    let id = req.query.id;
    
    const [i] = await (await conn).query("DELETE FROM tbl_sellers WHERE id = ?", [id]);

    req.flash('success', 'Customer successfully deleted!');
    res.redirect('/dashboard/sellers');

}



module.exports = { sellersHome, postNewSeller, postEditSeller, deleteSeller };