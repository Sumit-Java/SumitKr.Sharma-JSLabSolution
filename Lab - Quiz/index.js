let QstnCls = {
    isCorrectAnswer(ans){
        return ans === this.answer;
    }
}
function Question( qstn, choices, ans){
    this.text = qstn;
    this.choices = choices;
    this.answer = ans;
}
Question.prototype = QstnCls;
Question.prototype.constructor = Question;

let QuizCls = {
    getCurrentQuestion(){
        this.currentQstn = this.questions[this.questionIndex];
    },
    checkOptionWithAnswer( ans ){
        if( this.currentQstn.isCorrectAnswer(ans)){
            this.score++;
        }
        this.questionIndex++;
        },
    done(){
        return this.questionIndex >= this.questions.length;
    }
}
function Quiz( questions ){
    this.questions= questions;
    this.score = 0;
    this.questionIndex = 0;
    this.currentQstn;
}
Quiz.prototype = QuizCls;
Quiz.prototype.constructor = Quiz;

function loadQuestion(){
    if(varQuiz.done()){
        showScore();
        return;
    }
    varQuiz.getCurrentQuestion();
    let currentQstn = varQuiz.currentQstn
    const qstnEl = document.getElementById('question');
    qstnEl.textContent = currentQstn.text;

    for( let i=0; i < currentQstn.choices.length; i++){
        const curntChoice = currentQstn.choices[i];
        document.getElementById('choice'+i).textContent = curntChoice;
        handleSelect('btn'+i,curntChoice)
    }
    showProgress();
}
function handleSelect(id, choice){
    document.getElementById( id ).onclick = function(){
        varQuiz.checkOptionWithAnswer(choice);
        loadQuestion();
    }
}
function showProgress(){
    const progress = document.getElementById('progress');
    progress.textContent = `Question ${varQuiz.questionIndex+1} of ${varQuiz.questions.length}`
}
function showScore(){
    document.getElementById( 'quiz').innerHTML = `
    <h1>Result</h>
    <br><h2 class='score'>Your score ${varQuiz.score}</h2>
    <br><h2 class='score'>Questions correctly answered ${(varQuiz.score/varQuiz.questions.length)*100}% </h2>
    `;
}
 const questions = [
    new Question("JavaScript is the programming language of ", ["Desktop", "Mobile","Web", "Server"], "Web"),
    new Question("Which type of JavaScript language is?", ["Object-oriented", "Object-Based", "Functional Programming", "All"], "Object-Based"),
    new Question("Which is not a JavaScript Framework?", ["Python Script", "JQuery","Django", "NodeJS"], "Django"),
    new Question("Which symbol is used separate JavaScript statements?", ["Comma(,)", "Colon(:)", "Hyphen(-)", "Semi-colon(;)"], "Semi-colon(;)"),
    new Question("JavaScript ignores?", ["Newlines", "tabs", "Spaces", "All"], "All")
];

let varQuiz = new Quiz ( questions );
loadQuestion();
