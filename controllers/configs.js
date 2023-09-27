
const conn = require('../database');
var mv = require('mv');
const upload = require('../upload');



const configsHome = async (req, res) => {

    let page_data = {
        title: "Configs",
        currrentPath: "configs"
    };

    res.render('dashboard/configs', page_data);
};


const postSystemName = async (req, res) => {

    let new_name = req.body.name;
    const [i] = await (await conn).query("UPDATE tbl_configs SET value = ? WHERE config_key = 'system_name'", [new_name]);
    req.flash('success', 'Successfully updated!');
    res.redirect('/dashboard/configs');
};

const postcopyrighttext = async (req, res) => {

    let new_name = req.body.copyright_text;
    const [i] = await (await conn).query("UPDATE tbl_configs SET value = ? WHERE config_key = 'copyright_text'", [new_name]);
    req.flash('success', 'Successfully updated!');
    res.redirect('/dashboard/configs');

};


const postNewLogo = async (req, res) => {

    let logo = req.files.file[0].filename;
    mv('./uploads/' + logo, './uploads/system/' + logo, { mkdirp: true }, function (err) { });
    const [i] = await (await conn).query("UPDATE tbl_configs SET value = ? WHERE config_key = 'logo'", [logo]);
    req.flash('success', 'Successfully updated!');
    res.redirect('/dashboard/configs');

};



const postNewFavicon = async (req, res) => {

    let logo = req.files.file[0].filename;
    mv('./uploads/' + logo, './uploads/system/' + logo, { mkdirp: true }, function (err) { });
    const [i] = await (await conn).query("UPDATE tbl_configs SET value = ? WHERE config_key = 'favicon'", [logo]);
    req.flash('success', 'Successfully updated!');
    res.redirect('/dashboard/configs');

};



module.exports = { configsHome, postSystemName, postcopyrighttext, postNewLogo, postNewFavicon };