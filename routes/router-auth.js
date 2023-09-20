const express = require('express');
const router = express.Router()
const bcrypt = require('bcrypt');

const conn = require('../database');

router.get('', (req, res) => {
    res.render('auth/login', )
})


router.get('/forgot-password', (req, res) => {
    res.render('auth/forgot-password')
})


router.post('/post-login', async (req, res) => {

    let username = req.body.email;
    let password = req.body.password;
    // let hashedPassword = await bcrypt.hash(password, 8); // this 8 is hash salt

    conn.query("SELECT * FROM tbl_users WHERE email = ?", [username], async function (error, user, fields) {
        if (error) throw error;
        if (user.length > 0) {
            let hash = user[0].password;
            // Load hash from your password DB.
            bcrypt.compare(password, hash).then(function (result) {
                if (result == true) {
                    console.log('Logged in!');
                    request.session.loggedin = true;
                    request.session.username = user[0];
                    res.redirect('/');
                } else {
                    req.flash('error', 'Incorrect credentials provided!');
                    console.log('invalid logins');
                    res.redirect('/auth')
                }
            });
        } else {
            req.flash('error', 'Incorrect credentials provided!')
            res.redirect('/auth')
        }
        res.end();
    });

})


router.get('/logout', (req, res) => {
    req.session.destroy()
})

module.exports = router

