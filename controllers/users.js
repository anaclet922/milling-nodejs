
const conn = require('../database');
var mv = require('mv');
const bcrypt = require('bcrypt');
const upload = require('../upload');



const usersHome = async (req, res) => {

    const [users] = await (await conn).query("SELECT * FROM tbl_users");
    const [permanetWorkforces] = await (await conn).query("SELECT * FROM tbl_workforce WHERE type = 'PERMANENT'");


    let page_data = {
        title: "Permassions",
        currrentPath: "users",
        users: users,
        permanetWorkforces: permanetWorkforces
    };

    res.render('dashboard/users', page_data);
};

const activateUser = async (req, res) => {
    let id = req.query.id;
    const [u] = await (await conn).query("UPDATE tbl_users SET active = ? WHERE id = ?", ['Y', id]);
    req.flash('success', 'User Successfully updated!');
    res.redirect('/dashboard/users');
};

const desactivateUser = async (req, res) => {
    let id = req.query.id;
    const [u] = await (await conn).query("UPDATE tbl_users SET active = ? WHERE id = ?", ['N', id]);
    req.flash('success', 'User Successfully updated!');
    res.redirect('/dashboard/users');
};


const newAdmin = async (req, res) => {

    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let email = req.body.email; 
    let username = req.body.username;
    let password = req.body.password;
    let hashedPassword = await bcrypt.hash(password, 8);

    const [user] = await (await conn).query("SELECT * FROM tbl_users WHERE email = ?", [email]);

    if (user.length) {
        req.flash('error', 'Admin with same email exist!');
        return res.redirect('/dashboard/users');
    }

    const [user2] = await (await conn).query("SELECT * FROM tbl_users WHERE username = ?", [username]);

    if (user2.length) {
        req.flash('error', 'Admin with same username exist!');
        return res.redirect('/dashboard/users');
    }

    const [u] = await (await conn).query("INSERT INTO tbl_users (first_name, last_name, username, email, password) VALUES (?,?,?,?,?)", [first_name, last_name, username, email, hashedPassword]);
    req.flash('success', 'Admin Successfully created!');
    res.redirect('/dashboard/users');

};



module.exports = { usersHome, desactivateUser, activateUser, newAdmin };