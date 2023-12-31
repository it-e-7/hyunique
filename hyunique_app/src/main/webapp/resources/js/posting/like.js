const postId = document.getElementById('postId').value;

$(document).ready(function() {
	
	//좋아요 리스트 가져오기
	$.ajax({
		url: `/user/likeuser?postId=${postId}`,
		type: "GET",
		dataType: "json",
		success: function(data) {
			data.forEach(function(user) {
                const li = $("<li></li>").attr("onclick", `location.href='/user/${user.userId}'`);
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

function filterList() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const listItems = document.querySelectorAll('#followerList li');

    listItems.forEach(item => {
        const username = item.innerText.toLowerCase();
        if (username.includes(query)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
}