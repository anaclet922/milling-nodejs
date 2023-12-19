
const conn = require('../database');
var mv = require('mv');
const upload = require('../upload');



const paymentHome = async (req, res) => {

    let payment_modes = [];

    const [result] = await (await conn).query("SELECT * FROM tbl_payments_methods");
    const [payments] =  await (await conn).query("SELECT * FROM tbl_payments ORDER BY id DESC");

    for(i in payments){
        const [customer] =  await (await conn).query("SELECT * FROM tbl_customers WHERE id = ?", [payments[i].customer_id]);
        const [sale] =  await (await conn).query("SELECT * FROM tbl_sales WHERE id = ?", [payments[i].sale_id]);
        const [user] =  await (await conn).query("SELECT * FROM tbl_workforce WHERE id = ?", [payments[i].user_id]);
        const [mode] =  await (await conn).query("SELECT * FROM tbl_payments_methods WHERE id = ?", [payments[i].method_of_payment]);

        payments[i].customer = customer[0];
        payments[i].sale = sale[0];
        payments[i].user = user[0];
        payments[i].paymentMode = mode[0]

    }
    


    let page_data = {
        title: "Payments",
        currrentPath: "payments",
        payment_modes: result,
        payments: payments
    };
    res.render('dashboard/payments', page_data);

};
const updatePaymentMode = async (req, res) => {

        let id = req.query.id;
        let status = req.query.newstatus;
    
        const [u] = await (await conn).query("UPDATE tbl_payments_methods SET status= ? WHERE id = ?", [status, id]);
    
        req.flash('success', 'Payment mode successfully updated!');
        res.redirect('/dashboard/payments?tab=payment-mode-tab');
    
};
const deletePaymentMode = async (req, res) => {

        let id = req.query.id;
        const [d] = await (await conn).query("DELETE FROM tbl_payments_methods WHERE id = ?", [id]);
        req.flash('success', 'Payment mode successfully deleted!');
        res.redirect('/dashboard/payments?tab=payment-mode-tab');
    
    
}
const postNewPaymentMode = async (req, res) => {

        let payment_mode = req.body.name;
        let status = req.body.status;
    
        const [i] = await (await conn).query("INSERT INTO tbl_payments_methods (name, status) VALUES (?,?)", [payment_mode, status]);
    
        req.flash('success', 'Payment mode successfully created!');
        res.redirect('/dashboard/payments?tab=payment-mode-tab');
    
};
const postEditPaymentMode = async (req, res) => {

        let payment_mode = req.body.name;
        let status = req.body.status;
        let id = req.body.id;
    
        const [i] = await (await conn).query("UPDATE tbl_payments_methods SET name = ?, status = ? WHERE id = ?", [payment_mode, status, id]);
    
        req.flash('success', 'Payment mode successfully updated!');
        res.redirect('/dashboard/payments?tab=payment-mode-tab');
    
}


module.exports = { paymentHome, updatePaymentMode, deletePaymentMode, postNewPaymentMode, postEditPaymentMode };