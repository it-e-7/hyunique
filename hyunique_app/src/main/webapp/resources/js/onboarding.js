$(document).ready(function() {
	$("#finish-nickname").click(function() {
		let nickname = $("#userNickname").val();
	    if (nickname === '') {
	    	toastr.warning('닉네임을 입력해주세요');
	    	return;
	    }
		$("#form-nickname").hide();
		$("#form-usersex").css('display', 'flex');
	});
	$("#finish-usersex, #usersex-skip").click(function() {
		$("#form-usersex").hide();
		$("#form-userheight").css('display', 'flex');
	});
	$("#finish-userheight, #userheight-skip").click(function() {
		$("#form-userheight").hide();
		$("#form-userprefer").css('display', 'flex');
	});
	$("#finish-userprefer, #userprefer-skip").click(function() {
		$("#form-userprefer").hide();
		$("#form-finished").css('display', 'flex');
	});
});
