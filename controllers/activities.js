
const conn = require('../database');
var mv = require('mv');
const upload = require('../upload');



const activitiesHome = async (req, res) => {

    const [workforces] = await (await conn).query("SELECT * FROM tbl_workforce");
    const [activities] = await (await conn).query("SELECT tbl_activities.id as activity_id, tbl_activities.created_at as  activity_created_at, tbl_activities.*, tbl_workforce.* FROM tbl_activities LEFT JOIN tbl_workforce ON tbl_workforce.id = tbl_activities.assignee ORDER BY tbl_activities.id DESC");
    
    

    let page_data = {
        title: "Activities & Remiders",
        currrentPath: "activities",
        workforces: workforces,
        activities: activities
    };
    res.render('dashboard/activities', page_data);
};

const postNewReminder = async (req, res) => {

  
    let  title = req.body.title;
    let details = req.body.details ? req.body.details : null;
    let reminder_time = req.body.reminder_time;
    let color = req.body.color ? req.body.color : null;
    let priority = req.body.priority;
    let assignee = req.body.assignee ? req.body.assignee : null;

    const [i] = await (await conn).query("INSERT INTO tbl_activities (details, title, reminder_time, priority, assignee, color) VALUES (?,?,?,?,?,?)", [details, title, reminder_time, priority,assignee,color]);

    req.flash('success', 'Activity recorded successfully!');
    res.redirect('/dashboard/activities');
};

const deleteActivity = async (req, res) => {

    let id = req.query.id;
    const [i] = await (await conn).query("DELETE FROM tbl_activities WHERE id = ? ", [id]);

    req.flash('success', 'Activity deleted successfully!');
    res.redirect('/dashboard/activities');

};


const editActivity = async (req, res) => {

    let  title = req.body.title;
    let details = req.body.details ? req.body.details : null;
    let reminder_time = req.body.reminder_time;
    let color = req.body.color ? req.body.color : null;
    let priority = req.body.priority;
    let assignee = req.body.assignee ? req.body.assignee : null;

    let id = req.body.activity_id;

    const [i] = await (await conn).query("UPDATE tbl_activities SET details = ?, title = ?, reminder_time = ?, priority = ?, assignee = ?, color = ? WHERE id = ?", [details, title, reminder_time, priority,assignee,color, id]);

    req.flash('success', 'Activity updated successfully!');
    res.redirect('/dashboard/activities');

};
module.exports = { activitiesHome, postNewReminder, deleteActivity, editActivity };