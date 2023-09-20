const express = require("express")
const path = require('path')



const app = express()

app.use(express.static(path.join(__dirname, 'public')))


app.set('view engine', 'ejs')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authRouter = require('./routes/router-auth')
app.use('/auth', authRouter)

app.listen(3000, () => console.log('App is listening via post 3000'))