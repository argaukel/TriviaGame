


// quiz
var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');
var myQuestions = [
    {
      question: "Yellow + Blue makes...",
      answers: {
        a: "Purple",
        b: "Still Blue",
        c: "Green",
        d: "Puse"
      },
      correctAnswer: "c"
    },
    {
      question: "What three colors are a more relevant group of Primary colors?",
      answers: {
        a: "Red, Yellow, Blue",
        b: "Red, Blue, Green",
        c: "Cyan, Magenta, Yellow",
        d: "Red White & Blue"
      },
      correctAnswer: "c"
    },
    {
      question: "How do we know that a prism breaks up into the 7 colors of Red, Orange, Yellow, Blue, Indigo and Violet?",
      answers: {
        a: "It's a literal spectrum",
        b: "There's no difference between Indigo and Violet. 7 is arbitrary",
        c: "That's just like...your opinion",
        d: "Otherwise the acronym isn't as cute"
      },
      correctAnswer: "b"
    },
    {
      question: "What happens if you combine Cyan, Magenta and Yellow light?",
      answers: {
        a: "A Mess",
        b: "The Zack Snyder Cut",
        c: "The Diamond Authority",
        d: "White Light"
      },
      correctAnswer: "d"
    }
  ];

function buildQuiz(){

    // store HTML output
  var output = [];

  // for each question
  myQuestions.forEach(
    (currentQuestion, questionNumber) => {

      // store list of answer choices
      var answers = [];

      // available answers...
      for(letter in currentQuestion.answers){
        // console.log(currentQuestion.answers);
        // radio button
        answers.push(
          `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
        );
      }

      // add question and answers to output
      output.push(
        `<div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join('')} </div>`
      );
    }
  );

  // combine output list into one string and print to page
  quizContainer.innerHTML = output.join('');

}

function showResults(){
  
     // gather answer containers
  var answerContainers = quizContainer.querySelectorAll('.answers');

  // user's answers
  let numCorrect = 0;

  // each question...
  myQuestions.forEach( (currentQuestion, questionNumber) => {

    // find selected answer
    var answerContainer = answerContainers[questionNumber];
    var selector = 'input[name=question'+questionNumber+']:checked';
    var userAnswer = (answerContainer.querySelector(selector) || {}).value;

    // if answer is correct
    if(userAnswer===currentQuestion.correctAnswer){
      // add to the number of correct answers
      numCorrect++;

      // color the answers green
      answerContainers[questionNumber].style.color = 'lightgreen';
      console.log("You got it!");
      // $("#quiz").text("You got it!");

    }
  
    else{
      // color the answers red
      answerContainers[questionNumber].style.color = 'red';
    }
  });

  // show number of correct answers out of total
  resultsContainer.innerHTML = "You got: " + numCorrect + ' out of ' + myQuestions.length;
  console.log(myQuestions);
}

// display quiz right away
buildQuiz();

// on submit, show results
// submitButton.addEventListener('click', showResults);
// original submit
// $(submitButton).on('click', showResults);
$(submitButton).click(function() {
  alert( "Finished?" );
  showResults();
  $("#timerText").hide();
});

// countdown
var mins = 1;  //Set the number of minutes you need
var secs = mins * 60;
var currentSeconds = 0;
var currentMinutes = 0;

setTimeout(Decrement,1000); 

function Decrement() {
    currentMinutes = Math.floor(secs / 60);
    currentSeconds = secs % 60;
    if(currentSeconds <= 9) currentSeconds = "0" + currentSeconds;
    secs--;
    document.getElementById("timerText").innerHTML = "Time's up in: " + currentMinutes + ":" + currentSeconds; 
    if(secs !== -1) setTimeout('Decrement()',1000);
    // $('quizBowl').show();
    // trying to hide quiz div at timeout
    if(secs == 0) {
      showResults();
      $('quizBowl').hide()
      document.getElementById("timerText").innerHTML = "Time's up!";
    }
}

  