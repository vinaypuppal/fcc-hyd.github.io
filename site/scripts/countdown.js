// Counts down the remaining time to next_meetup specified below, and puts output in <div id="countdown">

// Follows structure as given below:
//
// <div id="countdown">
//     <div id = "days"></div>
//     <div id = "hours"></div>
//     <div id = "mins"></div>
//     <div id = "secs"></div>
// </div>

// Edit the schedule using as given below:
// 
// title : HTML
// venue : HTML
// time_formatted  : HTML
// time : date(yyyy-mm-dd) time(h:m:s) in ISO format; example "2016-10-11 0:00:00" 

var schedule = [
    {
        event       : "Pair Programming Meetup (Beginner Friendly)",
        venue       : "91springboard @ Plot No-44, Phase I, Kavuri Hills <br /> Hyderabad 500033",
        time_formatted        : "Sunday 16<sup>th</sup> October 2016 <br /> 2:00 pm - 4:00 pm",
        time    : "2016-10-16 14:00:00",
    },
    {
        event       : "Live Coding Meetup",
        venue       : "FissionLabs @ 703/A, Road #36, Jubliee Hills <br /> Hyderabad 500033",
        time_formatted        : "Saturday 22<sup>nd</sup> October 2016 <br /> 2:00 pm - 5:00 pm",
        time    : "2016-10-22 14:00:00",
    },
];

var interval;

function countdown() {
    if(schedule.length <= 0) {
        $(".holder").html("<h2>None Scheduled</h2>");
        return;
    }

    interval = setInterval(function(){time_diff(schedule[0]["time"]);}, 500);
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

    if(secs < 0) {
        clearInterval(interval);
        
        schedule.shift();
        countdown();
        return;
    }

    $("#event").html(schedule[0]["event"]);
    $("#venue").html(schedule[0]["venue"]);
    $("#date").html(schedule[0]["time_formatted"]);
    
    $("#days").text(days);
    $("#hours").text(hours);
    $("#mins").text(mins);
    $("#secs").text(secs);
    return;
}

countdown();