const user_credential=require('../models/user_credential');

module.exports.dashboard=function(req,res){
    return res.render('user_dashboard',{
        title:'User Dashboard'
    })
};

module.exports.sign_up=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/user/dashboard');
    }
    return res.render('sign_up',{
        title:'Sign Up'
    })
};

module.exports.sign_in=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/user/dashboard');
    }
    return res.render('sign_in',{
        title:'Sign In'
    })
};

module.exports.create_account=function(req,res){

    if(req.body.password!=req.body.confirm_password){
        return res.redirect('back');
    }

    user_credential.findOne({email:req.body.email},function(err,user){

        if(err){
            console.log('Error in finding user while signing up: ',err);
            return;
        }
        if(user){
            console.log('Account with this email already exist');
            return res.redirect('back');
        }
        
        user_credential.create(req.body,function(err,user){
            if(err){
                console.log('Error in creating user while signing up:', err);
                return;
            }
            return res.redirect('/user/sign-in');
        })
    })
};

module.exports.create_session=function(req,res){
    return res.redirect('/user/dashboard');
};

module.exports.destroy_session=function(req,res){
    req.logout();
    return res.redirect('/');
}


