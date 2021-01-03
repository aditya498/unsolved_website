const express = require('express');
const router = express.Router();
const passport = require('passport');
const user_controller=require('../controllers/user_controller');

router.get('/dashboard',user_controller.dashboard);
router.get('/sign-in',user_controller.sign_in);
router.get('/sign-up',user_controller.sign_up);
router.get('/sign-out',user_controller.destroy_session);
router.post('/create-account',user_controller.create_account);
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/user/sign-in'}
),user_controller.create_session);
router.get('/sign-out',user_controller.destroy_session);

module.exports=router;
