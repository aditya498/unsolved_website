let createQuestion=function(){
    let new_question_form=$('#new_question_form');
    new_question_form.submit(function(e){
        e.preventDefault();

        $.ajax({
            type: 'post',
            url: '/question/create',
            data: new_question_form.serialize(),
            success: function(res){
                console.log(res.data);
                let newQuesDom=newQuestionDom(res.data.question,res.data.user_name);
                $('#question_container').prepend(newQuesDom);
            },error: function(err){
                console.log(err);
            }
        })
    })
};

let newQuestionDom=function(ques,user){
    return $(`<li>
                <p> 
                    ${ques.content}
                    <br>
                    <small>
                        ${user}
                    </small>
                </p>
                <a class ="delete_question_btn" href="/question/delete/${ques._id}"><b>Delete</b></a>
                    <form action="answer/create" method="POST">
                        <textarea name="content" cols="30" rows="3" placeholder="Type your answer here..." required></textarea>
                        <input type="hidden" name="question_id" value="${ques._id}">
                        <input type="submit" value="submit">
                    </form>
            </li>`
    )
}


// let deleteQuestion=function(){
//     $('.delete_question_btn>b').click(function(e){
//         e.preventDefault();
//     })
// };

createQuestion();
// deleteQuestion();