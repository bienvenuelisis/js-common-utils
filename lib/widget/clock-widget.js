'use strict';
$(document).ready(function () {


    // Calender js
    $(function () {
        $('.widget-calender').pignoseCalendar();
    });

    // Flipclock js    
    var clock;

    clock = $('.widget-clock').FlipClock({
        clockFace: 'DailyCounter',
        autoStart: false,
        callbacks: {
            stop: function () {
                $('.message').html('The clock has stopped!')
            }
        }
    });

    clock.setTime(220880);
    clock.setCountdown(true);
    clock.start();

    $('.stop').on('click', function (e) {
        clock.stop();
    });

    $('.start').on('click', function (e) {
        clock.start();
    });

    var myVar = setInterval(function () {
        myTimer()
    }, 1000);

    function myTimer() {
        var d = new Date();
        var t = d.toLocaleTimeString();
        document.getElementById("current-time").innerHTML = t;
    }

    function myStopFunction() {
        clearInterval(myVar);
    }
});
