require('dotenv').config()

const express = require('express')
const logger = require('morgan')
const path = require('path')

const passport = require('passport')



const app = express()

//config
require('./config/hbs')



//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

const port = Number(process.env.PORT || 3000)

//routes
const routes = require('./routes/index.routes')
app.use('/', routes)


app.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
})