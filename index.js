require('dotenv').config()

const express = require('express');

const app = express()

const expressLayouts=require('express-ejs-layouts')

var port=3000


 app.use(express.urlencoded({extended:true}))//passing data in url(hidden)
 app.use(express.static('public'))//path to the static files
 app.use(expressLayouts)//for using templates such as header ,footer ,body

 // set templates and view engine
 //we are using ejs
app.set ('layout','./layouts/main')//create layouts/main inside views
app.set('view engine','ejs')

const routes = require('./routes/studentRoutes')
app.use('/', routes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})