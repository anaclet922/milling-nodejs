
const conn = require('../database');
var mv = require('mv');
const upload = require('../upload');



const inventoryHome = async (req, res) => {

    const [inventories] = await (await conn).query("SELECT * FROM tbl_purchases WHERE type = 'inventory' ORDER BY id DESC");
    const [users] = await (await conn).query("SELECT * FROM tbl_workforce ORDER BY id DESC");
    const [inventory_users] = await (await conn).query("SELECT tbl_inventory.id as inventory_id, tbl_inventory.*, tbl_inventory.note as inventory_node, tbl_workforce.* FROM tbl_inventory LEFT JOIN tbl_workforce ON tbl_inventory.user_id = tbl_workforce.id ORDER BY tbl_inventory.id DESC");

    console.log(inventory_users);

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

    const [i] = await (await conn).query("INSERT INTO tbl_inventory (item_name, description, type, user_id, Note) VALUES (?,?,?,?,?)", [item_name, description, type, user_id, note]);

    req.flash('success', 'New Inventory recorded successfully!');
    res.redirect('/dashboard/inventory');
};

const deleteInventory = async (req, res) => {

    let id = req.query.id;
    const [i] = await (await conn).query("DELETE FROM tbl_inventory WHERE id = ?", [id]);

    req.flash('success', 'Inventory deleted successfully!');
    res.redirect('/dashboard/inventory');

};

const editInventory = async (req, res) => {


    let item_name = req.body.item_name;
    let description = req.body.description;
    let type = req.body.type;
    let user_id = req.body.user_id;
    let note = req.body.note;

    let inventory_id = req.body.inventory_id;

    const [i] = await (await conn).query("UPDATE tbl_inventory SET item_name = ?, description = ?, type = ?, user_id = ?, note = ? WHERE id = ?", [item_name, description, type, user_id, note, inventory_id]);

    req.flash('success', 'Inventory updated successfully!');
    res.redirect('/dashboard/inventory');

};

module.exports = { inventoryHome, postNewInventory, deleteInventory, editInventory };