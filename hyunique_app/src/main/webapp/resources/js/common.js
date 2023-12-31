$.getScript('https://cdn.lordicon.com/bhenfmcm.js');

function ajax(config) {
	const success = config.success;
	config.success = (response) => {
		try {
			response = JSON.parse(response);
			if(response.redirect) {
		    	toastr.success(response.msg);
				window.location.href = response.redirect;
				return;
			}
		} catch (err) {
			console.error(err);
		}
		if(success) {
			success(response);
		}
	}
	$.ajax(config);
}

function backward() {
	setTimeout(function() {
		history.back();
	}, 600);
}

function moveToPost(postId) {
	location.href=`/post/${postId}`;
}

function moveToProduct(productId) {
	location.href=`/product/${productId}`;
}

const isMobile = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

function moveToFollow(userId) {
    $('#loading-icon').show();
    location.href=`/user/followlist?userId=${userId}`;
}

function moveToLike(postId) {
	location.href=`/user/likelist?postId=${postId}`;
  $('#loading-icon').show();
}

function moveToUser(userId){
	location.href = `/user/${userId}`;
}