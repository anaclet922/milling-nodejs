
const conn = require('../database');
var mv = require('mv');
const upload = require('../upload');



const customersHome = async (req, res) => {

    const [customers] = await (await conn).query("SELECT * FROM tbl_customers");

    let page_data = {
        title: "Customers",
        currrentPath: "customers",
        customers: customers
    };

    res.render('dashboard/customers', page_data);
};


const postNewCutomer = async (req, res) => {

    let id_no = req.body.id_no;
    let phone = req.body.phone;
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let about = req.body.about;
    let location = req.body.location;

    const [i] = await (await conn).query("INSERT INTO tbl_customers (id_no, phone, first_name, last_name, about, location) VALUES (?,?,?,?,?,?)", [id_no, phone, first_name, last_name, about, location]);

    let link = req.query.back;

    if (link == 'sale') {
        req.flash('success', 'Customer successfully created!');
        return res.redirect('/dashboard/sales');
    }
    req.flash('success', 'Customer successfully created!');
    res.redirect('/dashboard/customers');

}


const postEditCutomer = async (req, res) => {

    let id_no = req.body.id_no;
    let phone = req.body.phone;
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let about = req.body.about;
    let location = req.body.location;


    let id = req.body.id;

    const [i] = await (await conn).query("UPDATE tbl_customers SET id_no = ?, phone = ?, first_name = ?, last_name = ?, about = ?, location = ? WHERE id = ?", [id_no, phone, first_name, last_name, about, location, id]);

    req.flash('success', 'Customer successfully updated!');
    res.redirect('/dashboard/customers');

}


const deleteCutomer = async (req, res) => {

    let id = req.query.id;

    const [i] = await (await conn).query("DELETE FROM tbl_customers WHERE id = ?", [id]);

    req.flash('success', 'Customer successfully deleted!');
    res.redirect('/dashboard/customers');

}



module.exports = { customersHome, postNewCutomer, postEditCutomer, deleteCutomer };