$.getScript('https://cdn.lordicon.com/bhenfmcm.js');

function ajax(config) {
	const success = config.success;
	console.log("ajax들어옴");
	config.success = (response) => {
		try {
			response = JSON.parse(response);
			if(response.redirect) {
				alert(response.msg);
				window.location.href = response.redirect;
				console.log(response.redirect);
				return;
			}
		} catch (err) {
			console.log(err);
		}
		if(success) {
			success(response);
		}
	}
	console.log("ajax거침");
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

