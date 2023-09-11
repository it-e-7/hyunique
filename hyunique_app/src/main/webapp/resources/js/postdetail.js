let imgIdx = 0;
const imgWidth = Math.round($(".img-slider-wrapper").width());
const likeBtnImgSrc = {
	unselect: `/resources/img/ic-like.png`,
	selected: `/resources/img/ic-like-selected.png`,
};
const likeToggle = {
	selected: 'unselect',
	unselect: 'selected',
};

function likeTogglePost(postId) {
	let url = `/post/like`;
	let present = 'unselect';
	
	if($('.like-btn img').attr('src') !== likeBtnImgSrc[present]) {
		url = `/post/unlike`;
		present = 'selected';
	}
	
	$('.like-btn img').css("transform", "scale(0.8)");
	$('.like-btn img').attr('src', likeBtnImgSrc[likeToggle[present]]);
	setTimeout(() => {
		$('.like-btn img').css("transform", "scale(1)");
	}, 100);
	
	ajax({
		url,
		type: 'POST',
		data: {
			postId
		},
		success: function(response) {
			
		}
	});
}

function sharePost(userNickname) {
	if(isMobile()) {
		navigator.share({
			title: `@${userNickname}님의 스타일 | 더 hyunique하게`,
			url: location.href,
		}).then(() => {
			console.log("공유 완료");
		}).catch(console.log);
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

function toggleFollow(userId) {
	const btn = $('#follow-btn');
	
	if(btn.hasClass('jw-btn-nonshadow')) {
		btn.attr('class', 'jw-btn-selected');
		btn.text('팔로잉');
		ajax({
			url: `/user/follow`,
			type: 'POST',
			data: { userId, },
			success: function(response) {
				
			},
			error: function(response) {
				console.error(response);
			},
		});
	} else {
		btn.attr('class', 'jw-btn-nonshadow');
		btn.text('팔로우');
		ajax({
			url: `/user/unfollow`,
			type: 'POST',
			data: { userId, },
			success: function(response) {
				
			},
			error: function(response) {
				console.error(response);
			},
		});
	}
}

function togglePin(e) {
	if(e.target.closest('.post-pin')) return;
	if(e.target.closest('.img-slider-wrapper').scrollLeft !== 0) return;
	$('.post-pin').each((idx, pin) => {
		if(pin.style.display !== 'none') {
			pin.style.display = 'none';
			$('.tag-btn').css('opacity', '0.7');
		} else {
			pin.style.display = 'block';
			$('.tag-btn').css('opacity', '1');
		}
	});
}

$('.img-slider-wrapper').click(togglePin);

$('.img-slider-wrapper').scroll(() => {
	const scrollLeft = Math.round($('.img-slider-wrapper').scrollLeft())
	if(scrollLeft % imgWidth === 0) {
		const newIdx = scrollLeft / imgWidth;
		changeIndexCircle(newIdx);
	}
});

function changeIndexCircle(newIdx) {
	$(`#index-circle-${imgIdx}`).removeClass('img-index-selected');
	$(`#index-circle-${newIdx}`).addClass('img-index-selected');
	imgIdx = newIdx;
}

$(document).ready(() => {
	$('.img-slider-wrapper').scrollLeft(0);
	changeIndexCircle(imgIdx);
});
