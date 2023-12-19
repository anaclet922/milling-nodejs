
const conn = require('../database');
var mv = require('mv');
const upload = require('../upload');



const salesHome = async (req, res) => {

    const [modes] = await (await conn).query("SELECT * FROM tbl_payments_methods WHERE status = 'ACTIVE' ORDER BY id DESC");
    const [customers] = await (await conn).query("SELECT * FROM tbl_customers ORDER BY id DESC");
    const [users] = await (await conn).query("SELECT * FROM tbl_workforce WHERE type = 'PERMANENT'");

    const [sales] = await (await conn).query("SELECT tbl_sales.id as sale_id, tbl_sales.created_at as sale_at, tbl_sales.*, tbl_customers.* FROM tbl_sales LEFT JOIN tbl_customers on tbl_sales.customer_id = tbl_customers.id ORDER BY tbl_sales.id DESC");

   

    let page_data = {
        title: "Sales",
        currrentPath: "sales",
        modes: modes,
        customers: customers,
        users: users,
        sales: sales
    };
    res.render('dashboard/sales', page_data);
};


const newSaleForm = async (req, res) => {

    const [modes] = await (await conn).query("SELECT * FROM tbl_payments_methods WHERE status = 'ACTIVE' ORDER BY id DESC");
    const [customers] = await (await conn).query("SELECT * FROM tbl_customers ORDER BY id DESC");
    const [users] = await (await conn).query("SELECT * FROM tbl_workforce WHERE type = 'PERMANENT'");

    const [sales] = await (await conn).query("SELECT tbl_sales.id as sale_id, tbl_sales.created_at as sale_at, tbl_sales.*, tbl_customers.* FROM tbl_sales LEFT JOIN tbl_customers on tbl_sales.customer_id = tbl_customers.id ORDER BY tbl_sales.id DESC");



    let page_data = {
        title: "Sales",
        currrentPath: "new-sale",
        modes: modes,
        customers: customers,
        users: users,
        sales: sales
    };
    res.render('dashboard/new-sale', page_data);
};

const newSale = async (req, res) => {

    const [stock_flour] = await (await conn).query("SELECT * FROM tbl_stock_flour");
    const [stock_branda] = await (await conn).query("SELECT * FROM tbl_stock_branda");

    let product_type = req.body.product_type;
    let unit_price = req.body.unit_price;
    let total_quantity = req.body.total_quantity;
    let seller_id = req.body.seller_id;
    let customer_id = req.body.customer_id;
    let payment_method_id = req.body.payment_method_id;
    let paid_or_debt = req.body.payment_method_id == 'debt' ? 'DEBT' : 'PAID';
    let amount_paid = req.body.payment_method_id != 'debt' ? req.body.amount : 0;
    let amount_debited = req.body.payment_method_id == 'debt' ? req.body.amount : 0;
    let discount = req.body.discount;
    let note = req.body.note;
    let kg_5 = req.body.kg_5 == '' ? 0 : req.body.kg_5;
    let kg_10 = req.body.kg_10 == '' ? 0 : req.body.kg_10;
    let kg_20 = req.body.kg_20 == '' ? 0 : req.body.kg_20;
    let kg_25 = req.body.kg_25 == '' ? 0 : req.body.kg_25;
    let kg_custom = req.body.kg_custom == '' ? 0 : req.body.kg_custom;

    let flour_stock_check = stock_flour[0]['quantity'] >= total_quantity;
    let branda_stock_check = stock_branda[0]['quantity'] >= total_quantity;

    if (product_type == 'FLUOR' && !flour_stock_check) {
        req.flash('error', 'Not that much in stock!');
        return res.redirect('/dashboard/sales');
    }


    if (product_type == 'BRANDA' && !branda_stock_check) {
        req.flash('error', 'Not that much in stock!');
        return res.redirect('/dashboard/sales');
    }


    const [i] = await (await conn).query("INSERT INTO tbl_sales (product_type, unit_price, total_quantity, seller_id, customer_id, payment_method_id, paid_or_debt, amount_paid, amount_debited, discount, note, kg_5, kg_10, kg_20, kg_25, kg_custom) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [product_type, unit_price, total_quantity, seller_id, customer_id, payment_method_id, paid_or_debt, amount_paid, amount_debited, discount, note, kg_5, kg_10, kg_20, kg_25, kg_custom]);

    let sale_id = i.insertId;

    if (paid_or_debt == 'DEBT') {
        const [d] = await (await conn).query("INSERT INTO tbl_debts (customer_id, sale_id, debited_amount, note) VALUES (?,?,?,?)", [customer_id, sale_id, amount_debited, note]);
    } else {
        const [payment] = await (await conn).query("INSERT INTO tbl_payments (customer_id, sale_id, amount_paid, method_of_payment, user_id, note) VALUES (?,?,?,?,?,?)", [customer_id, sale_id, amount_paid, payment_method_id, seller_id, note]);
    }

    if (product_type == 'FLUOR') {
        const [uf] = await (await conn).query("UPDATE tbl_stock_flour SET quantity = quantity - ?", [total_quantity]);
    } else {
        const [ub] = await (await conn).query("UPDATE tbl_stock_branda SET quantity = quantity - ?", [total_quantity]);
    }

    req.flash('success', 'New sale successfully recorded!');
    res.redirect('/dashboard/sales');

};

const saleDelete = async (req, res) => {

    let sale_id = req.query.id;

    const [sale] = await (await conn).query("SELECT * FROM tbl_sales WHERE id = ?", [sale_id]);

    const [d] = await (await conn).query("DELETE FROM tbl_sales WHERE id = ?", [sale_id]);

    if (sale.length) {
        if (sale[0].payment_method_id == 'debt') {
            const [d] = await (await conn).query("DELETE FROM tbl_debts WHERE sale_id = ?", [sale_id]);
        } else {
            const [payment] = await (await conn).query("DELETE FROM tbl_payments WHERE sale_id = ? ", [sale_id]);
        }


        let quantity = sale[0].total_quantity;

        if (sale.product_type == 'FLUOR') {
            const [uf] = await (await conn).query("UPDATE tbl_stock_flour SET quantity = quantity + ?", [quantity]);
        } else {
            const [ub] = await (await conn).query("UPDATE tbl_stock_branda SET quantity = quantity + ?", [quantity]);
        }
    }

    req.flash('success', 'Deleting sale successfully done!');
    res.redirect('/dashboard/sales');

};


const saleEdit = async (req, res) => {

    let sale_id = req.body.sale_id;

    const [stock_flour] = await (await conn).query("SELECT * FROM tbl_stock_flour");
    const [stock_branda] = await (await conn).query("SELECT * FROM tbl_stock_branda");
    const [sale] = await (await conn).query("SELECT * FROM tbl_sales WHERE id = ?", [sale_id]);


    if (sale.length) {
        if (sale[0].payment_method_id == 'debt') {
            const [d] = await (await conn).query("DELETE FROM tbl_debts WHERE sale_id = ?", [sale_id]);
        } else {
            const [d] = await (await conn).query("DELETE FROM tbl_payments WHERE sale_id = ?", [sale_id]);
        }

        let quantity = sale[0].total_quantity;

        if (sale.product_type == 'FLUOR') {
            const [uf] = await (await conn).query("UPDATE tbl_stock_flour SET quantity = quantity + ?", [quantity]);
        } else {
            const [ub] = await (await conn).query("UPDATE tbl_stock_branda SET quantity = quantity + ?", [quantity]);
        }
    }

    let product_type = req.body.product_type;
    let unit_price = req.body.unit_price;
    let total_quantity = req.body.total_quantity;
    let seller_id = req.body.seller_id;
    let customer_id = req.body.customer_id;
    let payment_method_id = req.body.payment_method_id;
    let paid_or_debt = req.body.payment_method_id == 'debt' ? 'DEBT' : 'PAID';
    let amount_paid = req.body.payment_method_id != 'debt' ? req.body.amount : 0;
    let amount_debited = req.body.payment_method_id == 'debt' ? req.body.amount : 0;
    let discount = req.body.discount;
    let note = req.body.note;
    let kg_5 = req.body.kg_5 == '' ? 0 : req.body.kg_5;
    let kg_10 = req.body.kg_10 == '' ? 0 : req.body.kg_10;
    let kg_20 = req.body.kg_20 == '' ? 0 : req.body.kg_20;
    let kg_25 = req.body.kg_25 == '' ? 0 : req.body.kg_25;
    let kg_custom = req.body.kg_custom == '' ? 0 : req.body.kg_custom;

    let flour_stock_check = stock_flour[0]['quantity'] >= total_quantity;
    let branda_stock_check = stock_branda[0]['quantity'] >= total_quantity;

    if (product_type == 'FLUOR' && !flour_stock_check) {
        req.flash('error', 'Not that much in stock!');
        return res.redirect('/dashboard/sales');
    }


    if (product_type == 'BRANDA' && !branda_stock_check) {
        req.flash('error', 'Not that much in stock!');
        return res.redirect('/dashboard/sales');
    }


    const [i] = await (await conn).query("UPDATE tbl_sales SET product_type = ?, unit_price = ?, total_quantity = ?, seller_id = ?, customer_id = ?, payment_method_id = ?, paid_or_debt = ?, amount_paid = ?, amount_debited = ?, discount = ?, note = ?, kg_5 = ?, kg_10 = ?, kg_20 = ?, kg_25 = ?, kg_custom = ? WHERE id = ?", [product_type, unit_price, total_quantity, seller_id, customer_id, payment_method_id, paid_or_debt, amount_paid, amount_debited, discount, note, kg_5, kg_10, kg_20, kg_25, kg_custom, sale_id]);

    if (paid_or_debt == 'DEBT') {
        const [d] = await (await conn).query("INSERT INTO tbl_debts (customer_id, sale_id, debited_amount, note) VALUES (?,?,?,?)", [customer_id, sale_id, amount_debited, note]);
    } else {
        const [payment] = await (await conn).query("INSERT INTO tbl_payments (customer_id, sale_id, amount_paid, method_of_payment, user_id, note) VALUES (?,?,?,?,?,?)", [customer_id, sale_id, amount_paid, payment_method_id, seller_id, note]);
    }

    if (product_type == 'FLUOR') {
        const [uf] = await (await conn).query("UPDATE tbl_stock_flour SET quantity = quantity - ?", [total_quantity]);
    } else {
        const [ub] = await (await conn).query("UPDATE tbl_stock_branda SET quantity = quantity - ?", [total_quantity]);
    }

    req.flash('success', 'New sale successfully recorded!');
    res.redirect('/dashboard/sales');

};


const newCustomer = async (req, res) => {

    try {

        let id_no = req.body.id_no;
        let phone = req.body.phone;
        let first_name = req.body.first_name;
        let last_name = req.body.last_name;
        let about = req.body.about;
        let location = req.body.location;

        console.log(req.body);

        const [c] = await (await conn).query("SELECT * FROM tbl_sellers WHERE id_no = ?", [id_no]);

        if (c.length) {
            let resp = {
                error: 'yes',
                name: 'Seller with same ID/TIN Exist'
            }
            return res.status(200).json(resp);
        }

        const [i] = await (await conn).query("INSERT INTO tbl_customers (id_no, phone, first_name, last_name, about, location) VALUES (?,?,?,?,?,?)", [id_no, phone, first_name, last_name, about, location]);

        let resp = {
            error: 'no',
            id: i.insertId,
            name: first_name + ' ' + last_name
        }

        res.status(200).json(resp);


    } catch (err) {
        let resp = {
            error: 'yes',
            name: 'Error, try again'
        }
        res.status(200).json(resp);
    }


}

const searchCustomer = async (req, res) => {
    try {
        let term = req.query.searchTerm;

        if(term.trim() == ''){
            let resp = {
                id: 'new',
                text: 'New Customer'
            }
            return res.status(200).json('resp'); 
        }
        const [customers] = await (await conn).query("SELECT * FROM tbl_customers WHERE first_name like '%" + term + "%' or last_name like '%" + term + "%'");

        if (customers.length) {

            let items = [];

            for (let index = 0; index < customers.length; index++) {
                let item = {
                    id: customers[index].id,
                    text: customers[index].first_name + ' ' + customers[index].last_name
                }
                items.push(item);
            }
            return res.status(200).json(items);
        } else {
            let resp = {
                id: 'new',
                text: 'New Customer'
            }
            return res.status(200).json([]);
        }

    } catch (err) {
        let resp = {
            id: 'new',
            text: 'New Customer'
        }
        return res.status(200).json([]);
    }
};

module.exports = { salesHome, newSale, saleDelete, saleEdit, newSaleForm, newCustomer, searchCustomer };