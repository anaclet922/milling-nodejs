const express = require("express")
const session = require('express-session');
const path = require('path');
const flash = require('connect-flash');

const app = express()

app.use(express.static(path.join(__dirname, 'public')))

app.use(session({
	secret: 'This a  secret for session encoding',
	resave: true,
	saveUninitialized: true
}));

app.set('view engine', 'ejs') //set views engine
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //allow form submit and get values
app.use(flash());

const authRouter = require('./routes/router-auth');

app.use('/auth', authRouter)


app.get('/', (req, res) =>{
    if (req.session.loggedin) {
        req.redirect('/home');
    }else{
        req.session.destroy();
        res.redirect('/auth');
    }
});

app.listen(3000, () => console.log('App is listening via post 3000'))