const mongoose = require('mongoose')
//const { Schema} = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema= mongoose.Schema({
    userName:{
    type:String,
    required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
        },
    password:{
        type:String,
        required:true,

    },

    date:{
    type:Date,
    default:Date.now,

    }
});

UserSchema.methods.comparePassword = function(plaintext,callback) {
    return callback(null,bcrypt.compareSync(plaintext,this.password));

};
const User = mongoose.model("User",UserSchema);
module.exports = User