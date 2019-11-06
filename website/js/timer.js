//Set the default time that remains
//to change the time, then go to the variable timerSetTime and change the time you want to set it
var timerSetTime = 5

//the timer function makesa timer that will show a duration and displays it
        function startTimer(duration, display) {
            //difining the variables
            var timer = duration, minutes, seconds;
            //setting the function to make the minutes and seconds value's
            setInterval(function () {
                minutes = parseInt(timer / 60, 10)
                seconds = parseInt(timer % 60, 10);

                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;
//displaying the content that is needed to be displayed
                display.textContent = minutes + ":" + seconds;
//if the timer is lower than 0 then make the duration 1 second
                if (--timer < 0) {
                    timer = duration;
                }
            }, 1000);
        }
//this window gives a time that will be displayed in the html page
        window.onload = function () {
            var Minutes = 60 * timerSetTime,
                display = document.querySelector('#time');
            startTimer(Minutes, display);
        };