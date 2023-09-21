const express = require('express');
const bcrypt = require('bcrypt');
const routerDashboard = express.Router();
const conn = require('../database');


routerDashboard.use(express.urlencoded({ extended: true }));


routerDashboard.use(function(req,res,next){

    if (!req.session.loggedin) {
        res.redirect('/auth');
    }

    next(); 

});

routerDashboard.get('', (req, res) => {
    res.locals.title = "Home";
    res.render('dashboard/home');
})

routerDashboard.get('/activities', (req, res) => {
    let page_data = {
        title: "Activities & Remiders"
    };
    res.render('dashboard/activities', page_data);
})


routerDashboard.get('/reports', (req, res) => {
    let page_data = {
        title: "Reports"
    };
    res.render('dashboard/reports', page_data);
})

routerDashboard.get('/sales', (req, res) => {
    let page_data = {
        title: "Sales"
    };
    res.render('dashboard/sales', page_data);
});

routerDashboard.get('/workforce', (req, res) => {
    let page_data = {
        title: "Workforce"
    };
    res.render('dashboard/workforce', page_data);
});



routerDashboard.get('/profile', (req, res) => {
    let page_data = {
        title: "Workforce",
        message: req.flash('error')
    };
    res.render('dashboard/profile', page_data);
});


routerDashboard.post('/post-change-password',  (req, res) => {

    let current_password = req.params.currentPassword;
    let new_password = req.params.newPassword;
    let confirm_new_password = req.params.confirmNewPassword;

    if(new_password != confirm_new_password){
        req.flash('error', 'New Password must match!');
        res.redirect('/dashboard/profile');
    }

    console.log(new_password != confirm_new_password);

    conn.query("SELECT * FROM tbl_users WHERE email = ?", [req.session.loggedInUser.email], async function (error, user, fields) {
        
        if (error) throw error;
        if (user.length > 0) {

            let hash = user[0].password;

            bcrypt.compare(current_password, hash).then(async function (result) {
                if (result == true) {
                    
                    hashedPassword = await bcrypt.hash(new_password, 8);
                    
                    conn.query("UPDATE tbl_users SET password = ? WHERE email = ?", [hashedPassword, req.session.loggedInUser.email], function(error, result, fields){
                        console.log(result);
                        res.redirect('dashboard/profile');
                    });
                    
                } else {
                    req.flash('error', 'Incorrect password provided!');
                    res.redirect('/dashboard/profile');
                }
            });

        } else {
            req.flash('error', 'Incorrect credentials provided!')
            res.redirect('dashboard/profile')
        }
    });

});




module.exports = routerDashboard

