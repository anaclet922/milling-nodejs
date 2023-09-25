const express = require('express');
const bcrypt = require('bcrypt');
const routerDashboard = express.Router();
const conn = require('../database');

routerDashboard.use(express.urlencoded({ extended: true }));

routerDashboard.use(function (req, res, next) {

    if (!req.session.loggedin) {
        return res.redirect('/auth');
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


routerDashboard.get('/payments', async (req, res) => {

    let payment_modes = [];

    await conn.query("SELECT * FROM tbl_payments_methods", function (error, result) {
        if (error) throw error;

        let page_data = {
            title: "Payments",
            payment_modes: result
        };
        res.render('dashboard/payments', page_data);

    });


});



routerDashboard.get('/vehicles', async (req, res) => {

    let payment_modes = [];

    await conn.query("SELECT * FROM tbl_vehicles", function (error, result) {
        if (error) throw error;

        let page_data = {
            title: "Vehicles",
            vehicles: result
        };
        res.render('dashboard/vehicles', page_data);

    });


});


routerDashboard.post('/post-change-password', (req, res) => {

    let current_password = req.body.currentPassword;
    let new_password = req.body.newPassword;
    let confirm_new_password = req.body.confirmNewPassword;

    if (new_password != confirm_new_password) {
        req.flash('error', 'New Password must match!');
        res.redirect('/dashboard/profile');
    }

    conn.query("SELECT * FROM tbl_users WHERE email = ?", [req.session.loggedInUser.email], async function (error, user, fields) {

        if (error) throw error;
        if (user.length > 0) {

            let hash = user[0].password;

            bcrypt.compare(current_password, hash).then(async function (result) {
                if (result == true) {

                    hashedPassword = await bcrypt.hash(new_password, 8);

                    conn.query("UPDATE tbl_users SET password = ? WHERE email = ?", [hashedPassword, req.session.loggedInUser.email], function (error, result, fields) {
                        req.flash('success', 'Password updated!');
                        res.redirect('/dashboard/profile');
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




routerDashboard.post('/post-new-payment-mode', (req, res) => {

    let payment_mode = req.body.name;
    let status = req.body.status;

    conn.query("INSERT INTO tbl_payments_methods (name, status) VALUES (?,?)", [payment_mode, status], async function (error, result) {

        if (error) throw error;
        req.flash('success', 'Payment mode successfully created!');
        res.redirect('/dashboard/payments');

    });

});




routerDashboard.post('/post-edit-payment-mode', (req, res) => {

    let payment_mode = req.body.name;
    let status = req.body.status;
    let id = req.body.id;

    conn.query("UPDATE tbl_payments_methods SET name = ?, status = ? WHERE id = ?", [payment_mode, status, id], async function (error, result) {

        if (error) throw error;
        req.flash('success', 'Payment mode successfully updated!');
        res.redirect('/dashboard/payments');

    });

});

routerDashboard.post('/post-new-vehicle', (req, res) => {

    let plate_no = req.body.plate_no;
    let owner = req.body.owner;
    let type = req.body.type;
    let capacity = req.body.capacity;

    conn.query("INSERT INTO tbl_vehicles (plate_number, owner, type, capacity) VALUES (?,?,?,?)", [plate_no, owner, type, capacity], async function (error, result) {

        if (error) throw error;
        req.flash('success', 'Vehicle successfully recorded!');
        res.redirect('/dashboard/vehicles');

    });

});


routerDashboard.post('/post-edit-vehicle', (req, res) => {

    let plate_no = req.body.plate_no;
    let owner = req.body.owner;
    let type = req.body.type;
    let capacity = req.body.capacity;
    let id = req.body.id;

    conn.query("UPDATE tbl_vehicles SET plate_number = ?, owner = ?, type = ?, capacity = ? WHERE id = ?", [plate_no, owner, type, capacity, id], async function (error, result) {

        if (error) throw error;
        req.flash('success', 'Car successfully updated!');
        res.redirect('/dashboard/vehicles');

    });

});
routerDashboard.get('/update-payment-mode', (req, res) => {

    let id = req.query.id;
    let status = req.query.newstatus;

    conn.query("UPDATE tbl_payments_methods SET status= ? WHERE id = ?", [status, id], function (error, result) {
        if (error) throw error;
        req.flash('success', 'Payment mode successfully updated!');
        res.redirect('/dashboard/payments');

    });
});

routerDashboard.get('/delete-payment-mode', (req, res) => {

    let id = req.query.id;

    conn.query("DELETE FROM tbl_payments_methods WHERE id = ?", [id], function (error, result) {
        if (error) throw error;
        req.flash('success', 'Payment mode successfully deleted!');
        res.redirect('/dashboard/payments');

    });
});


routerDashboard.get('/delete-car', (req, res) => {

    let id = req.query.id;

    conn.query("DELETE FROM tbl_vehicles WHERE id = ?", [id], function (error, result) {
        if (error) throw error;
        req.flash('success', 'Car successfully deleted!');
        res.redirect('/dashboard/vehicles');

    });
});



module.exports = routerDashboard

