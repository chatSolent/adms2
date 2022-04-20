require('dotenv').config()

const express = require('express');

const app = express()
const morgan = require('morgan');
app.use(morgan('tiny'));



const expressLayouts=require('express-ejs-layouts')

var port=3001


morgan.token('host', function(req, res) {
  return req.hostname;
});
app.use(morgan(':method :host :status :param[id] :res[content-length] - :response-time ms'));

morgan.token('param', function(req, res, param) {
   // return req.params[param];
});
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
  console.log(`Demo app listening on port ${port}`)
})