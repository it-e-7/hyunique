function backward() {
	history.back();
}

function moveToPost(postId) {
	location.href=`${url}/post/${postId}`;
}

function moveToProduct(productId) {
	location.href=`${url}/product/${productId}`;
}