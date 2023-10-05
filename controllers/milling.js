
const conn = require('../database');
var mv = require('mv');
const upload = require('../upload');



const millingHome = async (req, res) => {

    // let my_id = req.session.loggedInUser.id;

    const [users] = await (await conn).query("SELECT * FROM tbl_users WHERE active = 'Y'");

    let page_data = {
        title: "Milling",
        currrentPath: "milling",
        users: users
    };

    res.render('dashboard/milling', page_data);
};

const postNewMilling = async (req, res) => {
    
    let milled_at = req.body.milled_at;
    let technician_id = req.body.technician_id;
    let input_kg = req.body.input_kg;
    let output_kg = req.body.output_kg;

    

};


module.exports = { millingHome, postNewMilling };