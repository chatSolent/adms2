require ('../models/database')
const { name } = require('ejs');
const Student=require('../models/studentModel')

exports.HomePage= async (req, res)=>{
    
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
exports.EditStudent= async (req, res)=>{
    console.log(req.params.id);
    const id = req.params.id;
    const student = await Student.findById({_id:id})
    res.render('edit_student', {student}); 

}
// Edit Student Action
exports.EditStudentAction=async (req, res)=>{
    //console.log(req.params.id);
    //const id=req.params.id
    //let name =req.body.name
    //let email =req.body.email
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
