const question=require('../models/question');

module.exports.home=function(req,res){
    question.find({})
    .populate('user')
    .exec(function(err,ques){
        return res.render('home_page',{
            title:'Home Page',
            questions:ques
        })
    })
}