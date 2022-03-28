const { Schema} = require('mongoose');
const mongoose = require('mongoose')

//Schema 
const studentSchema = new Schema({
    name:String,
    email:String
    
   });
   
module.exports=mongoose.model('Student', studentSchema);
  


