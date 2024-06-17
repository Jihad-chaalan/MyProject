//Select elements
let countSpan = document.querySelector(".quiz-info .count span");
let bulletsSpanContainer = document.querySelector(".bullets .spans");
let quizArea = document.querySelector(".quiz-area");
let answersArea = document.querySelector(".answers-area");
let submitButton =document.querySelector(".submit-button");
let bullets = document.querySelector(".bullets");
let resultsContainer = document.querySelector(".results");
let countdownElement = document.querySelector(".countdown");

//Set Options
let currentIndex = 0;
let rightAnswers = 0;
let countdownInterval;



function getQuestions(){

    let myRequest = new XMLHttpRequest();

    myRequest.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200 ){
            let questionsObject = JSON.parse(this.responseText);
            let qCount = questionsObject.length;


//create bullets + set questions count
            createBullets(qCount);

// Add Questions Data

addQuestionData(questionsObject[currentIndex],qCount);


//start countdown

countdown(5,qCount);



//click on submit
            submitButton.onclick = () => {

                // get right answer

                let therightAnswer = questionsObject[currentIndex].right_answer;
                
                //Increase index
                currentIndex++;

                //check the answer
                checkAnswer(therightAnswer,qCount);

                //remove previous questions

                quizArea.innerHTML="";
                answersArea.innerHTML ="";

                // Add Questions Data

                addQuestionData(questionsObject[currentIndex],qCount);

                // Handle bullets Class 
                handleBullets();

                //start countdown
                clearInterval(countdownInterval);
                countdown(5,qCount);

                //show results
                showResults(qCount);


            };
        }
    };

    myRequest.open("GET","html_questions.json", true);
    myRequest.send();

}

getQuestions();

function createBullets(num){
    countSpan.innerHTML = num;

    //create spans
    for (let index = 0; index < num; index++) {

        //create bullet
        let theBullet = document.createElement("span");


        if (index === 0) {
            theBullet.className = "on";
        }

        //append bullets to main bullet container
        bulletsSpanContainer.appendChild(theBullet);
    }
}


function addQuestionData(obj, count) {
    
 
   if (currentIndex < count) {
     //create H2 question title
     let questionTitle = document.createElement("h2");

     //create question text
     let questionText = document.createTextNode(obj.title);
 
     questionTitle.appendChild(questionText);
 
     quizArea.appendChild(questionTitle);
 
 
 
     //create the answers
     for (let i = 1; i <= 4; i++) {
         
         //create main dev answer
         let mainDiv = document.createElement("div");
 
         //Add Class To Main Div
         mainDiv.className = "answer";
 
         //create radio  input 
         let radioInput = document.createElement("input");
 
         //Add Type + Name + Id + Data Attribute
         radioInput.name = 'question';
         radioInput.type = 'radio';
         radioInput.id = `answer_${i}`;
         radioInput.dataset.answer = obj[`answer_${i}`];
 
         //make first option checked
         if (i === 1) {
             radioInput.checked = true;
         }
 
         //Create Label
         let theLabel = document.createElement("label");
         
         //Add For Attrbute
         theLabel.htmlFor = `answer_${i}`;
 
         //create label text
         let theLabelText = document.createTextNode(obj[`answer_${i}`]);
 
         //Add the text to Label
         theLabel.appendChild(theLabelText);
 
         //add input + label to the main div
         mainDiv.appendChild(radioInput);
         mainDiv.appendChild(theLabel);
 
         //append all div to answers area
         answersArea.appendChild(mainDiv);
         console.log(mainDiv);
     }
   }
}

function checkAnswer(rAnswer,count) {
    let answers = document.getElementsByName("question");
    let theChoosenAnswer;

    for(let i = 0; i < answers.length; i++){

        if(answers[i].checked){

            theChoosenAnswer = answers[i].dataset.answer;
        }

    }

    if (rAnswer === theChoosenAnswer ) {
        rightAnswers++;
        
    }
}

function handleBullets() {

let bulletsSpans = document.querySelectorAll(".bullets .spans span");
let arrayOfSpans = Array.from(bulletsSpans);

arrayOfSpans.forEach((span, index) => {
    if(currentIndex === index){
        span.className = "on";
    }
});

}

function showResults(count) {
    let theResults;
    if (currentIndex === count) {
        quizArea.remove();
        answersArea.remove();
        submitButton.remove();
        bullets.remove();

        if (rightAnswers > (count / 2) && rightAnswers < count) {
            theResults = `<span class = "good">Good</span>, ${rightAnswers} From ${count}`
        }else if(rightAnswers === count){
            theResults = `<span class = "perfect">Perfect</span>, ${rightAnswers} From ${count}`
        }else {

            theResults = `<span class = "bad">Bad</span>, ${rightAnswers} From ${count}`

        }
        resultsContainer.innerHTML = theResults;
        resultsContainer.style.padding = "10px"; 
        resultsContainer.style.backgroundColor = "White";
        resultsContainer.style.marginTop ="10px"; 


    }
}

function countdown(duration, count){
    if (currentIndex < count) {
        let minutes, seconds;
        countdownInterval = setInterval(function (params) {
            minutes = parseInt(duration / 60);
            seconds = parseInt(duration % 60);

            minutes = minutes < 10? `0${minutes}` : minutes  ;
            seconds = seconds < 10? `0${seconds}` : seconds  ;

            countdownElement.innerHTML = `${minutes}:${seconds}`;

            if (--duration < 0) {
                clearInterval(countdownInterval);
                submitButton.click();
            }

        }, 1000);
    }
}