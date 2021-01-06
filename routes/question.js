const express=require('express');
const router=express.Router();
const passport = require('passport');
const question_controller=require('../controllers/question_controller');

router.post('/create',passport.checkAuthentication,question_controller.create_question);
router.get('/user-asked',passport.checkAuthentication,question_controller.display_user_question);
router.get('/delete/:id',passport.checkAuthentication,question_controller.delete_question);


module.exports=router;