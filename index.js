require('dotenv').config()

const express = require('express');
const morgan = require('morgan');
const expressLayouts=require('express-ejs-layouts')
const session = require('express-session')
const cookieParser =  require('cookie-parser')

const routes = require('./routes/studentRoutes');
const res = require('express/lib/response');

const app = express()
var port=3001
var secret = process.env.SECRET

// middlewares 
app.use(morgan('tiny'));
app.use(morgan(':method :host :status :param[id] :res[content-length] - :response-time ms'));
app.use(express.urlencoded({extended:true}))//passing data in url(hidden)
app.use(express.static('public'))//path to the static files
app.use(expressLayouts)//for using templates such as header ,footer ,body
app.use(cookieParser())
app.use('/', routes)

app.use(
  session({
    kay: 'user_sid',
    secret: secret,
    resave: false,
    saveUninitialized: false,
    cookie:{
      expires: 1000 * 60 * 60 * 24
    },

  })
  
)

app.use((req, res, next)=>{
  if(req.cookies.user_sid && !req.session.user){
    res.clearCookie('user_sid')
  }
  next()
})

morgan.token('host', function(req, res) {
  return req.hostname;
});
morgan.token('param', function(req, res, param) {
   // return req.params[param];
});
 
 // set templates and view engine
 //we are using ejs
app.set ('layout','./layouts/main')//create layouts/main inside views
app.set('view engine','ejs')





app.listen(port, () => {
  console.log(`Demo app listening on port ${port}`)
})