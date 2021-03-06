const mongoose = require('mongoose');

const questionSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user_credential'
    },
    answers:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'answer'
        }
    ]
},{
    timestamps:true
});

const question=mongoose.model('question',questionSchema);

module.exports=question;