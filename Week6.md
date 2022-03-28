## MVC Stack 
* Add folllowing directories
    * public 
    * models
    * controllers
    * views
    * routes
* your project folder will look like this 

## Required Packages 

### install the following packeges 

```shell
npm install express express-ejs-layouts express-fileupload express-session mongodb mongoose ejs dotenv cookie-parser connect-flash

```
* Create a file inside modles name it as database.js got to your index.js and cut the following code and paste it into the database.js and save the file

```js
// Database connection
mongoose.connect(process.env.DATABASE_URI,{
    useUnifiedTopology:true,
    useNewUrlParser:true
  })
  .then(() =>{console.log('database connected')})
  .catch ((err)=>{
    console.log(`database not connected ->${err.message}`)
  })
```
* Create a file inside modles name it as studentModel.js copy the following code from index.js 

```js
//Schema 
const mongoose = require('mongoose')// additional line to import the mongoose
const studentSchema = new Schema({
    name:String,
    age:Number,
    address:String
   });

 module.exports=mongoose.model('Student', studentSchema);// make this module importable in other modules  
```
* add the following line into the database.js 

 ```js
    require('./studentModel') 
 ```

* go to your controllers folder and create a file name with studentController.js and add the following code 

```js 
require ('../models/database')
const Student=require('../models/studentModel')

exports.HomePage=(req, res)=>{
    res.render('index');
```

go to your routes folder and create a file name with studentRoutes.js and add the following code

```js

const express = require('express');
const router=express.Router()

const studentController=require('../controllers/studentController')

router.get('/',studentController.HomePage);

module.exports=router

```

* Add the following to the index.js, 
* Your index.js file will look like this 

```js
require('dotenv').config()
const express = require('express');
const app = express()
const expressLayouts=require('express-ejs-layouts')
var port=3000

 app.use(express.urlencoded({extended:true}))//passing data in url(hidden)
 app.use(express.static('public'))//path to the static files
 app.use(expressLayouts)//for using templates such as header ,footer ,body

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

```
## Set tamplate and view engines 
* add the following to the index.js
```js
app.set ('layout','./layouts/main')//create layouts/main inside views
app.set('view engine','ejs')

```

* go to the views and create a folder called layouts inside the layouts folder create a file called main.ejs

* add this to the main.ejs (shift ! and tab)

```html

<main>
  <%- body -%>
</main>
```
* go to views and create index.ejs,
test this code 
```html
<h1>hello from ejs world</h1>

```

* create following files inside ***views directory*** 
    * about.ejs
    * create.ejs
* If you want to use bootstrap go to bootstrap webside and add ***CSS*** and ***bunddleJS***
[Bootstrap](https://getbootstrap.com/)

* Add bootstrap css and js in ***views/layouts/main.ejs*** file
your file should look like this.
```html
<!-- FILE: views/layouts/main.ejs -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css" integrity="sha384-zCbKRCUGaJDkqS1kPbPd7TveP5iyJE0EjAuZQTgFLD2ylzuqKfdKlfG/eSrtxUkn" crossorigin="anonymous">
    <title>Document</title>
</head>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="/student">Students</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <a class="nav-link active" href="/">Home <span class="sr-only">(current)</span></a>
        <a class="nav-link" href="/create">Create</a>
        <a class="nav-link" href="/about">About us</a>
        
      </div>
    </div>
  </nav>

<body>
    <div class="container">
    <main>
        <%- body -%>

    </main>
</div>
 
    <script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-fQybjgWLrvvRgtW6bFlB7jaZrFsaBXjsOMm/tB9LTS58ONXgqbR9W8oWht/amnpF" crossorigin="anonymous"></script>
</body>
</html>
```

## Process of creating mvc page
### create view (about.ejs)
```html
<!-- File: views/about.ejs -->
    <h1>About Us</h1>
    <p> This page will display information about us</p>
```
### add route  
    ```js
    // file: routers/studentRoutes.js

    // it will creat route like localhost:3000/about
    router.get('/about', studentController.AboutPage);

    ```
### create controller
```js
// File: controllers/studentController.js
exports.AboutPage=(req, res)=>{
    res.render('about');
}
```
## Add Student (create page)
* open create.ejs and add following code
```html
<h2>Add new Student</h2>
<form method="POST" action="create">
    <div class="form-group">
        <label for="name">Studen Name</label>
        <input type="text" class="form-control" name="name" aria-describedby="emailHelp">
      </div>
    <div class="form-group">
        <label for="emil">Email address</label>
        <input type="email" class="form-control"  name="email" aria-describedby="emailHelp">
      </div>
    <button class="btn btn-primary">Add Student</button>
    
</form>
```
## add route
add following code in ***studentRoutes.js***
```js
// File: routes/studentRoutes.js
 router.get('/create', studentController.CreatePage);
```
## Add controller 
Add following code in ***studentController.js***
```js
// File: controllers/studentController.js
// create form view
exports.CreatePage=(req, res)=>{
    res.render('create');
}
```
* go to navigation in your app [localhost](localhost:3000) click create link  you will see ***add new student*** form

## Create ***POST*** Process
To add data in database we need to post data. To post data we will add following in our code.
* create post route
* add controller
* store data to databse

## create post router
add following code in ***studentRoutes.js***
```js
// File: routes/studentRoutes.js
 router.post('/create', studentController.CreateStudent);
```
## Add controller 
Add following code in ***studentController.js***
```js
// File: controllers/studentController.js
// submit form (store data in database)
exports.CreateStudent=(req, res)=>{
   console.log(req.body);
}
```
* go to your terminal you will see somthing like below.
```shell
database connected
{ name: 'chat', email: 'abc@live.com' }
```
## Adding Data to the database
* Add following code in ***studentController.js***
```js
// File: controllers/studentController.js

exports.HomePage= async (req, res)=>{
    
    const students = await Student.find({})
   
    res.render('index',{students});
    
}

    
// submit form (store data in database)
exports.CreateStudent=(req, res)=>{
      //console.log(req.body);
   let name =req.body.name
   let email =req.body.email
   if(email !=''&& name !=''){
       const student = new Student({
           name:name,
           email:email
       })
        student.save()
    }else{


    }
    console.log('student data created')
    res.redirect('/')
}
```
* Add following code in ***index.ejs***
```html
<% if (typeof students !== 'undefined' && students.length> 0) { %>
<table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Email</th>
        
      </tr>
    </thead>
    <tbody>
        <% students.forEach( function(student, index){ %>
      <tr>
        <th scope="row"><%- index+1 %></th>
        <td><%- student.name %></td>
        <td><%- student.email %></td>
        
      </tr>
      <% })  %>
    </tbody>
  </table>
  <% } %>
```




