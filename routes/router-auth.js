const express = require('express');
const router = express.Router()
const dotenv = require('dotenv')





router.get('', (req, res) => {
    res.render('auth/login')
})


router.get('/forgot-password', (req, res) => {
    res.render('auth/forgot-password')
})


router.post('/post-login', async (req, res) => { 
    
    let username = req.body.email;
	let password = req.body.password;

    let hashedPassword = await bcrypt.hash(password, 8)

    
})



module.exports = router

