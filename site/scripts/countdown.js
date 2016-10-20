// Counts down the remaining time to next_meetup specified below, and puts output in <div id="countdown">

// Follows structure as given below:
//
// <div id="countdown">
//     <div id = "days"></div>
//     <div id = "hours"></div>
//     <div id = "mins"></div>
//     <div id = "secs"></div>
// </div>

// schedule is imported from schedule.js; holds all the event details

countdown();
var interval;

function countdown() {
    if(schedule.length <= 0)
    {
        $(".holder").html("<h2>None Scheduled</h2>");
        return;
    }

    interval = setInterval(function(){time_diff(schedule[0]["date_arg"]);}, 500);
    return;
}

function time_diff(to) {
    var time_left = Date.parse(to) - Date.now();

    var ms_in_a_sec = 1000;
    var ms_in_a_min = 60 * ms_in_a_sec;
    var ms_in_an_hour = 60 * ms_in_a_min;
    var ms_in_a_day = 24 * ms_in_an_hour;

    var days = Math.floor(time_left / ms_in_a_day);
    time_left %= ms_in_a_day;
    
    var hours = Math.floor(time_left / ms_in_an_hour);
    time_left %= ms_in_an_hour;

    var mins = Math.floor(time_left / ms_in_a_min);
    time_left %= ms_in_a_min;

    var secs = Math.floor(time_left / ms_in_a_sec);

    if(secs < 0)
    {
        clearInterval(interval);
        
        schedule.shift();
        countdown();
        return;
    }

    $("#event").html(schedule[0]["event"]);
    $("#venue").html(schedule[0]["venue"]);
    $("#date").html(schedule[0]["date"]);
    
    $("#days").text(days);
    $("#hours").text(hours);
    $("#mins").text(mins);
    $("#secs").text(secs);
    return;
}
