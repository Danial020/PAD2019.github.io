$(document).ready(function() {
	$(window).scroll(function() {
  	if($(document).scrollTop() > 50) {
    	$('.container').addClass('shrink');
    }
    else {
    $('.container').removeClass('shrink');
    }
  });
});