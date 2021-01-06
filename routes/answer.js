const express = require('express');
const router = express.Router();
const passport = require('passport');
const answer_controller=require('../controllers/answer_controller');

router.post('/create',passport.checkAuthentication,answer_controller.create_answer);
router.get('/delete/:id',passport.checkAuthentication,answer_controller.delete_answer);

module.exports=router;