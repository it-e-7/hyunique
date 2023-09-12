const checkbox = document.getElementById('follower-toggle');
const label = document.getElementById('follower-label');
let userImg;
let userBackimg;
let imgList = []; // 이미지 리스트 초기화

$(document).ready(function() {
	// 프로필 사진 업로드
	  $("#profile-preview").click(function() {
		  $("#profile-file-input").click();
	  });
		
	  // 배경 사진 업로드
	  $("#back-preview").click(function() {
		  $("#back-file-input").click();
	  });
		
	// 프로필 사진 변경
	  $("#profile-file-input").change(function(e) {
	      handleImageUpload(e, '#profile-preview', 280); 
	  });

	  // 배경 사진 변경
	  $("#back-file-input").change(function(e) {
	      handleImageUpload(e, '#back-preview', 760); 
	  });

	  
	  var userSex = "${user.userSex}";
	  $("input[name='userSex'][value='" + userSex + "']").prop("checked", true);
	  $("#userUpdateForm").submit(function(event) {
	        event.preventDefault(); 
	        updateUser();
	    });
	  
	  userPostList(userId);
	  
});
document.getElementById('updateLink').addEventListener('click', function(e) {
    e.preventDefault(); // 기본 링크 동작을 취소
    setTimeout(function() {
        window.location.href = 'update'; // 1초 후에 페이지 이동
    }, 500);
});
//이미지 업로드 및 미리보기 함수
function handleImageUpload(e, previewElement, newHeight) {
    const files = e.target.files;
    $.each(files, function(index, file) {
        if (!file.type.match("image/.*")) {
            alert("이미지 파일만 업로드할 수 있습니다.");
            return;
        }
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                const resizedDataURL = resizeImage(img, newHeight); // 세로 크기를 newHeight로 설정
                $(previewElement).attr("src", resizedDataURL);
                const imgData = resizedDataURL.split(',')[1];
                imgList.push(imgData);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    });
}

// 이미지 리사이징 함수
function resizeImage(image, newHeight) {
    const canvas = document.createElement('canvas');
    const aspectRatio = image.width / image.height;
    const newWidth = newHeight * aspectRatio;

    canvas.width = newWidth;
    canvas.height = newHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0, newWidth, newHeight);
    return canvas.toDataURL('image/jpeg');
}
//팔로우 버튼 텍스트 변경
checkbox.addEventListener('change', function() {
  if (this.checked) {
    label.innerText = '팔로잉 -';
  } else {
    label.innerText = '팔로우 +';
  }
});

//유저 정보 업데이트
function updateUser() {
    const sessionId = $('#session-id').val();
    const userNickname = $('input[name="userNickname"]').val();
    const userIntroduce = $('input[name="userIntroduce"]').val();
    const userSex = $("input[name='userSex']:checked").val();
    const userForm = $("input[name='userForm']").val();
    const userHeight = $('input[name="userHeight"]').val();
    const userPrefer = $('input[name="userPrefer"]:checked').map(function() {
        return $(this).val();
    }).get().join(',');
    const instagramUrl = $('input[name="instagramUrl"]').val();
    const twitterUrl = $('input[name="twitterUrl"]').val();
    const facebookUrl = $('input[name="facebookUrl"]').val();
    const userImgData = imgList[0];
    const userBackImgData = imgList[1];

    const requestData = {
        sessionId,
        userNickname,
        userIntroduce,
        userSex,
        userForm,
        userHeight,
        userPrefer,
        instagramUrl,
        twitterUrl,
        facebookUrl,
        userImg: userImgData,
        userBackimg: userBackImgData
    };

    $.ajax({
        url: `/user/updateUser`,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(requestData),
        success: function (response) {
            alert('업데이트 성공!');
            window.location.replace('/');
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
	      console.error('게시물을 불러오는 데 실패했습니다:', error);
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
	      console.error('옷장 정보를 불러오는 데 실패했습니다:', error);
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
        },
        error: function(error) {
            console.error("Error sending GET request:", error);
        }
    });
	
}
