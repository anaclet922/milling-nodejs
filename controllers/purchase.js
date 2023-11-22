
const conn = require('../database');
var mv = require('mv');
const upload = require('../upload');



const purchasesHome = async (req, res) => {

    const [purchases] = await (await conn).query("SELECT tbl_purchases.id as puchase_id, tbl_purchases.created_at as creation_date, tbl_purchases.*, tbl_payments_methods.* FROM tbl_purchases LEFT JOIN tbl_payments_methods ON tbl_payments_methods.id = tbl_purchases.payment_method_id ORDER BY tbl_purchases.id DESC");
    const [sellers] = await (await conn).query("SELECT * FROM tbl_sellers ORDER BY id DESC");
    const [modes] = await (await conn).query("SELECT * FROM tbl_payments_methods WHERE status = 'ACTIVE' ORDER BY id DESC"); 
    const [item_types] = await (await conn).query("SELECT * FROM tbl_purchase_item_types ORDER BY id DESC");


    for (let index = 0; index < purchases.length; index++) {
        let purchase = purchases[index];
        let n = await getSellerById(purchase.seller);
        purchase.seller_name = n;
        purchases[index] = purchase;
    }


    let page_data = {
        title: "Purchase",
        currrentPath: "purchase",
        modes: modes,
        sellers: sellers,
        purchases: purchases,
        item_types: item_types
    };

    res.render('dashboard/purchase', page_data);
};

const formNewPurchase = async (req, res) => {

    const [purchases] = await (await conn).query("SELECT tbl_purchases.id as puchase_id, tbl_purchases.created_at as creation_date, tbl_purchases.*, tbl_payments_methods.* FROM tbl_purchases LEFT JOIN tbl_payments_methods ON tbl_payments_methods.id = tbl_purchases.payment_method_id ORDER BY tbl_purchases.id DESC");
    const [sellers] = await (await conn).query("SELECT * FROM tbl_sellers ORDER BY id DESC");
    const [modes] = await (await conn).query("SELECT * FROM tbl_payments_methods WHERE status = 'ACTIVE' ORDER BY id DESC");
    const [item_types] = await (await conn).query("SELECT * FROM tbl_purchase_item_types ORDER BY id DESC");

    for (let index = 0; index < purchases.length; index++) {
        let purchase = purchases[index];
        let n = await getSellerById(purchase.seller);
        purchase.seller_name = n;
        purchases[index] = purchase;
    }


    let page_data = {
        title: "Purchase",
        currrentPath: "purchase",
        purchases: purchases,
        modes: modes,
        sellers: sellers,
        item_types: item_types
    };

    res.render('dashboard/new-purchase', page_data);

};

const newPurchase = async (req, res) => {

    let type = req.body.type;

    if (type == '') {
        req.flash('error', 'Choose type of purchase!');
        return res.redirect('/dashboard/purchases');
    }

    let item_name = req.body.item_name;
    let description = req.body.description;
    let note = req.body.note;
    let unit_price = req.body.unit_price;
    let quantity = req.body.quantity;
    let total_price = req.body.total_price;
    let transport_cost = req.body.transport_cost;
    let other_cost = req.body.other_cost;
    let place_of_purchase = req.body.place_of_purchase;
    let seller = req.body.seller;
    let payment_method_id = req.body.payment_method_id;


    if (payment_method_id == 'debt') {
        payment_method_id = 0;
    }

    const [u] = await (await conn).query("INSERT INTO tbl_purchases (type, item_name, description, note, unit_price, quantity, total_price, transport_cost, other_cost, place_of_purchase, seller, payment_method_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", [type, item_name, description, note, unit_price, quantity, total_price, transport_cost, other_cost, place_of_purchase, seller, payment_method_id]);

    let purchase_id = u.insertId;

    if (type == 'maize') {
        const [stock] = await (await conn).query("SELECT * FROM tbl_stock_maize");
        if (stock.length) {
            const [ii] = await (await conn).query("UPDATE tbl_stock_maize SET quantity = quantity + ?", [quantity]);
        } else {
            const [ii] = await (await conn).query("INSERT INTO tbl_stock_maize (quantity) VALUES (?)", [quantity]);
        }
    }

    if (payment_method_id == 0) { // is debt insert it as we owe someone money
        const [d] = await (await conn).query("INSERT INTO tbl_debts (purchase_id, debited_amount, note) VALUES (?,?,?)", [purchase_id, total_price, note]);
    }

    req.flash('success', 'Puchase successfully recorded!');
    res.redirect('/dashboard/purchase');

};

const deletePurchase = async (req, res) => {

    let purchase_id = req.query.id;

    const [purchase] = await (await conn).query("SELECT * FROM tbl_purchases WHERE id = ?", [purchase_id]);

    if (purchase.length) {

        let quantity = purchase[0].quantity;
        if (purchase[0].type == 'maize') {
            const [ii] = await (await conn).query("UPDATE tbl_stock_maize SET quantity = quantity - ?", [quantity]);
        }

        const [deleted] = await (await conn).query("DELETE FROM tbl_purchases WHERE id = ?", [purchase_id]);
        const [deletedDebt] = await (await conn).query("DELETE FROM tbl_debts WHERE purchase_id = ?", [purchase_id]);

        req.flash('success', 'Successfully deleted!');
        res.redirect('/dashboard/purchase');

    } else {
        req.flash('error', 'Puchase recorded not found!');
        res.redirect('/dashboard/purchase');
    }


};

const editPurchase = async (req, res) => {


    let type = req.body.type;

    if (type == '') {
        req.flash('error', 'Choose type of purchase!');
        return res.redirect('/dashboard/purchases');
    }

    let item_name = req.body.item_name;
    let description = req.body.description;
    let note = req.body.note;
    let unit_price = req.body.unit_price;
    let quantity = req.body.quantity;
    let total_price = req.body.total_price;
    let transport_cost = req.body.transport_cost;
    let place_of_purchase = req.body.place_of_purchase;
    let seller = req.body.seller;
    let payment_method_id = req.body.payment_method_id;

    let purchase_id = req.body.purchase_id

    if (payment_method_id == 'debt') {
        payment_method_id = 0;
    }

    const [oldPurchase] = await (await conn).query("SELECT * FROM tbl_purchases WHERE id = ?", [purchase_id]);


    const [u] = await (await conn).query("UPDATE tbl_purchases SET type = ?, item_name = ?, description = ?, note = ?, unit_price = ?, quantity = ?, total_price = ?, transport_cost = ?, place_of_purchase = ?, seller = ?, payment_method_id = ? WHERE id = ? ", [type, item_name, description, note, unit_price, quantity, total_price, transport_cost, place_of_purchase, seller, payment_method_id, purchase_id]);

    if (type == 'maize') {
        const [stock] = await (await conn).query("SELECT * FROM tbl_stock_maize");
        const [ii] = await (await conn).query("UPDATE tbl_stock_maize SET quantity = quantity - ?", [oldPurchase[0].quantity]);
        const [iii] = await (await conn).query("UPDATE tbl_stock_maize SET quantity = quantity + ?", [quantity]);

    }

    if (payment_method_id == 0) { // is debt insert it as we owe someone money
        const [d] = await (await conn).query("UPDATE tbl_debts SET debited_amount = ?, note = ? WHERE purchase_id = ?", [total_price, note, purchase_id]);
    }

    req.flash('success', 'Puchase successfully updated!');
    res.redirect('/dashboard/new-purchase');

};


const newType = async (req, res) => {

    try {
        let type = req.body.type;

        const [c] = await (await conn).query("SELECT * FROM tbl_purchase_item_types WHERE type = ?", [type]);

        if (c.length) {
            let resp = {
                error: 'yes',
                new_type: 'Existing type'
            }
            return res.status(200).json(resp);
        }

        const [t] = await (await conn).query("INSERT INTO tbl_purchase_item_types (type) VALUES (?)", [type]);

        let id = t.insertId;

        let resp = {
            error: 'no',
            new_type: type
        }
        res.status(200).json(resp);
    }
    catch (err) {
        let resp = {
            error: 'yes',
            type: 'Error, try again'
        }
        res.status(200).json(resp);
    }

};

const newSeller = async (req, res) => {
    try {
        let id_no = req.body.id_no;
        let phone = req.body.phone;
        let first_name = req.body.first_name;
        let last_name = req.body.last_name;
        let about = req.body.about;
        let location = req.body.location;

        const [c] = await (await conn).query("SELECT * FROM tbl_sellers WHERE id_no = ?", [id_no]);

        if (c.length) {
            let resp = {
                error: 'yes',
                name: 'Seller with same ID/TIN Exist'
            }
            return res.status(200).json(resp);
        }


        const [i] = await (await conn).query("INSERT INTO tbl_sellers (id_no, phone, first_name, last_name, about, location) VALUES (?,?,?,?,?,?)", [id_no, phone, first_name, last_name, about, location]);

        let resp = {
            error: 'no',
            id: i.insertId,
            name: first_name + ' ' + last_name
        }
        res.status(200).json(resp);
    }
    catch (err) {
        let resp = {
            error: 'yes',
            type: 'Error, try again!'
        }
        res.status(200).json(resp);
    }
};

module.exports = { purchasesHome, newPurchase, deletePurchase, editPurchase, formNewPurchase, newSeller, newType };