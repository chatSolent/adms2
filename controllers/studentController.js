require ('../models/database')
const { name } = require('ejs');
const req = require('express/lib/request');
const { append } = require('express/lib/response');
const res = require('express/lib/response');
const Student=require('../models/studentModel');
const User  = require('../models/User')
const bcrypt = require('bcrypt');
const morgan = require('morgan');
//const e = require('connect-flash');


var sessionChecker= async (req, res, next)=>{
    //console.log(req)
    if(req.cookies.user_sid && !req.session.user){
        const students = await Student.find({})
        res.render('student_data', { session: req.session.user, students: {students}})
    }else {
        next()
    }


}

exports.HomePage= async (req, res) =>{
    const students = await Student.find({})
    console.log(students)
    res.render('index', { session: req.session.user, students: {students}});

}
exports.AboutPage= async (req, res) =>{
    const students = await Student.find({})
    console.log(students)
    res.render('about', { session: req.session.user, students: {students}});

}


// create form view
exports.CreatePage = (sessionChecker, (req, res) =>{

    if(!req.cookies.user_sid && req.session.user){
        res.render('login', {user: req.user,session: req.session.user})
    }else {
        res.render('create_student',{ session: req.session.user})
    }


})

// submit form (store data in database)
exports.CreateStudent= async (req, res)=>{

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
    const students = await Student.find({})
    res.render('student_data', { session: req.session.user,students: {students}});
}

// Edit Student
exports.UpdateStudentPage= async (req, res)=>{
    console.log(req.params.id);
    const id = req.params.id;
    const student = await Student.findById({_id:id})
    res.render('edit_student', { session: req.session.user,student: {student}});

}
// Edit Student Action
exports.UpdateStudent=async (req, res)=>{

    try {
        const student = await Student.updateOne({_id:req.params.id, name:req.body.name, email:req.body.email})
        console.log(student)
        const students = await Student.find({})
        res.render('student_data', { session: req.session.user,students: {students}})
    } catch (error) {
        console.log(error)

    }
}


// Delete
exports.DeleteStudent=async(req, res)=>{
    if(!req.cookies.user_sid && req.session.user){
        res.render('login',{ session: req.session.user})
    }
    console.log(req.params.id);
    const id = req.params.id;
    const student =await Student.deleteOne({ _id: id });
    console.log(student);
    const students = await Student.find({})
    res.render('student_data', { session: req.session.user,students: {students}})

}

//

// create form view
exports.RegisterPage=(req, res)=>{

    res.render('register',{ session: req.session.user });
}
//User
exports.RegisterUser= async (req,res)=>{
    const salt = bcrypt.genSaltSync(parseInt(process.env.SALT_ROUND));
    const hash = bcrypt.hashSync(req.body.password, salt);
// Store hash in your password DB.
    console.log(req.body)
    //User.findOne({email:req.body.email}).then((User)); {
    const user = await User.findOne({email:req.body.email})
    if (user){
        console.log(user)
        return res.status(400).json({email: "A user already registered"})
    }else {
// or create new user
        const newUser =new User({
            userName:req.body.name,
            email:req.body.email,
            password: hash,

        });
            newUser.save()
            res.render("login", {  session: req.session.user})
        }

    //Login

    }

    exports.LoginPage = async (req,res)=>{
        res.render('login',{ session: req.session.user});

    }

    exports.LoginUser = async (req,res)=>{

        const user =  await User.findOne({email:req.body.email})

        if (!user){
            res.render('login', { session: req.session.user})
        }

        await user.comparePassword(req.body.password, async(error,match)=>{
            const students = await Student.find({})
            if (!match){
                res.render("login", {  session: req.session.user})
            }
            req.session.user = user
            res.render('student_data', {  session: req.session.user, students:{students}})
        })
    }

       //logout

    exports.LogoutUser= async(req,res)=>{
        console.log(req.cookies.user_sid)
        if(req.cookies.user_sid && req.session.user){
            res.clearCookie('user_sid')
               //res.session.destroy()
            res.redirect('./login' /*, { session: req.session.user}*/)
        }else{
            res.redirect('./login')
        }
        }
