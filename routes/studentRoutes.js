const express = require('express');
const router = express.Router()

const studentController = require('../controllers/studentController')

/** Student Routes  */
router.get('/', studentController.HomePage);
router.get('/about', studentController.AboutPage);
router.get('/create', studentController.CreatePage);
router.post('/create', studentController.CreateStudent);
// export routes
module.exports=router