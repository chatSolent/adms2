require ('../models/database')
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