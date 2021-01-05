const answer=require('../models/answer');
const question=require('../models/question');

module.exports.create_answer=function(req,res){
    question.findById(req.body.question_id,function(err, ques){
        if(ques){
            answer.create({
                content: req.body.content,
                user:req.user._id,
                question:req.body.question_id
            },function(err, ans){
                ques.answers.push(ans);
                ques.save();
                res.redirect('back');
            })
        }
    })
};

