function updateUser() {
    const userNickname = $('input[name="userNickname"]').val();
    const userIntroduce = $('input[name="userIntroduce"]').val();
    const userSex = $('input[name="userSex"]:checked').val();
    const instagramUrl = $('input[name="instagramUrl"]').val();
    const twitterUrl = $('input[name="twitterUrl"]').val();
    const facebookUrl = $('input[name="facebookUrl"]').val();

    $.ajax({
        url: '/hyunique/user/updateUser',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            userNickname,
            userIntroduce,
            userSex,
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

function userPostList(sessionId) {
	  $.ajax({
	    url: '/hyunique/user/userpostlist',
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
	    	    href: '/hyunique/post/' + post.postId
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