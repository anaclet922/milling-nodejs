const express = require("express")
const session = require('express-session');
const path = require('path');
const flash = require('connect-flash');
const conn = require('./database');

const app = express()

app.use(express.static(path.join(__dirname, 'public')))

app.use(session({
	secret: 'This a  secret for session encoding',
	resave: true,
	saveUninitialized: true,
    cookie: {
        sameSite: 'strict'
    }
}));

app.set('view engine', 'ejs') //set views engine
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //allow form submit and get values
app.use(flash());

app.use(async function(req,res,next){

    res.locals.session = req.session;
    var configs = [];
    conn.query("SELECT * FROM tbl_configs", async function (error, config, fields) {
        if (error) throw error;

        for(var i in config){
            configs[config[i].config_key] = config[i].value;
        }
        res.locals.configs = configs;
        res.locals.message = req.flash();
        next(); 
    });
    

});


const authRouter = require('./routes/router-auth');
app.use('/auth', authRouter);

const dashboardRouter = require('./routes/router-dashboard');
app.use('/dashboard', dashboardRouter);

app.get('/', (req, res) =>{
    if (req.session.loggedin) {
        res.redirect('/dashboard');
    }else{
        req.session.destroy();
        res.redirect('/auth');
    }
});

app.listen(3000, () => console.log('App is listening via post 3000'))