//유저 정보 업데이트

function updateUser() {
    const userNickname = $('input[name="userNickname"]').val();
    const userIntroduce = $('input[name="userIntroduce"]').val();
    const userSex = $("input[name='userSex']:checked").val();
    const userHeight = $('input[name="userHeight"]').val();
    let userPrefer = $('input[name="userPrefer"]:checked').map(function() {
        return $(this).val();
    }).get().join(',');    const instagramUrl = $('input[name="instagramUrl"]').val();
    const twitterUrl = $('input[name="twitterUrl"]').val();
    const facebookUrl = $('input[name="facebookUrl"]').val();
    const sessionId = document.getElementById('session-id').value;

    $.ajax({
        url: `/user/updateUser`,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            userNickname,
            userIntroduce,
            userSex,
            userHeight,
            userPrefer,
            instagramUrl,
            twitterUrl,
            facebookUrl
        }),
        success: function (response) {
            alert('업데이트 성공!');
            window.location.href = `${sessionId}`;
        },
        error: function (response) {
            alert('업데이트 실패: 다시 시도해주세요.');
        }
    });
}

$(document).ready(function() {
	  var userSex = "${user.userSex}";
	  $("input[name='userSex'][value='" + userSex + "']").prop("checked", true);
	});

//유저 게시글 썸네일, 이미지 세팅
function userPostList(userId) {
	  $.ajax({
	    url: `/user/userpostlist`,
	    type: 'GET',
	    data: { userId: userId },
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
function fetchClosetInfo(userId) {
	  $.ajax({
	    url: `/closet/${userId}`,
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
	  userPostList(userId);
	});
