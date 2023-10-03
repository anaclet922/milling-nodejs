
const conn = require('../database');
var mv = require('mv');
const upload = require('../upload');



const inventoryHome = async (req, res) => {

    const [inventories] = await (await conn).query("SELECT * FROM tbl_purchases WHERE type = 'inventory' ORDER BY id DESC");
    const [users] = await (await conn).query("SELECT * FROM tbl_users ORDER BY id DESC");
    const [inventory_users] = await (await conn).query("SELECT tbl_inventory.id as inventory_id, tbl_inventory.*, tbl_users.* FROM tbl_inventory LEFT JOIN tbl_users ON tbl_inventory.user_id = tbl_users.id ORDER BY tbl_inventory.id DESC");

    let page_data = {
        title: "Inventory",
        currrentPath: "inventory",
        inventories: inventories,
        users: users,
        inventory_users: inventory_users
    };

    res.render('dashboard/inventory', page_data);
};


const postNewInventory = async (req, res) => {

    let item_name = req.body.item_name;
    let description = req.body.description;
    let type = req.body.type;
    let user_id = req.body.user_id;
    let note = req.body.note;

    const [i] = await (await conn).query("INSERT INTO tbl_inventory (item_name, description, type, user_id, Note) VALUES (?,?,?,?,?)", [item_name,description,type, user_id, note]);

    req.flash('success', 'New Inventory recorded successfully!');
    res.redirect('/dashboard/inventory');
};


module.exports = { inventoryHome, postNewInventory };