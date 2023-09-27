
const conn = require('../database');
var mv = require('mv');
const upload = require('../upload');



const purchasesHome = async (req, res) => {

    const [purchases] = await (await conn).query("SELECT * FROM tbl_purchases ORDER BY id DESC");

    let page_data = {
        title: "Purchase",
        currrentPath: "purchase",
        purchases: purchases
    };

    res.render('dashboard/purchase', page_data);
};


const newPurchase = async (req, res) => {

    let type = req.body.type;

    if(type == ''){
        req.flash('error', 'Choose type of purchase!');
        return res.redirect('/dashboard/purchases');
    }
console.log(type);
    let item_name = req.body.item_name;
    let description = req.body.description;
    let note = req.body.note;
    let unit_price = req.body.unit_price;
    let quantity = req.body.quantity;
    let total_price = req.body.total_price;
    let	transport_cost = req.body.transport_cost;
    let place_of_purchase = req.body.place_of_purchase;
    let	seller = req.body.seller;
   
    const [u] = await (await conn).query("INSERT INTO tbl_purchases (type, item_name, description, note, unit_price, quantity, total_price, transport_cost, place_of_purchase, seller) VALUES (?,?,?,?,?,?,?,?,?,?)", [type, item_name, description, note, unit_price, quantity, total_price, transport_cost, place_of_purchase, seller]);

    if(type == 'maize'){
        const [stock] = await (await conn).query("SELECT * FROM tbl_maize_stock");
        if(stock.length){
            const [ii] = await (await conn).query("UPDATE tbl_maize_stock SET quantity = quantity + ?", [quantity]);
        }else{
            const [ii] = await (await conn).query("INSERT INTO tbl_maize_stock (quantity) VALUES (?)", [quantity]);
        }
    }
        
    req.flash('success', 'Puchase successfully recorded!');
    res.redirect('/dashboard/purchase');

};


module.exports = { purchasesHome, newPurchase };