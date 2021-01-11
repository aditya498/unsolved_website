const question=require('../models/question');

module.exports.home=async function(req,res){
    try{
        let ques=await question.find({})
        .populate('user')
        .populate({
            path:'answers',
            populate:{
                path:'user'
            }
        });

        return res.render('home_page',{
            title:'home_page',
            questions:ques
        })
    }catch(err){
        console.log(err);
    }
};

