$(document).ready(function() {
	$("#finish-nickname, #skip-usersex").click(function() {
		$("#form-nickname").hide();
		$("#form-usersex").css('display', 'flex');
	});
	$("#finish-usersex, #skip-usersex").click(function() {
		$("#form-usersex").hide();
		$("#form-userheight").css('display', 'flex');
	});
	$("#finish-userheight, #skip-usersex").click(function() {
		$("#form-userheight").hide();
		$("#form-userprefer").css('display', 'flex');
	});
	$("#finish-userprefer, #skip-usersex").click(function() {
		$("#form-userprefer").hide();
		$("#form-finished").css('display', 'flex');
	});
});
