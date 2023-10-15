
const conn = require('../database');
var mv = require('mv');
const upload = require('../upload');



const salesHome = async (req, res) => {

    const [modes] = await (await conn).query("SELECT * FROM tbl_payments_methods WHERE status = 'ACTIVE' ORDER BY id DESC");
    const [customers] = await (await conn).query("SELECT * FROM tbl_customers ORDER BY id DESC");
    const [users] = await (await conn).query("SELECT * FROM tbl_workforce WHERE type = 'PERMANENT'");

    let page_data = {
        title: "Sales",
        currrentPath: "sales",
        modes: modes,
        customers: customers,
        users: users
    };
    res.render('dashboard/sales', page_data);
};


const newSale = async (req, res) => {

    const [stock_flour] = await (await conn).query("SELECT * FROM tbl_stock_flour");
    const [stock_branda] = await (await conn).query("SELECT * FROM tbl_stock_branda");

    let product_type = req.body.product_type;
    let total_quantity = req.body.total_quantity;
    let seller_id = req.body.seller_id;
    let customer_id = req.body.customer_id;
    let payment_method_id = req.body.payment_method_id;
    let paid_or_debt = req.body.payment_method_id == 'debt' ? 'DEBT' : 'PAID';
    let amount_paid = req.body.payment_method_id != 'debt' ? req.body.amount : 0;
    let amount_debited = req.body.payment_method_id == 'debt' ? req.body.amount : 0;
    let note = req.body.note;
    let kg_5 = req.body.kg_5;
    let kg_10 = req.body.kg_10;
    let kg_20 = req.body.kg_20;
    let kg_25 = req.body.kg_25;
    let kg_custom = req.body.kg_custom;

    let flour_stock_check = stock_flour[0]['quantity'] >= total_quantity;
    let branda_stock_check = stock_branda[0]['quantity'] >= total_quantity;

    if(product_type == ''){

    }

    const [i] = await (await conn).query("INSERT INTO tbl_sales (product_type, total_quantity, seller_id, customer_id, payment_method_id, paid_or_debt, amount_paid, amount_debited, note, kg_5, kg_10, kg_20, kg_25, kg_custom) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [product_type, total_quantity, seller_id, customer_id, payment_method_id, paid_or_debt, amount_paid, amount_debited, note, kg_5, kg_10, kg_20, kg_25, kg_custom]);

    let sale_id = i.insertId;

    if (paid_or_debt == 'DEPT') {
        const [d] = await (await conn).query("INSERT INTO tbl_debts (customer_id, sale_id, debited_amount, note) VALUES (?,?,?)", [purchase_id, amount_debited, note]);
    }

    req.flash('success', 'New sale successfully recorded!');
    res.redirect('/dashboard/sales');

};


module.exports = { salesHome, newSale };