      var myQuestions = [
    {
      question: document.write = "Hoe oud is lars?",
      answers: {
        a: '17',
        b: '15',
        c: '16' },
    
      correctAnswer: 'c' },
    
    {
      question: document.write = "Waar maken meeste Developers gebruik van bij het encoding van html pagina's?",
      answers: {
        a: 'UTF-8',
        b: 'UTF-16',
        c: 'Windows-Charset-1274' },
    
      correctAnswer: 'a' },
    
      {
        question: document.write = "What is 30/3?",
        answers: {
          a: '3',
          b: '5',
          c: '10' },
      
        correctAnswer: 'c' }];
    
    
    //if you are a customer using this programm. Do not edit this code except for the code above!
var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');

generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);

function generateQuiz(questions, quizContainer, resultsContainer, submitButton){

  function showQuestions(questions, quizContainer){
    // we'll need a place to store the output and the answer choices
    var output = [];
    var answers;

    // for each question...
    for(var i=0; i<questions.length; i++){if (window.CP.shouldStopExecution(0)) break;
      
      // first reset the list of answers
      answers = [];

      // for each available answer...
      for(letter in questions[i].answers){

        // ...add an html radio button
        answers.push(
          '<label>'
            + '<input type="radio" name="question'+i+'" value="'+letter+'">'
            + letter + ': '
            + questions[i].answers[letter]
          + '</label>'
        );
      }

      // add this question and its answers to the output
      output.push(
        '<div class="question">' + questions[i].question + '</div>'
        + '<div class="answers">' + answers.join('') + '</div>'
      );
    }

    // finally we combined our output list into one string of html and put it on the page
    window.CP.exitedLoop(0);
    quizContainer.innerHTML = output.join('');
  }


  function showResults(questions, quizContainer, resultsContainer){
    
    // gather answer containers from our quiz
    var answerContainers = quizContainer.querySelectorAll('.answers');
    
    // keep track of user's answers
    var userAnswer = '';
    var numCorrect = 0;
    
    // for each question...
    for(var i=0; i<questions.length; i++){if (window.CP.shouldStopExecution(1)) break;

      // find selected answer
      userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked')||{}).value;
      
      // if answer is correct
      if(userAnswer===questions[i].correctAnswer){
        // add to the number of correct answers
        numCorrect++;
        
        // color the answers green
        answerContainers[i].style.color = 'lightgreen';
      }
      // if answer is wrong or blank
      else{
        // color the answers red
        answerContainers[i].style.color = 'red';
      }
    }

    // show number of correct answers out of total
    window.CP.exitedLoop(1);
    window.alert ("Je hebt een score van " + numCorrect + ' uit de ' + questions.length);
  }

  // show questions right away
  showQuestions(questions, quizContainer);
  
  // on submit, show results
  submitButton.onclick = function(){
    showResults(questions, quizContainer, resultsContainer);
    window.location.href = "https://www.glr.nl/";
    //Zet later er nog bij dat we misschien een website kunnen linken, zodat de quiz niet eeuwig bekeken kan worden.
    //Voor nu zetten we de default page redirect door naar de glr website (kopieer dit: window.location.href = "https://www.glr.nl/";).
    //LATER MOETEN WE INPLAATS VAN WINDOW.LOCATION.HREF = "" NAAR WINDOW.LOCATION.REPLACE VERANDEREN ZODAT STUDENTEN NIET MEER TERUG KUNNEN NAAR DE PAGINA
    //OF WE VERZINNEN WEL IETS ANDERS (Dont worry about this text if your are a customer.)
    //bezoek de andere scripts in het html document
  }
}
          //# sourceURL=pen.js //kan nog steeds geen setTimeout toevoegen bij bepaalde functies
