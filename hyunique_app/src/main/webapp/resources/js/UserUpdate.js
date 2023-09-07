const checkbox = document.getElementById('follower-toggle');
const label = document.getElementById('follower-label');

$(document).ready(function() {
	  var userSex = "${user.userSex}";
	  $("input[name='userSex'][value='" + userSex + "']").prop("checked", true);
	  $("#userUpdateForm").submit(function(event) {
	        event.preventDefault(); 
	        updateUser();
	    });
	  
	  userPostList(userId);
	  
});

//팔로우 버튼 텍스트 변경
checkbox.addEventListener('change', function() {
  if (this.checked) {
    label.innerText = '팔로잉 -';
  } else {
    label.innerText = '팔로우 +';
  }
});

//유저 정보 삽입
function updateUser() {
    const userNickname = $('input[name="userNickname"]').val();
    const userIntroduce = $('input[name="userIntroduce"]').val();
    const userSex = $("input[name='userSex']:checked").val();
    const userHeight = $('input[name="userHeight"]').val();
    const sessionId = $('#session-id').val(); 
    let userPrefer = $('input[name="userPrefer"]:checked').map(function() {
        return $(this).val();
    }).get().join(',');
    const instagramUrl = $('input[name="instagramUrl"]').val();
    const twitterUrl = $('input[name="twitterUrl"]').val();
    const facebookUrl = $('input[name="facebookUrl"]').val();

    $.ajax({
        url: `/user/updateUser`,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            sessionId,
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
            window.location.replace(`/user/${sessionId}`);
        },
        error: function (response) {
            alert('업데이트 실패: 다시 시도해주세요.');
        }
    });
}

//유저 게시글 썸네일, 이미지 세팅
function userPostList(userId) {
	  $.ajax({
	    url: `/user/userpostlist`,
	    type: 'GET',
	    data: { userId: userId },
	    success: function(posts) {
	      var thumbnailsDiv = $('#thumbnails');
	      thumbnailsDiv.empty();
	      posts.forEach(function(post) {
	    	  var thumbnailImage = $('<img/>', {
	    	    src: post.thumbnailUrl,
	    	    class: 'thumbnail-image'
	    	  });

	    	  var postLink = $('<a/>', {
	    	    href: `/post/` + post.postId
	    	  });

	    	  postLink.append(thumbnailImage);
	    	  thumbnailsDiv.append(postLink);
	    	});

	    },
	    error: function(error) {
	      console.log('게시물을 불러오는 데 실패했습니다:', error);
	    }
	  });
}

//옷장 아이템 추가
function fetchClosetInfo(userId) {
	  $.ajax({
	    url: `/closet/${userId}`,
	    type: 'GET',
	    success: function(closetItems) {
	      var closetDiv = $('#closet');
	      closetDiv.empty();

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

	        closetDiv.append(productDiv);
	      });
	    },
	    error: function(error) {
	      console.log('옷장 정보를 불러오는 데 실패했습니다:', error);
	    }
	  });
	}

//게시글 작성 이동
function movePostPage() {
	$.ajax({
        type: "GET",
        url: '/post',
        success: function(response) {
        	window.location.href = '/post';
            console.log("success");
        },
        error: function(error) {
            console.error("Error sending GET request:", error);
        }
    });
	
}
