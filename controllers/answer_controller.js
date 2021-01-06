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


module.exports.delete_answer=function(req,res){
    answer.findById(req.params.id,function(err,ans){
        if(ans.user==req.user.id){
            let ques_id=ans.question;
            ans.remove();
            question.findByIdAndUpdate(ques_id,{$pull:{answers:req.params.id}},function(err,ques){
                return res.redirect('back');
            })
        }else{
            return res.redirect('back');
        }
    })
};


