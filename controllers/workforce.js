
const conn = require('../database');
var mv = require('mv');
const upload = require('../upload');



const workforceHome = async (req, res) => {

    const [departments] = await (await conn).query("SELECT tbl_departments.id as department_id, COUNT(tbl_workforce.department_id) as members, tbl_departments.title FROM tbl_departments LEFT JOIN tbl_workforce ON tbl_departments.id = tbl_workforce.department_id GROUP BY tbl_departments.id");

    const [dailyWorkforces] = await (await conn).query("SELECT tbl_workforce.id as workforce_id, tbl_workforce.*, tbl_departments.* FROM tbl_workforce LEFT JOIN tbl_departments ON tbl_workforce.department_id = tbl_departments.id WHERE tbl_workforce.type = 'DAILY'");

    const [permanetWorkforces] = await (await conn).query("SELECT tbl_workforce.id as workforce_id, tbl_workforce.*, tbl_departments.* FROM tbl_workforce LEFT JOIN tbl_departments ON tbl_workforce.department_id = tbl_departments.id WHERE tbl_workforce.type = 'PERMANENT'");

    let page_data = {
        title: "Workforce",
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
    let contract = req.files.contract[0].filename;
    let picture = req.files.picture[0].filename;
    let username = req.body.username;
    let password = req.body.password;
    let hashedPassword = await bcrypt.hash(password, 8);

    mv('./uploads/' + contract, './uploads/contracts/' + contract, { mkdirp: true }, function (err) { });
    mv('./uploads/' + picture, './uploads/pictures/' + picture, { mkdirp: true }, function (err) { });

    const [i] = await (await conn).query("INSERT INTO tbl_workforce (type, first_name, last_name, gender, date_of_birth, nid, phone, department_id, position, note, hired_date, end_date, contract, picture, username, password) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [type, first_name, last_name, gender, date_of_birth, nid, phone, department_id, position, note, hired_date, end_date, contract, picture, username, hashedPassword]);

    req.flash('success', 'New Workforce successfully created!');
    res.redirect('/dashboard/workforce');

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
    let contract = req.files.contract[0].filename;
    let picture = req.files.picture[0].filename;
    let username = req.body.username;
    let password = req.body.password;
    let hashedPassword = await bcrypt.hash(password, 8);

    mv('./uploads/' + contract, './uploads/contracts/' + contract, { mkdirp: true }, function (err) { });
    mv('./uploads/' + picture, './uploads/pictures/' + picture, { mkdirp: true }, function (err) { });

    const [i] = await (await conn).query("INSERT INTO tbl_workforce (type, first_name, last_name, gender, date_of_birth, nid, phone, department_id, position, note, hired_date, end_date, contract, picture, username, password) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [type, first_name, last_name, gender, date_of_birth, nid, phone, department_id, position, note, hired_date, end_date, contract, picture, username, hashedPassword]);

    req.flash('success', 'New Workforce successfully created!');
    res.redirect('/dashboard/workforce');

};


const postNewDepartment = async (req, res) => {

    let title = req.body.title;

    const [i] = await (await conn).query("INSERT INTO tbl_departments (title) VALUES (?)", [title]);

    req.flash('success', 'Department successfully created!');
    res.redirect('/dashboard/workforce');

};


const deleteDepartment = async (req, res) => {

    let department_id = req.query.department_id;
    console.log('department_id', department_id);
    const [d] = await (await conn).query("DELETE FROM tbl_departments WHERE id = ?", [department_id]);

    const [u] = await (await conn).query("UPDATE tbl_workforce SET department_id = NULL WHERE department_id = ?", [department_id])
    req.flash('success', 'Department successfully deleted!');
    res.redirect('/dashboard/workforce');

};


const editDepartment = async (req, res) => {

    let id = req.body.id;
    let title = req.body.title;

    const [u] = await (await conn).query("UPDATE tbl_departments SET title= ? WHERE id = ?", [title, id]);

    req.flash('success', 'Department successfully updated!');
    res.redirect('/dashboard/workforce');

};




module.exports = { workforceHome, postDailyWorkforce, postPermanentWorkforce, postNewDepartment, deleteDepartment, editDepartment };