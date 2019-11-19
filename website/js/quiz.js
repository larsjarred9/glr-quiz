// create a variable for the number of questions
var myBarWidth = 0;
//you must remember that the computer always counts the first question or option as a 0. It always beggings with a zero then the next question/option is a 1, then a 2, ect.
// Vanaf hier begint setup //From here begins the setup 
// Het aantal vragen //total amount of questions 

var questionsNumber = 4;
//Set the default time that remains
//to change the time, then go to the variable timerSetTime and change the time you want to set it
var timerSetTime = 2; // De timer 0.5 = 30 seconden 1 = 60 seconden [1 minuut]
var normeringsnorm = 1; // Minimaal 1 //minimum 1 //Normeringsnorm is a way to calculate a specific number if you want more information about it than ask your local school or education center

(function() //creates the questions and the entire quiz
    {
        var allQuestions = [{ // Vul hier je vragen in (0 = 1, 1 = 2)
                question: "Wat betekend HTML?",
                options: [" Hyper Text Markup Language", " Hyper Text Margin Langugage", " Hyper Text Mega Language", " Hyper Text Mondial Language"],
                answer: 0,
                image: "https://img.freepik.com/free-vector/illustration-web-design_53876-5835.jpg?size=338&ext=jpg"
            }, {
                question: "Waar staat CSS voor?",
                options: [" Centralised Style Sheet", " Cascading Style Sheet"],
                answer: 1,
                image: "https://www.dezandvoortse.nl/wp-content/uploads/2018/08/vraagteken.jpeg",
            }, {
                question: "Wie was de eigenaar van Microsoft?",
                options: [" Bill Gates", " Steve Jobs"],
                answer: 0,
                image: "https://agsol.com/wp-content/uploads/2018/09/new-microsoft-logo-SIZED-SQUARE.jpg"
            },
            {
                question: "Wat was de eerste website?",
                options: [" Google.com", " index.html/index", " info.cern.ch"],
                answer: 2,
                image: "https://www.telegraph.co.uk/content/dam/technology/2017/08/03/Internet2_trans_NvBQzQNjv4BqJRZdqtQCcB0-hjTaQxsqmtMZZIw9jvU_z2DJKltQ1FE.jpg?imwidth=450"
            },
            {
                question: "Wat is altijd het eerste programma wat je schrijft in elke taal",
                options: [" Hello World", " Alive and Kicking", " Joe", " Warning Warner"],
                answer: 0,
                image: "https://miro.medium.com/max/848/1*e42aZTxR5ZDBbrv-ioIKFA.jpeg"
            }
        ];

        //if you are a costumer and you are using this script than take note that to add a question you need to first add a , right after the }
        //Then start with a new {} and type your question, options and answers there. Just don't edit the code thats under here
        //set the amount of points or questions you have taken at the start, how many options you have and how much space the quiz takes.
        //plus change the var questionsNumber to the amount of questions youhave in the allQuestions
        //Keep in mind do not and we mean do not edit the code below!!!!!!!!!! //an exception to that rule, is that you can change the normering at display results were you can edit the standerdization of the counting system to your prefrences

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
        $('#next').click(function() {
            chooseOption();
            if (isNaN(selectOptions[quesCounter])) {
                alert('Selecteer een antwoord.');
            } else {
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
        $('#prev').click(function() {
            chooseOption();
            quesCounter--;
            deductProgress();
            nextQuestion();
        });

        //creates all of the elements needed to display the quizez index inside the container and inside the div element quiz. And set al radio element in place
        function createElement(index) {
            var element = $('<div>', { id: 'question' });
            var header = $('<h2>Vraag ' + (index + 1) + ' :</h2>');
            //$( "#question-titel" ).remove();
            $("#question-titel").html(header);

            var question = $('<p>').append(allQuestions[index].question);
            //$( "#question-question" ).remove();
            $("#question-question").html(question);
            document.getElementById("image-big").src = (allQuestions[index].image);

            var radio = radioButtons(index);
            element.append(radio);

            return element;
        }
        //tels the index what the radiobuttons should contain if they are called and what kind of value they have in the index
        function radioButtons(index) {
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
        function chooseOption() {
            selectOptions[quesCounter] = +$('input[name="answer"]:checked').val();
        }
        //when next function nextquestion happpends. the quizdiv fades out of the screen. The questions are removed and new questions are assigned.
        function nextQuestion() {
            quizdiv.fadeOut(function() {
                $('#question').remove();
                if (quesCounter < allQuestions.length) {
                    var nextQuestion = createElement(quesCounter); //creates the index to where the quescounter is at right now
                    quizdiv.append(nextQuestion).fadeIn();
                    quizdiv.append
                        //fades into the space it will be located to
                    if (!(isNaN(selectOptions[quesCounter]))) //if no option or number has been selected
                    {
                        $('input[value=' + selectOptions[quesCounter] + ']').prop('checked', true); //checkes if every thing is loaded correctly with the correct answer
                    }
                    if (quesCounter === 1) //if the quescounter is atleast one than show the prev button
                    {
                        $('#prev').show();
                        $('#Inleveren').hide();
                        $('#Klaar').hide();
                    } //else it wil hide the quescounter but it wil still show the next button no matter the quescounter
                    else if (quesCounter === 0) {
                        $('#prev').hide();
                        $('#next').show();
                        $('#Inleveren').hide();
                        $('#Klaar').hide();
                    }
                } else {
                    var scoreRslt = displayResult(); //if the results needed to be displayed, than it fades in and hides all the buttons.
                    quizdiv.append(scoreRslt).fadeIn();
                    $('#next').remove();
                    document.getElementById("image-big").src = "images/ideas.png";
                    $('#prev').remove();
                    $('#Inleveren').show();
                    $('#timer').remove();
                    $('#time').remove();
                    $('#Klaar').show();
                    $('#quiz').remove();
                    $('.formulier-content').remove();
                    $('#brid').remove();
                    //I have put here some extra css code html code and some other code with the ID Klaar
                    //this will also delete some elements when the display results function is being called upon. 
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
            var score = $('<p>', { id: 'question' });
            var correct = 0;
            for (var i = 0; i < selectOptions.length; i++) {
                if (selectOptions[i] === allQuestions[i].answer) {
                    correct++;
                }
            } //this will set down the basis for how numbers are accounted for. This still needs to be set to an english standerd languagesss
            var normering = 9 * (correct / (1 + questionsNumber)) + normeringsnorm;
            if (normering > 10.0) {
                var normering = 10
            } else if (normering < 1.0) {
                var normering = 1
            }
            var n = normering.toFixed(1);
            $("#question-titel").html("<h2>Je hebt een " + n + " voor deze quiz behaald.</h2>");
            $("#question-question").html("");
            return score;

        } //shows the score you have at the end

        //the timer function makesa timer that will show a duration and displays it
        function startTimer(duration, display) {
            //difining the variables
            var timer = duration,
                minutes, seconds;
            //setting the  function to make the minutes and seconds value's
            setInterval(function() {
                minutes = parseInt(timer / 60, 10)
                seconds = parseInt(timer % 60, 10);

                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;
                //displaying the content that is needed to be displayed
                display.textContent = minutes + ":" + seconds + " Minuten";
                //if the timer is lower than 0 then make a text appear that display's the text De tijd is om. after that the quiz should not be accecesed anymore 
                if (--timer < 1) {
                    display.textContent = "De test is afgelopen, je had niet voldoende tijd.";
                    $('#question').remove();
                    $('#next').hide();
                    $('#prev').hide();
                    $('#timer').remove();
                    var functionloop = true
                    document.getElementById("myBar").style.width = 100 + "%";
                    document.getElementById("image-big").src = "images/ideas.png";
                    $('#Inleveren').show();
                    displayResult();

                }
            }, 1000);
        }
        //This will setup the timer for the html document. which is assigned to the css element #time.  //this window gives a time that will be displayed in the html page
        window.onload = function() {
            var Minutes = 60 * timerSetTime,
                display = document.querySelector('#time');
            startTimer(Minutes, display);
        }
    })();