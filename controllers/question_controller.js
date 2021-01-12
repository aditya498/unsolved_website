const question=require('../models/question');
const answer=require('../models/answer');
const user_cred=require('../models/user_credential');

module.exports.create_question=async function(req,res){
    try{
        let ques=await question.create({
            content: req.body.content,
            user:req.user._id
        });
        
        let user=await user_cred.findById(req.user._id);

        if(req.xhr){
            return res.status(200).json({
                data:{
                    question:ques,
                    user_name:user.name
                },
                message:"question created"
            })
        }

        return res.redirect('back');
    }catch(err){
    console.log('Error in creating question:',err);
    }
};

module.exports.display_user_question=function(req,res){
    question.find({user:req.user._id},function(err,ques){
        return res.render('user_question',{
            title:'Your asked questions',
            questions:ques
        });
    });
};


module.exports.delete_question=async function(req,res){
    try{
        let ques=await question.findById(req.params.id);
        if(ques.user==req.user.id){
            ques.remove();
            answer.deleteMany({question:req.params.id},function(err){
                return res.redirect('back');
            })
        }else{
            return res.redirect('back');
        }
    }catch(err){
        console.log(err);
    }
}