// Counts down the remaining time to next_meetup specified below, and puts output in <div id="countdown">

// Follows structure as given below:
//
// <div id="countdown">
//     <div id = "days"></div>
//     <div id = "hours"></div>
//     <div id = "mins"></div>
//     <div id = "secs"></div>
// </div>

document.getElementById("event").innerHTML = "Pair Programming Meetup (Beginner Friendly)"; 
document.getElementById("venue").innerHTML = "91springboard @ Plot No-44, Phase I, Kavuri Hills <br /> Hyderabad 500033";
document.getElementById("date").innerHTML = "Sunday 16<sup>th</sup> October 2016<br />2:00 pm - 4:00 pm";

var next_meetup = "2016-10-16 14:00:00"; //specify date(yyyy-mm-dd) time(h:m:s) in ISO format; example "2016-10-11 0:00:00" 
countdown(next_meetup);

function countdown(to) {
    setInterval(function(){time_diff(to);}, 500);
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
    
    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("mins").innerHTML = mins;
    document.getElementById("secs").innerHTML = secs;
}
