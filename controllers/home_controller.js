const question=require('../models/question');

module.exports.home=function(req,res){
    question.find({})
    .populate('user')
    .populate({
        path:'answers',
        populate:{
            path:'user'
        }
    })
    .exec(function(err,ques){
        return res.render('home_page',{
            title:'home_page',
            questions:ques
        })
    })
};

