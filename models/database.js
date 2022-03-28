const mongoose = require('mongoose');
// Database connection
mongoose.connect(process.env.DATABASE_URI,{
    useUnifiedTopology:true,
    useNewUrlParser:true
  })
  .then(() =>{console.log('database connected')})
  .catch ((err)=>{
    console.log(`database not connected ->${err.message}`)
  })

require('./studentModel')
  