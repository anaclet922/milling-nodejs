
const conn = require('../database');
var mv = require('mv');
const upload = require('../upload');



const purchasesHome = async (req, res) => {

    let page_data = {
        title: "Purchase",
        currrentPath: "purchase"
    };

    res.render('dashboard/purchase', page_data);
};


const newPurchase = async (req, res) => {

    let type = req.body.type;

    if(type == ''){
        req.flash('error', 'Choose type of purchase!');
        return res.redirect('/dashboard/purchases');
    }

    let item_name = req.body.item_name;
    let description = req.body.description;
    let note = req.body.note;
    let unit_price = req.body.unit_price;
    let quantity = req.body.quantity;
    let total_price = req.body.total_price;
    let	transport_cost = req.body.transport_cost;
    let place_of_purchase = req.body.place_of_purchase;
    let	seller = req.body.seller;
   
    const [u] = await (await conn).query("INSERT INTO tbl_purchases (type, item_name, description, note, unit_price, quantity, total_price, transport_cost, place_of_purchase, seller) VALUES (?,?,?,?,?,?,?,?,?,?)", [type, item_name, description, note, unit_price, quantity, total_price, transport_cost, place_of_purchase]);

    if(type == 'maize'){
        const [ii] = await (await conn).query("UPDATE tbl_maize_stock SET quantity = quantity + ?", [quantity]);
    }
        
    req.flash('success', 'Admin Successfully created!');
    res.redirect('/dashboard/users');

};


module.exports = { purchasesHome, newPurchase };