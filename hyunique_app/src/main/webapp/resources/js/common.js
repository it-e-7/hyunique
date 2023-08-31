function backward() {
	history.back();
}

function moveToPost(postId) {
	location.href=`/post/${postId}`;
}

function moveToProduct(productId) {
	location.href=`/product/${productId}`;
}

const isMobile = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
