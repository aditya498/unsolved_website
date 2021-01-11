const answer=require('../models/answer');
const question=require('../models/question');

module.exports.create_answer=async function(req,res){

    try{
        let ques=await question.findById(req.body.question_id);

        if(ques){
            let ans=await answer.create({
                content: req.body.content,
                user:req.user._id,
                question:req.body.question_id
            })

            if(ans){
                ques.answers.push(ans);
                ques.save();
                res.redirect('back');
            }
        }
    }catch(err){
        console.log(err);
    }
};


module.exports.delete_answer=async function(req,res){

    try{
        let ans=await answer.findById(req.params.id);

        if(ans.user==req.user.id){
            let ques_id=ans.question;
            ans.remove();
            question.findByIdAndUpdate(ques_id,{$pull:{answers:req.params.id}},function(err,ques){
                return res.redirect('back');
            })
        }else{
            return res.redirect('back');
        }
    }catch(err){
        console.log(err);
    }

};


