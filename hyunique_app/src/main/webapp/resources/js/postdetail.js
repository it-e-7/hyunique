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
const likeCountStrong = $('#like-count-strong');
let likeCount = +likeCountStrong.text().replace('명', '');
if(likeCount === 0) {
	$('#like-count-p').hide();
}

function likeTogglePost(postId) {
	let url = `/post/like`;
	let present = 'unselect';
	
	if($('.like-btn img').attr('src') !== likeBtnImgSrc[present]) {
		url = `/post/unlike`;
		present = 'selected';
		likeCount--;
		likeCountStrong.text(likeCount + '명');
		if(likeCount === 0) {
			$('#like-count-p').hide();
		}
	} else {
		likeCount++;
		likeCountStrong.text(likeCount + '명');
		$('#like-count-p').show();
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
		try {
			navigator.share({
				title: `@${userNickname}님의 스타일 | 더 hyunique하게`,
				url: location.href,
			}).then(() => {
				console.log("공유 완료");
			}).catch(console.log);
		} catch(err) {
			const t = document.createElement("textarea");
			document.body.appendChild(t);
			t.value = location.href;
			t.select();
			document.execCommand('copy');
			document.body.removeChild(t);
			toastr.info('클립보드에 복사되었습니다!');
		}
	} else {
		const t = document.createElement("textarea");
		document.body.appendChild(t);
		t.value = location.href;
		t.select();
		document.execCommand('copy');
		document.body.removeChild(t);
		toastr.info('클립보드에 복사되었습니다!');
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
	const scrollLeft = Math.round($('.img-slider-wrapper').scrollLeft());
	
	const newIdx = Math.round(scrollLeft / imgWidth);
	changeIndexCircle(newIdx);
	
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

/* 게시글 삭제 */

$("#delete-box").hide();

$(".post-delete-icon").click(function(){
    openModal();
});

$("#cancel-btn").click(function(){
    closeModal();
});


function deleteOnePost(postId) {
    loadingStart();
    $("#delete-box").hide();
    $('.delete-wrap').hide();

    ajax({
        url: `/post/${postId}`,
        type: 'DELETE',
        success: function(response) {
            loadingEnd();
            if (response === "success") {
                window.location.href = '/';
            }
            else {
                toastr.error('게시글을 삭제하지 못했어요. 관리자에게 연락해주세요');
            }
        },
        error: function(response) {
            console.error(response);
        },
    });
}


// 모달 열기
function openModal() {
    $("#delete-box").show();
    $('.delete-wrap').show();

    $('.delete-wrap').css({
        'overflow':'hidden'
    });

    $('.delete-wrap').on('scroll touchmove mousewheel click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    });

    $(".delete-wrap").show().on('click', function(e) {
      e.stopPropagation();
    });
}


// 모달 닫기
function closeModal() {
    $("#delete-box").hide();
    $('.delete-wrap').hide();

    $('.delete-wrap').css({
        'overflow': 'auto'
    });
    $('.delete-wrap').off('scroll touchmove mousewheel click');
}

function loadingStart() {
    $('.delete-loading-wrapper').css({
        'overflow':'hidden'
    });

    $('.delete-loading-wrapper').on('scroll touchmove mousewheel', function(event) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    });

    $('.delete-loading-wrapper').show();
    $("#loading-icon").show();
}

function loadingEnd() {
    $('.delete-loading-wrapper').css({
        'overflow': 'auto'
    });

    $('.delete-loading-wrapper').off('scroll touchmove mousewheel');
    $('.delete-loading-wrapper').hide();
    $("#loading-icon").hide();
}
