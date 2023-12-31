const checkbox = document.getElementById('follower-toggle');
const label = document.getElementById('follower-label');

let userIdFromModel =""

let isFollowing = null;
let userImg;
let userBackimg;
let userImgData = null;
let userBackImgData = null;
const userFollowP = $('#user-follower');

$(document).ready(function() {
	if($('#user-isFollowing').length > 0){
        isFollowing = document.getElementById('user-isFollowing').value;
    }
	if($('#user-id').length>0){
		userIdFromModel = document.getElementById('user-id').value;
	}
    // 체크박스와 라벨이 실제로 존재할 때만 실행
    if(checkbox && label) {
        if(isFollowing !== null) {
            if (Number(isFollowing) === 1) {
                checkbox.checked = true;
                label.innerText = '팔로잉 -';
            } else {
                checkbox.checked = false;
                label.innerText = '팔로우 +';
            }
        }
    }

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
		  handleImageUpload(e, '#profile-preview', 280, 'profile'); 
	  });
	
	  // 배경 사진 변경
	  $("#back-file-input").change(function(e) {
		  handleImageUpload(e, '#back-preview', 760, 'back'); 
	  });
	
	  
	  const userSex = "${user.userSex}";
	  $("input[name='userSex'][value='" + userSex + "']").prop("checked", true);
	  $("#userUpdateForm").submit(function(event) {
	        event.preventDefault(); 
	        updateUser();
	    });
	  if($('#user-id').length>0){
		  	userPostList(userIdFromModel);
		}
});

document.getElementById('updateLink').addEventListener('click', function(e) {
    e.preventDefault(); // 기본 링크 동작을 취소
    setTimeout(function() {
        window.location.href = 'update'; // 1초 후에 페이지 이동
    }, 500);
});

//이미지 업로드 및 미리보기 함수
function handleImageUpload(e, previewElement, newHeight, type) {
    const files = e.target.files;
    $.each(files, function(index, file) {
        if (!file.type.match("image/.*")) {
        	toastr.warning('이미지 파일만 업로드할 수 있습니다.');
            return;
        }
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                const resizedDataURL = resizeImage(img, newHeight); // 세로 크기를 newHeight로 설정
                $(previewElement).attr("src", resizedDataURL);
                const imgData = resizedDataURL.split(',')[1];
                if (type === 'profile') {
                  userImgData = imgData;
                } else if (type === 'back') {
                  userBackImgData = imgData;
                }
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


function toggleFollow(userId) {
	  const url = checkbox.checked ? '/user/follow' : '/user/unfollow';
	  
	  if (checkbox.checked)  {
		 label.innerText = '팔로잉 -';
		 userFollowP.text(`${+userFollowP.text().replace('명','') + 1}명`);
	    ajax({
	      url: `/user/follow`,
	      type: 'POST',
	      data: { userId },
	      success: function(response) {
	      },
	      error: function(response) {
	        console.error(response);
	      },
	    });
	  } else {
		  label.innerText = '팔로우 +';
		  userFollowP.text(`${+userFollowP.text().replace('명','') - 1}명`);
	    ajax({
	      url: `/user/unfollow`,
	      type: 'POST',
	      data: { userId },
	      success: function(response) {
	      },
	      error: function(response) {
	        console.error(response);
	      },
	    });
	  }
	}


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
    let instagramUrl = $('input[name="instagramUrl"]').val();
    if (instagramUrl && !instagramUrl.startsWith('https://www.instagram.com/')) {
        instagramUrl = 'https://www.instagram.com/' + instagramUrl;
    }
    
    let twitterUrl = $('input[name="twitterUrl"]').val();
    if (twitterUrl && !twitterUrl.startsWith('https://www.x.com/')) {
    	twitterUrl = 'https://www.x.com/' + twitterUrl;
    }
    
    let facebookUrl = $('input[name="facebookUrl"]').val();
    if (facebookUrl && !facebookUrl.startsWith('https://www.facebook.com/')) {
    	facebookUrl = 'https://www.facebook.com/' + facebookUrl;
    }
    const userAddress = $('#sample3_address').val() + $('#sample3_detailAddress').val() + $('#sample3_extraAddress').val();
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
        userBackimg: userBackImgData,
        userAddress
    };
    console.log(requestData);
    $.ajax({
        url: `/user/updateUser`,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(requestData),
        success: function (response) {
        	toastr.success('성공적으로 회원 정보 수정을 완료했습니다.');
        	setTimeout(function(){
            	window.location.replace('/login');
        	}, 1000);
        },
        error: function (response) {
        	toastr.error('회원 정보 수정에 실패했어요. 관리자에게 문의해주세요');
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
	    	    class: 'thumbnail-image',
	            });

	    	  var postLink = $('<a/>', {
	    	    href: `/post/` + post.postId
	    	  });
	    	  postLink.attr('data-aos', 'zoom-in-up');
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
function showFallbackImage() {
    document.getElementById('fallback-img').style.display = 'block';
    document.getElementById('backward-btn').style.display = 'none';
}