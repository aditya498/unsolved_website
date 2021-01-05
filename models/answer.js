const mongoose = require('mongoose');

const answerSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user_credential'
    },
    question:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'question'
    }
},{
    timestamps:true
});

const answer=mongoose.model('answer',answerSchema);

module.exports=answer;