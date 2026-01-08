// QUIZ QUESTIONS
const quizData = [
 {q:"HTML stands for?", o:["Hyper Text Markup Language","Home Tool Markup Language","Hyperlinks Mark Language","High Text Machine Language"], a:0},
 {q:"CSS stands for?", o:["Cascading Style Sheets","Computer Style Sheets","Creative Styling System","Color Style Sheet"], a:0},
 {q:"JS stands for?", o:["JustScript","JavaScript","JavaSyntax","JumboScript"], a:1},
 {q:"Which runs in browser?", o:["Python","Java","JavaScript","C"], a:2},
 {q:"Bootstrap is used for?", o:["Backend","Styling","Database","Testing"], a:1},
 {q:"React is a?", o:["Library","Language","Database","Framework"], a:0},
 {q:"SQL used for?", o:["Styling","Database","Frontend","APIs"], a:1},
 {q:"Which stores locally?", o:["Server","LocalStorage","Cloud","RAM"], a:1},
 {q:"Which is DB?", o:["React","Node","MongoDB","CSS"], a:2},
 {q:"Which is backend?", o:["HTML","CSS","JS","NodeJS"], a:3},
 {q:"Which for APIs?", o:["Postman","VS Code","Chrome","Bootstrap"], a:0},
 {q:"Which is OS?", o:["Windows","Java","HTML","SQL"], a:0},
 {q:"Which is language?", o:["MongoDB","Python","Bootstrap","Figma"], a:1},
 {q:"Frontend includes?", o:["HTML CSS JS","Python","SQL","Node"], a:0},
 {q:"Which is version control?", o:["Git","React","Linux","Chrome"], a:0}
];

let index = 0, score = 0, attempts = 0;
let timer = 30, totalTime = 0;
let interval;

// START QUIZ
function startQuiz(){
 document.getElementById("home").classList.remove("active");
 document.getElementById("quiz").classList.add("active");
 loadQuestion();
 startTimer();
}

// LOAD QUESTION
function loadQuestion(){
 let data = quizData[index];
 document.getElementById("question").innerText = data.q;
 document.getElementById("progress").innerText = `Q ${index+1} / ${quizData.length}`;

 let optBox = document.getElementById("options");
 optBox.innerHTML = "";
 document.getElementById("nextBtn").style.display="none";

 data.o.forEach((opt,i)=>{
  let btn=document.createElement("button");
  btn.innerText=opt;
  btn.onclick=()=>selectOption(btn,i);
  optBox.appendChild(btn);
 });
}

// ANSWER SELECT
function selectOption(btn,i){
 attempts++;
 [...document.querySelectorAll("#options button")].forEach(b=>b.disabled=true);

 if(i === quizData[index].a){
   btn.classList.add("correct");
   score++;
 } else {
   btn.classList.add("wrong");
 }

 document.getElementById("nextBtn").style.display="block";
}

// NEXT
function nextQuestion(){
 index++;
 if(index < quizData.length){
   loadQuestion();
   timer = 30;
 } else {
   showResult();
 }
}

// TIMER
function startTimer(){
 interval = setInterval(()=>{
  timer--;
  totalTime++;
  document.getElementById("timer").innerText = timer+"s";
  if(timer<=0) nextQuestion();
 },1000);
}

// RESULT
function showResult(){
 clearInterval(interval);
 document.getElementById("quiz").classList.remove("active");
 document.getElementById("result").classList.add("active");

 let wrong = attempts - score;
 let percent = Math.round((score/quizData.length)*100);

 document.getElementById("totalQ").innerText = quizData.length;
 document.getElementById("attemptQ").innerText = attempts;
 document.getElementById("correctQ").innerText = score;
 document.getElementById("wrongQ").innerText = wrong;
 document.getElementById("percent").innerText = percent;
 document.getElementById("time").innerText = totalTime;

 document.getElementById("message").innerText =
   percent>=80? "Excellent 🎉":
   percent>=50? "Good 🙂":
   "Needs Improvement 😟";
}

// RESTART
function restartQuiz(){
 location.reload();
}
