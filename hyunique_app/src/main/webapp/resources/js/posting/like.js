const postId = document.getElementById('postId').value;
function moveToLike(postId) {
    console.log("함수 실행됨");
    const modal = document.getElementById('likeListModal');
    const close = document.querySelectorAll('.close'); 
    const frame = document.createElement('iframe');
    
    frame.src = `/user/likelist?postId=${postId}`;
    const content = document.getElementById('likeListContent');
    content.innerHTML = '';
    content.appendChild(frame);
    modal.style.display = 'block';
    
    close.forEach(function(button) {
        button.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    });

    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
}
$(document).ready(function() {
	
	//좋아요 리스트 가져오기
	$.ajax({
		url: `/user/likeuser?postId=${postId}`,
		type: "GET",
		dataType: "json",
		success: function(data) {
			data.forEach(function(user) {
				const li = $("<li></li>");
				const img = $("<img>").attr("src", user.userImg).attr("alt", "User Image").attr("width", 50);
				const nickname = $("<span></span>").text(user.userNickname);
				li.append(img);
				li.append(" ");
				li.append(nickname);
				$("#followerList").append(li);
			});
		},
		error: function(error) {
			console.error("Error fetching data: ", error);
			}
		});
	
});



