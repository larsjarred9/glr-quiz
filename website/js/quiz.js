
// create a variable for the number of questions
var myBarWidth = 0;

// Vanaf hier begint setup //
// Het aantal vragen -1
var questionsNumber = 3;
(function() //creates the questions and the entire quiz
 {
  var allQuestions = [{ // Vul hier je vragen in (0 = 1, 1 = 2)
    question: "Wat betekend HTML?",
    options: [" Hyper Text Markup Language", " Hyper Text Margin Langugage", " Hyper Text Mega Language", " Hyper Text Mondial Language"],
    answer: 0,
    image: "https://static3.depositphotos.com/1000764/243/i/950/depositphotos_2437630-stock-photo-3d-person-with-question-sign.jpg"
  }, {
    question: "Waar staat CSS voor?",
    options: [" Centralised Style Sheet", " Cascading Style Sheet"],
    answer: 1,
    image: "https://www.dezandvoortse.nl/wp-content/uploads/2018/08/vraagteken.jpeg",
  }, {
    question: "Wie was de eigenaar van Microsoft?",
    options: [" Bill Gates", " Steve Jobs"],
    answer: 0,
    image: ""
    },
  {
    question: "Wat was de eerste website?",
    options: [" Google.com", " index.html/index", " info.cern.ch"],
    answer: 2,
    image: ""
  }];


 //if you are a costumer and you are using this script than take note that to add a question you need to first add a , right after the }
 //Then start with a new {} and type your question, options and answers there. Just don't edit the code thats under here
  //set the amount of points or questions you have taken at the start, how many options you have and how much space the quiz takes.
  //plus change the var questionsNumber to the amount of questions youhave in the allQuestions
  //Keep in mind do not and we mean do not edit the code below!!!!!!!!!!
  var quesCounter = 0;
  var selectOptions = [];
  var quizdiv = $('#quiz');
  var numberQuestions = allQuestions.length;
    
  nextQuestion();
  //function of the next question. When clicked it wil check if a option has been selected if it does than it ads a point to the questions counter.
 //it wil then go to the next question. If it does not find anything being entered than it wil alert (please select an option !).
 function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
 $('#next').click(function () 
    {
        chooseOption();
        if (isNaN(selectOptions[quesCounter])) 
        {
            alert('Selecteer een antwoord.');
        } 
        else 
        {
          quesCounter++;
          nextQuestion();
          addProgress();
        }
        async function demo() {
          console.log('Taking a break...');
          await sleep(2000);
        }
      });
  //goes to previous question. this is acomplished by decreasing the counter and setting the screen back to a previous question.
  $('#prev').click(function () 
    {
        chooseOption();
        quesCounter--;
        deductProgress();
        nextQuestion();
    });
    
  //creates all of the elements needed to display the quizez index inside the container and inside the div element quiz. And set al radio element in place
  function createElement(index) 
    {
        var element = $('<div>',{id: 'question'});
        var header = $('<h2>Vraag ' + (index + 1) + ' :</h2>');
        //$( "#question-titel" ).remove();
        $( "#question-titel" ).html(header);

        var question = $('<p>').append(allQuestions[index].question);
        //$( "#question-question" ).remove();
        $( "#question-question" ).html(question);

        var radio = radioButtons(index);
        element.append(radio);

        return element;
    }
  //tels the index what the radiobuttons should contain if they are called and what kind of value they have in the index
  function radioButtons(index) 
    {
        var radioItems = $('<ul>');
        var item;
        var input = '';
        for (var i = 0; i < allQuestions[index].options.length; i++) {
          item = $('<li>');
          input = '<input type="radio" name="answer" value=' + i + ' />';
          input += allQuestions[index].options[i];
          item.append(input);
          radioItems.append(item);
        }
        return radioItems;
  }
  //makes a value out of a chosen question
  function chooseOption() 
    {
        selectOptions[quesCounter] = +$('input[name="answer"]:checked').val();
    }
   //when next function nextquestion happpends. the quizdiv fades out of the screen. The questions are removed and new questions are assigned.
  function nextQuestion() 
    {
        quizdiv.fadeOut(function() 
            {
              $('#question').remove();
              if(quesCounter < allQuestions.length)
                {
                    var nextQuestion = createElement(quesCounter);//creates the index to where the quescounter is at right now
                    quizdiv.append(nextQuestion).fadeIn();//fades into the space it will be located to
                    if (!(isNaN(selectOptions[quesCounter]))) //if no option has been selected
                    {
                      $('input[value='+selectOptions[quesCounter]+']').prop('checked', true);//checkes if every thing is loaded correctly with the correct answer
                    }
                    if(quesCounter === 1)//if the quescounter is atleast one than show the prev button
                    {
                      $('#prev').show();
                      $('#Inleveren').hide();
                    } //else it wil hide the quescounter but it wil still show the next button no matter the quescounter
                    else if(quesCounter === 0)
                    {
                      $('#prev').hide();
                      $('#next').show();
                      $('#Inleveren').hide();
                    }
                }
              else 
                {
                    var scoreRslt = displayResult();//if the results needed to be displayed, than it fades in and hides all the buttons.
                    quizdiv.append(scoreRslt).fadeIn();
                    $('#next').hide();
                    $('#prev').hide();
                    $('#Inleveren').show();
                }
        });
    }
    function addProgress() {
      //increase myBarWidth by 100/questionsNumber
      myBarWidth += 100 / numberQuestions;
      // make sure that width of the progress bar won't be more than 100% & fix for questionsNumber that are not dividers of 100
      if (myBarWidth > 100) {
          myBarWidth = 100;
      }
      // update the width #myBar by changing the css
      document.getElementById("myBar").style.width = myBarWidth + "%";
  }
  // deduct progress
  function deductProgress() {
      //decrease myBarWidth by 100/questionsNumber
      myBarWidth -= 100 / allQuestions.length;
      // make sure that width of the progress bar won't be more than 0% & fix for questionsNumber that are not dividers of 100
      if (myBarWidth < 0) {
          myBarWidth = 0;
      }
      // update the width #myBar by changing the css
      document.getElementById("myBar").style.width = myBarWidth + "%";
  }
  function displayResult() //display's results of the quiz and what answers you have chosen to choose. First it wil reset the variable correct to 0.
 //then it will say for every option you have selected you might get a point depending if the answer is correct if so a point is added. it wil also display the folowing text
    {
        var score = $('<p>',{id: 'question'});
        var correct = 0;
        for (var i = 0; i < selectOptions.length; i++) 
        {
          if (selectOptions[i] === allQuestions[i].answer) 
          {
            correct++;
          }
        }
        score.append('Je hebt de volgende score <b>' + correct + '</b> van de <b>' +allQuestions.length) + "</>";
        return score;
  }//shows the score you have at the end
})();