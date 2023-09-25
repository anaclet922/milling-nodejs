const express = require('express');
const router = express.Router()
const bcrypt = require('bcrypt');

const conn = require('../database');

router.get('', (req, res) => {
    res.render('auth/login', { message: req.flash('error') });
})


router.get('/forgot-password', (req, res) => {
    res.render('auth/forgot-password')
})


router.post('/post-login', async (req, res) => {

    let username = req.body.email;
    let password = req.body.password;
    // let hashedPassword = await bcrypt.hash(password, 8); // this 8 is hash salt

    const [user] = await (await conn).query("SELECT * FROM tbl_users WHERE email = ?", [username]);
    console.log(user);
    console.log(user.length);

    if (user.length > 0) {

        let hash = user[0].password;

        bcrypt.compare(password, hash).then(function (result) {
            if (result == true) {
                console.log('Logged in!');
                req.session.loggedin = true;
                req.session.loggedInUser = user[0];
                res.redirect('/');
            } else {
                req.flash('error', 'Incorrect credentials provided!');
                res.redirect('/auth')
            }
        });

    } else {
        req.flash('error', 'Incorrect credentials provided!')
        res.redirect('/auth')
    }


})


router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
})

module.exports = router

