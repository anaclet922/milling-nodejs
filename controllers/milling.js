
const conn = require('../database');
var mv = require('mv');
const upload = require('../upload');



const millingHome = async (req, res) => {

    let my_id = req.session.loggedInUser.id;

    const [users] = await (await conn).query("SELECT * FROM tbl_users WHERE id <> ? AND active = 'Y'", [my_id]);

    let page_data = {
        title: "Milling",
        currrentPath: "milling",
        users: users
    };

    res.render('dashboard/milling', page_data);
};

module.exports = { millingHome };