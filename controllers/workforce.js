
const conn = require('../database');
var mv = require('mv');
const bcrypt = require('bcrypt');
const upload = require('../upload');



const workforceHome = async (req, res) => {

    const [departments] = await (await conn).query("SELECT tbl_departments.id as department_id, COUNT(tbl_workforce.department_id) as members, tbl_departments.title FROM tbl_departments LEFT JOIN tbl_workforce ON tbl_departments.id = tbl_workforce.department_id GROUP BY tbl_departments.id");

    const [dailyWorkforces] = await (await conn).query("SELECT tbl_workforce.id as workforce_id, tbl_workforce.*, tbl_departments.* FROM tbl_workforce LEFT JOIN tbl_departments ON tbl_workforce.department_id = tbl_departments.id WHERE tbl_workforce.type = 'DAILY'");

    const [permanetWorkforces] = await (await conn).query("SELECT tbl_workforce.id as workforce_id, tbl_workforce.*, tbl_departments.* FROM tbl_workforce LEFT JOIN tbl_departments ON tbl_workforce.department_id = tbl_departments.id WHERE tbl_workforce.type = 'PERMANENT'");


    let page_data = {
        title: "Workforce",
        currrentPath: "workforce",
        departments: departments,
        dailyWorkforces: dailyWorkforces,
        permanetWorkforces: permanetWorkforces
    };

    res.render('dashboard/workforce', page_data);
};


const postDailyWorkforce = async (req, res) => {

    let type = 'DAILY';
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let gender = req.body.gender;
    let date_of_birth = req.body.date_of_birth;
    let nid = req.body.nid;
    let phone = req.body.phone;
    let department_id = req.body.department_id;
    let position = req.body.position;
    let note = req.body.note;
    let hired_date = req.body.hired_date;
    let end_date = req.body.end_date;
    let contract = '';
    let picture = '';
    let username = req.body.username;
    let password = req.body.password;
    let hashedPassword = await bcrypt.hash(password, 8);

    const [nid_check] = await (await conn).query("SELECT * FROM tbl_workforce WHERE nid = ?", [nid]);
    if (nid_check.length) {
        req.flash('error', 'Workforce with same NID exists!');
        return res.redirect('/dashboard/workforce?tab=dailyw');
    }
    const [username_check] = await (await conn).query("SELECT * FROM tbl_workforce WHERE username = ?", [username]);
    if (username_check.length) {
        req.flash('error', 'Workforce with same username exists!');
        return res.redirect('/dashboard/workforce?tab=dailyw');
    }

    // mv('./uploads/' + contract, './uploads/contracts/' + contract, { mkdirp: true }, function (err) { });
    // mv('./uploads/' + picture, './uploads/pictures/' + picture, { mkdirp: true }, function (err) { });
    if (req.files.contract !== undefined) {
        contract = req.files.contract[0].filename;
        mv('./uploads/' + contract, './uploads/contracts/' + contract, { mkdirp: true }, function (err) { });
    }

    if (req.files.picture !== undefined) {
        picture = req.files.picture[0].filename;
        mv('./uploads/' + picture, './uploads/pictures/' + picture, { mkdirp: true }, function (err) { });
    }

    const [i] = await (await conn).query("INSERT INTO tbl_workforce (type, first_name, last_name, gender, date_of_birth, nid, phone, department_id, position, note, hired_date, end_date, contract, picture, username, password) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [type, first_name, last_name, gender, date_of_birth, nid, phone, department_id, position, note, hired_date, end_date, contract, picture, username, hashedPassword]);

    req.flash('success', 'New Workforce successfully created!');
    res.redirect('/dashboard/workforce?tab=dailyw');

};


const postPermanentWorkforce = async (req, res) => {

    let type = 'PERMANENT';
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let gender = req.body.gender;
    let date_of_birth = req.body.date_of_birth;
    let nid = req.body.nid;
    let phone = req.body.phone;
    let department_id = req.body.department_id;
    let position = req.body.position;
    let note = req.body.note;
    let hired_date = req.body.hired_date;
    let end_date = req.body.end_date;
    let contract = '';
    let picture = '';
    let username = req.body.username;
    let password = req.body.password;
    let hashedPassword = await bcrypt.hash(password, 8);

    const [nid_check] = await (await conn).query("SELECT * FROM tbl_workforce WHERE nid = ?", [nid]);
    if (nid_check.length) {
        req.flash('error', 'Workforce with same NID exists!');
        return res.redirect('/dashboard/workforce?tab=permanet');
    }
    const [username_check] = await (await conn).query("SELECT * FROM tbl_workforce WHERE username = ?", [username]);
    if (username_check.length) {
        req.flash('error', 'Workforce with same username exists!');
        return res.redirect('/dashboard/workforce?tab=permanet');
    }

    // mv('./uploads/' + contract, './uploads/contracts/' + contract, { mkdirp: true }, function (err) { });
    // mv('./uploads/' + picture, './uploads/pictures/' + picture, { mkdirp: true }, function (err) { });
    if (req.files.contract !== undefined) {
        contract = req.files.contract[0].filename;
        mv('./uploads/' + contract, './uploads/contracts/' + contract, { mkdirp: true }, function (err) { });
    }

    if (req.files.picture !== undefined) {
        picture = req.files.picture[0].filename;
        mv('./uploads/' + picture, './uploads/pictures/' + picture, { mkdirp: true }, function (err) { });
    }

    const [i] = await (await conn).query("INSERT INTO tbl_workforce (type, first_name, last_name, gender, date_of_birth, nid, phone, department_id, position, note, hired_date, end_date, contract, picture, username, password) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [type, first_name, last_name, gender, date_of_birth, nid, phone, department_id, position, note, hired_date, end_date, contract, picture, username, hashedPassword]);

    req.flash('success', 'New Workforce successfully created!');
    res.redirect('/dashboard/workforce?tab=permanet');

};


const postNewDepartment = async (req, res) => {

    let title = req.body.title;

    const [title_check] = await (await conn).query("SELECT * FROM tbl_departments WHERE title = ?", [title]);

    if (title_check.length) {
        req.flash('error', 'Department of same name exists!');
        return res.redirect('/dashboard/workforce');
    }

    const [i] = await (await conn).query("INSERT INTO tbl_departments (title) VALUES (?)", [title]);

    req.flash('success', 'Department successfully created!');
    res.redirect('/dashboard/workforce?tab=department');

};


const deleteDepartment = async (req, res) => {

    let department_id = req.query.department_id;
    console.log(req.query);
    const [d] = await (await conn).query("DELETE FROM tbl_departments WHERE id = ?", [department_id]);

    const [u] = await (await conn).query("UPDATE tbl_workforce SET department_id = NULL WHERE department_id = ?", [department_id])
    req.flash('success', 'Department successfully deleted!');
    res.redirect('/dashboard/workforce?tab=department');

};


const editDepartment = async (req, res) => {

    let id = req.body.id;
    let title = req.body.title;

    const [u] = await (await conn).query("UPDATE tbl_departments SET title= ? WHERE id = ?", [title, id]);

    req.flash('success', 'Department successfully updated!');
    res.redirect('/dashboard/workforce?tab=department');

};


const deleteWorkforce = async (req, res) => {
    let id = req.query.employee_id;
    const [u] = await (await conn).query("DELETE FROM tbl_workforce WHERE id = ?", [id]);
    req.flash('success', 'Employee successfully deleted!');
    res.redirect('/dashboard/workforce');
};

const editDailyWorkforce = async (req, res) => {

    let type = 'DAILY';
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let gender = req.body.gender;
    let date_of_birth = req.body.date_of_birth;
    let nid = req.body.nid;
    let phone = req.body.phone;
    let department_id = req.body.department_id;
    let position = req.body.position;
    let note = req.body.note;
    let hired_date = req.body.hired_date;
    let end_date = req.body.end_date;
    let contract = '';
    let picture = '';
    let username = req.body.username;
    let password = req.body.password;
    let hashedPassword = '';

    let workforce_id = req.body.workforce_id;

    const [workforce] = await (await conn).query("SELECT * FROM tbl_workforce WHERE id = ?", [workforce_id]);


    console.log(req.files);

    if (req.files.contract !== undefined) {
        contract = req.files.contract[0].filename;
        mv('./uploads/' + contract, './uploads/contracts/' + contract, { mkdirp: true }, function (err) { });
    } else {
        contract = workforce[0].contract;
    }

    if (req.files.picture !== undefined) {
        picture = req.files.picture[0].filename;
        mv('./uploads/' + picture, './uploads/pictures/' + picture, { mkdirp: true }, function (err) { });
    } else {
        picture = workforce[0].picture;
    }

    if (req.body.password != '') {
        hashedPassword = await bcrypt.hash(password, 8);
    } else {
        hashedPassword = workforce[0].password;
    }


    const [nid_check] = await (await conn).query("SELECT * FROM tbl_workforce WHERE nid = ? AND id != ?", [nid, workforce_id]);
    if (nid_check.length) {
        req.flash('error', 'Workforce with same NID exists!');
        return res.redirect('/dashboard/workforce?tab=dailyw');
    }
    const [username_check] = await (await conn).query("SELECT * FROM tbl_workforce WHERE username = ? AND id != ?", [username, workforce_id]);
    if (username_check.length) {
        req.flash('error', 'Workforce with same username exists!');
        return res.redirect('/dashboard/workforce?tab=dailyw');
    }


    console.log('picture: ');
    console.log(picture);

    const [i] = await (await conn).query("UPDATE tbl_workforce SET type = ?, first_name = ?, last_name = ? , gender = ?, date_of_birth = ? , nid = ?, phone = ? , department_id = ? , position = ? , note = ?, hired_date = ?, end_date = ?, contract = ? , picture = ?, username = ?, password = ? WHERE id = ?", [type, first_name, last_name, gender, date_of_birth, nid, phone, department_id, position, note, hired_date, end_date, contract, picture, username, hashedPassword, workforce_id]);

    req.flash('success', 'Workforce successfully updated!');
    res.redirect('/dashboard/workforce?tab=dailyw');

};

const editPermanentWorkforce = async (req, res) => {


    let type = 'PERMANENT';
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let gender = req.body.gender;
    let date_of_birth = req.body.date_of_birth;
    let nid = req.body.nid;
    let phone = req.body.phone;
    let department_id = req.body.department_id;
    let position = req.body.position;
    let note = req.body.note;
    let hired_date = req.body.hired_date;
    let end_date = req.body.end_date;
    let contract = '';
    let picture = '';
    let username = req.body.username;
    let password = req.body.password;
    let hashedPassword = '';

    let workforce_id = req.body.workforce_id;

    const [workforce] = await (await conn).query("SELECT * FROM tbl_workforce WHERE id = ?", [workforce_id]);

    if (req.files.contract !== undefined) {
        contract = req.files.contract[0].filename;
        mv('./uploads/' + contract, './uploads/contracts/' + contract, { mkdirp: true }, function (err) { });
    } else {
        contract = workforce[0].contract;
    }

    if (req.files.picture !== undefined) {
        picture = req.files.picture[0].filename;
        mv('./uploads/' + picture, './uploads/pictures/' + picture, { mkdirp: true }, function (err) { });
    } else {
        picture = workforce[0].picture;
    }

    if (req.body.password != '') {
        hashedPassword = await bcrypt.hash(password, 8);
    } else {
        hashedPassword = workforce[0].password;
    }

    const [nid_check] = await (await conn).query("SELECT * FROM tbl_workforce WHERE nid = ? AND id != ?", [nid, workforce_id]);
    if (nid_check.length) {
        req.flash('error', 'Workforce with same NID exists!');
        return res.redirect('/dashboard/workforce?tab=permanet');
    }
    const [username_check] = await (await conn).query("SELECT * FROM tbl_workforce WHERE username = ? AND id != ?", [username, workforce_id]);
    if (username_check.length) {
        req.flash('error', 'Workforce with same username exists!');
        return res.redirect('/dashboard/workforce?tab=permanet');
    }

    const [i] = await (await conn).query("UPDATE tbl_workforce SET type = ?, first_name = ?, last_name = ? , gender = ?, date_of_birth = ? , nid = ?, phone = ? , department_id = ? , position = ? , note = ?, hired_date = ?, end_date = ?, contract = ? , picture = ?, username = ?, password = ? WHERE id = ?", [type, first_name, last_name, gender, date_of_birth, nid, phone, department_id, position, note, hired_date, end_date, contract, picture, username, hashedPassword, workforce_id]);

    req.flash('success', 'Workforce successfully updated!');
    res.redirect('/dashboard/workforce?tab=permanet');

};

module.exports = { workforceHome, postDailyWorkforce, postPermanentWorkforce, postNewDepartment, deleteDepartment, editDepartment, deleteWorkforce, editPermanentWorkforce, editDailyWorkforce };