//유저 정보 업데이트
function updateUser() {
    const userNickname = $('input[name="userNickname"]').val();
    const userIntroduce = $('input[name="userIntroduce"]').val();
    const userSex = $('#userSex').val();
    const userHeight = $('input[name="userHeight"]').val();
    const instagramUrl = $('input[name="instagramUrl"]').val();
    const twitterUrl = $('input[name="twitterUrl"]').val();
    const facebookUrl = $('input[name="facebookUrl"]').val();

    $.ajax({
        url: `/user/updateUser`,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            userNickname,
            userIntroduce,
            userSex,
            userHeight,
            instagramUrl,
            twitterUrl,
            facebookUrl
        }),
        success: function (response) {
            alert('업데이트 성공!');
            window.location.href = 'myStylePage';
        },
        error: function (response) {
            alert('업데이트 실패: 다시 시도해주세요.');
        }
    });
}

//유저 성별 미리 설정
//수정필요
$(document).ready(function() {
	const userSex = "${user.userSex}"; // 서버에서 가져온 성별 값을 할당

	$("#userSex option").each(function() {
	  if ($(this).val() === userSex) {
	    $(this).prop('selected', true); // prop 메서드로 선택 상태 설정
	  }
	});
});

//유저 게시글 썸네일, 이미지 세팅
function userPostList(sessionId) {
	  $.ajax({
	    url: `/user/userpostlist`,
	    type: 'GET',
	    data: { userId: sessionId },
	    success: function(posts) {
	      var thumbnailsDiv = $('#thumbnails');
	      thumbnailsDiv.empty(); // 기존 썸네일 이미지 제거
	      posts.forEach(function(post) {
	    	  var thumbnailImage = $('<img/>', {
	    	    src: post.thumbnailUrl,
	    	    class: 'thumbnail-image'
	    	  });

	    	  var postLink = $('<a/>', {
	    	    href: `/post/` + post.postId
	    	  });

	    	  postLink.append(thumbnailImage);
	    	  thumbnailsDiv.append(postLink); // 하이퍼링크로 된 썸네일 이미지 추가
	    	});

	    },
	    error: function(error) {
	      console.log('게시물을 불러오는 데 실패했습니다:', error);
	    }
	  });
	}
function fetchClosetInfo(sessionId) {
	  $.ajax({
	    url: `/closet/${sessionId}`,
	    type: 'GET',
	    success: function(closetItems) {
	      var closetDiv = $('#closet'); // HTML에서 옷장 정보를 표시할 div
	      closetDiv.empty(); // 기존 옷장 아이템 제거

	      closetItems.forEach(function(item) {
	        var productImage = $('<img/>', {
	          src: item.productImg,
	          class: 'thumbnail-image'
	        });

	        var productInfo = $('<div/>', {
	          text: item.typeName
	        });

	        var productDiv = $('<div/>');
	        productDiv.append(productImage);
	        productDiv.append(productInfo);

	        closetDiv.append(productDiv); // 옷장 아이템 추가
	      });
	    },
	    error: function(error) {
	      console.log('옷장 정보를 불러오는 데 실패했습니다:', error);
	    }
	  });
	}

$(document).ready(function() {
	  userPostList(sessionId);
	});
