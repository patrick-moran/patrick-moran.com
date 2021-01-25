

// get hour of the day
var dt = new Date();
var time = dt.getHours();

// if night time, add "nightmode" class
if (time >= 18 || time <= 6) {
    $('.paragraph').addClass('nightmode');
    $('.zoo').addClass('nightmode');
}