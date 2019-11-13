//Set the default time that remains
//to change the time, then go to the variable timerSetTime and change the time you want to set it
var timerSetTime = 1

//the timer function makesa timer that will show a duration and displays it
        function startTimer(duration, display) {
            //difining the variables
            var timer = duration, minutes, seconds;
            //setting the  function to make the minutes and seconds value's
            setInterval(function () {
                minutes = parseInt(timer / 60, 10)
                seconds = parseInt(timer % 60, 10);

                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;
//displaying the content that is needed to be displayed
                display.textContent = minutes + ":" + seconds  + " Minuten";
//if the timer is lower than 0 then make a text appear that display's the text De tijd is om. after that the quiz should not be accecesed anymore 
                if (--timer < 0 ) {
                    display.textContent = "De tijd is om.";
                    $('#question').remove();
                    $('#next').hide();
                    $('#prev').hide();
                    $('#timer').remove();
                    var functionloop = true
                    document.getElementById("myBar").style.width = 100 + "%";
                    $('#Inleveren').show();
                    $( "#question-titel" ).html("<h2>Je hebt een " + normering + " voor deze quiz behaald.</h2>:");
                    $( "#question-question" ).html("");
                    displayResult();
                    $( "#question-question" ).html('Je hebt de volgende score <b>' + correct + '</b> van de <b>' +allQuestions.length + "</b>");
                }
            }, 1000);
        }
//this window gives a time that will be displayed in the html page
        window.onload = function () {
            var Minutes = 60 * timerSetTime,
                display = document.querySelector('#time');
            startTimer(Minutes, display);
        }
