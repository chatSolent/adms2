const express = require('express');
const router = express.Router()

const studentController = require('../controllers/studentController')

/** Student Routes  */
router.get('/', studentController.HomePage);
router.get('/create_student', studentController.CreatePage);
router.post('/create_student', studentController.CreateStudent);
// export routes
module.exports=router