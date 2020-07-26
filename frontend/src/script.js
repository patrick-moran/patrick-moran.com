


// new Date($.now());



var dt = new Date();
var time = dt.getHours();

console.log(time);
// document.write(time);

// $(Date).addClass(a);


if (time >= 18 || time <= 6) {
    $('.paragraph').addClass('nightmode');
    $('.zoo').addClass('nightmode');
}