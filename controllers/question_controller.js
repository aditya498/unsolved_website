const question=require('../models/question');
const answer=require('../models/answer');

module.exports.create_question=function(req,res){
    question.create({
        content: req.body.content,
        user:req.user._id
    },function(err,ques){
        if(err){
            console.log('Error in creating question');
            return;
        }
        return res.redirect('back');
    })
};

module.exports.display_user_question=function(req,res){
    question.find({user:req.user._id},function(err,ques){
        return res.render('user_question',{
            title:'Your asked questions',
            questions:ques
        });
    });
};


module.exports.delete_question=function(req,res){
    question.findById(req.params.id,function(err,ques){
        if(ques.user==req.user.id){
            ques.remove();
            answer.deleteMany({question:req.params.id},function(err){
                return res.redirect('back');
            })
        }else{
            return res.redirect('back');
        }
    })
}