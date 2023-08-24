let imgIdx = 0;
let imgWidth = $(".img-slider-wrapper").width();

function follow(follower, following) {
	console.log(follower, following);
}

function moveToPost(postId) {
	location.href=`/hyunique/post/${postId}`;
}

function moveToProduct(productId) {
	location.href=`/hyunique/product/${productId}`;
}

$('.img-slider-wrapper').scroll(() => {
	if($('.img-slider-wrapper').scrollLeft() % imgWidth === 0) {
		const newIdx = $('.img-slider-wrapper').scrollLeft() / imgWidth;
		changeIndexCircle(newIdx);
	}
});

function changeIndexCircle(newIdx) {
	console.log(newIdx);
	$(`#index-circle-${imgIdx}`).removeClass('img-index-selected');
	$(`#index-circle-${newIdx}`).addClass('img-index-selected');
	imgIdx = newIdx;
}

changeIndexCircle(imgIdx);
