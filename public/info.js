
makeQuestions();

function deleteQuestion(id)
{
    fetch(`http://localhost:8000/questions/${id}`,{
                    method: "DELETE"
                }).then(()=>location.reload());
}

function answerQuestion(id,answer)
{
    let body = {answer:answer};
    fetch(`http://localhost:8000/questions/${id}`,{
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(body)
                }).then(()=>location.reload());
}

function createRows(arr)
{
    let ins = document.getElementById('question-form');
    for(qst of arr)
    {
        let qna = document.createElement('div');
        qna.classList.add("dropdown");
        let question = document.createElement('p');
        question.classList.add('question');
        question.innerHTML=qst.question;
        qna.appendChild(question);
        
        if(qst.answer)
        {
            let answer = document.createElement('p');
            answer.classList.add('answer','dropdown-content');
            answer.innerHTML=qst.answer;
            qna.appendChild(answer);
        }
        else
        {
            let options = document.createElement('div');
            options.classList.add('answer', 'dropdown-content');
            let ans = document.createElement('form');
            ans.classList.add('answer-form')
            ans.method="put";
            ans.action=`http://localhost:8000/questions/${qst.question_id}`;
            ans.innerHTML=`<label for="answer-field${qst.question_id}">Answer Question:</label>
            <textarea class="text-field" id="answer-field${qst.question_id}" name="answer" rows="5" cols="100"></textarea>`;

            let update = document.createElement('button');
            update.innerHTML="Submit Answer";
            update.addEventListener("click", ()=>
            {
                let input = document.getElementById(`answer-field${qst.question_id}`);
                answerQuestion(qst.question_id,input.value);
            })
            
            ans.appendChild(update);
            let delet = document.createElement('button');
            delet.innerHTML="Delete Question";
            delet.addEventListener("click",()=>
            {
                deleteQuestion(qst.question_id);
            });
            ans.appendChild(delet);
            options.appendChild(ans);
            qna.append(options);

        }

        ins.insertAdjacentElement("afterend",qna);
        ins = qna;
    }
}

function makeQuestions() {
    fetch('http://localhost:8000/questions')
        .then(res => res.json())
        .then(qstn => createRows(qstn))
        .catch(err => console.log(err));
}