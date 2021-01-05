const express=require('express');
const router=express.Router();
const home_controller=require('../controllers/home_controller');

router.get('/',home_controller.home)
router.use('/user', require('./user'));
router.use('/question',require('./question'));
router.use('/answer',require('./answer'));

module.exports=router;