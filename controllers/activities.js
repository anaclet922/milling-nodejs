
const conn = require('../database');
var mv = require('mv');
const upload = require('../upload');



const activitiesHome = async (req, res) => {

    let page_data = {
        title: "Activities & Remiders",
        currrentPath: "activities"
    };
    res.render('dashboard/activities', page_data);
};



module.exports = { activitiesHome };