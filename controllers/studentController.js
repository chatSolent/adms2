require ('../models/database')
const { name } = require('ejs');
const req = require('express/lib/request');
const { append } = require('express/lib/response');
const res = require('express/lib/response');
const Student=require('../models/studentModel');
const User=require('../models/User')

exports.HomePage= async (req, res) =>{
    
        const students = await Student.find({})
   
    res.render('index',{students});
    
}


// create form view
exports.CreatePage=(req, res)=>{
    res.render('create_student');
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

// Edit Student
exports.UpdateStudentPage= async (req, res)=>{
    console.log(req.params.id);
    const id = req.params.id;
    const student = await Student.findById({_id:id})
    res.render('edit_student', {student}); 

}
// Edit Student Action
exports.UpdateStudent=async (req, res)=>{
   
   try {
    const student = await Student.updateOne({_id:req.params.id, name:req.body.name, email:req.body.email})
    res.redirect('/')
   } catch (error) {
       console.log(error)
       
   }
}


// Delete 
exports.DeleteStudent=async(req, res)=>{ 
    console.log(req.params.id);
    const id = req.params.id;
    const student =await Student.deleteOne({ _id: id });
    console.log(student);
    res.redirect('/');
}

//

// create form view
exports.RegisterPage=(req, res)=>{
    res.render('register');
}
//User
exports.RegisterUser=(req,res)=>{
    console.log(req.body)
    User.findOne({email:req.body.email}).then((User)); {
    if (User){

        return res.status(400).json({email: "A user already registered"})
    }else {
// or create new user 
        const newUser =new User({
           userName:req.body.name,
           email:req.body.email,
           password: req.body.password,

        });
            newUser.save()
            return res.status(200).json({msg: newUser})
        }
    };
};


