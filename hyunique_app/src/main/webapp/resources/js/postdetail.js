let imgIdx = 0;
const imgWidth = $(".img-slider-wrapper").width();
const likeBtnImgSrc = {
	unselect: '/hyunique/resources/img/ic-like.png',
	selected: '/hyunique/resources/img/ic-like-selected.png',
};
const likeToggle = {
	selected: 'unselect',
	unselect: 'selected',
};

function follow(following) {
	console.log(following);
}

function likeTogglePost(postId) {
	let url = `/hyunique/post/like`;
	let present = 'unselect';
	
	if($('.like-btn img').attr('src') !== likeBtnImgSrc[present]) {
		url = `/hyunique/post/unlike`;
		present = 'selected';
	}
	
	$('.like-btn img').attr('src', likeBtnImgSrc[likeToggle[present]]);
	
	$.ajax({
		url,
		type: 'POST',
		data: {
			postId
		},
		success: function(response) {
			console.log(response);
		}
	});
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

$(document).ready(() => {
	$('.img-slider-wrapper').scrollLeft(0);
	console.log($('.img-slider-wrapper').scrollLeft());
});
