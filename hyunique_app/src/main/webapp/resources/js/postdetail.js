let imgIdx = 0;
let imgWidth = $(".img-slider-wrapper").width();

function moveToPost(postId) {
	location.href=`/hyunique/post/${postId}`;
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
