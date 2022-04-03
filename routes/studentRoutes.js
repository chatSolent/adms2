const express = require('express');
const router = express.Router()

const studentController = require('../controllers/studentController')

/** Student Routes  */
router.get('/', studentController.HomePage);
router.get('/create_student', studentController.CreatePage);
router.post('/create_student', studentController.CreateStudent);
// Update
router.get('/', studentController.HomePage);
router.get('/edit_student/:id', studentController.EditStudent);//router.get('/edit_student/:id', studentController.EditStudet);
router.post('/edit_student/:id', studentController.EditStudentAction);
//router.delete(('/delete_student/:id',function(req, res))
module.exports=router

//Delete
router.get('/delete_student/:id', studentController.DeleteStudent);
//router.delete('/delete_student/:id',studentController.DeleteStudent) 
