const express = require('express');
const router = express.Router()

const studentController = require('../controllers/studentController')

/** Student Routes  */
router.get('/', studentController.HomePage);
router.get('/create_student', studentController.CreatePage);
router.post('/create_student', studentController.CreateStudent);

// Update
router.get('/', studentController.HomePage);
router.get('/edit_student/:id', studentController.UpdateStudentPage);//router.get('/edit_student/:id', studentController.EditStudet);
router.post('/edit_student/:id', studentController.UpdateStudent);



//Delete
router.get('/delete_student/:id', studentController.DeleteStudent);

//register

//router.get('/', studentController.HomePage);
router.get('/register', studentController.RegisterPage);
router.post('/register', studentController.RegisterUser);

//login
//router.get('/', studentController.HomePage);
router.get('/login', studentController.LoginPage);
router.post('/login', studentController.LoginUser);

//logout 
//router.get('/logout', studentController.LogoutPage);
router.get('/logout', studentController.LogoutUser);
module.exports=router