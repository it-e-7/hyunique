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
	
	$('.like-btn img').css("transform", "scale(0.8)");
	$('.like-btn img').attr('src', likeBtnImgSrc[likeToggle[present]]);
	setTimeout(() => {
		$('.like-btn img').css("transform", "scale(1)");
	}, 100);
	
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

function sharePost(userNickname) {
	if(navigator.share && (isMobile.apple.phone || isMobile.android.phone)) {
		navigator.share({
			title: `@${userNickname}님의 스타일 | 더 hyunique하게`,
			text: `하이`,
			url: location.href,
		}).then(() => {
			console.log('공유 완료');
		}).catch(console.error);
	} else {
		const t = document.createElement("textarea");
		document.body.appendChild(t);
		t.value = location.href;
		t.select();
		document.execCommand('copy');
		document.body.removeChild(t);
		alert('클립보드에 복사되었습니다 !');
	}
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

$(document).ready(() => {
	$('.img-slider-wrapper').scrollLeft(0);
	console.log($('.img-slider-wrapper').scrollLeft());
	changeIndexCircle(imgIdx);
});
