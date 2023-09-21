$(document).ready(function() {
	$("#finish-nickname").click(function() {
		$("#form-nickname").animate({left: "-100%"}, 500, function(){
			$(this).hide();
		});
		$("#form-usersex").css('right', '-100%').show().animate({right: "0"}, 500);
	});
	
	
	$("#finish-usersex, .skip-buttons").click(function() {
		$("#form-usersex").animate({left: "-100%"}, 500, function(){
			$(this).hide();
		});
		$("#form-userheight").css('right', '-100%').show().animate({right: "0"}, 500);
	});
	
	$("#finish-userheight, .skip-buttons").click(function() {
		$("#form-userheight").animate({left: "-100%"}, 500, function(){
			$(this).hide();
		});
		$("#form-userprefer").css('right', '-100%').show().animate({right: "0"}, 500);
	});
	
	$("#finish-userprefer, .skip-buttons").click(function() {
		$("#form-userheight").animate({left: "-100%"}, 500, function(){
			$(this).hide();
		});
		$("#form-userprefer").css('right', '-100%').show().animate({right: "0"}, 500);
	});
	
	$("#finish-userprefer,.skip-buttons").click(function() {
		$("#form-userprefer").hide();
		$("#form-finished").css('display', 'flex');
	});
});
