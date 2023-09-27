const userId = document.getElementById('userId').value;

$(document).ready(function() {
	//팔로워 리스트 가져오기
	$.ajax({
		url: `/user/follower?userId=${userId}`,
		type: "GET",
		dataType: "json",
		success: function(data) {
            loading();
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
	
	//팔로잉 리스트 가져오기
	$.ajax({
		url: `/user/following?userId=${userId}`,
		type: "GET",
		dataType: "json",
		success: function(data) {
		    loading();
			data.forEach(function(user) {
                const li = $("<li></li>").attr("onclick", `location.href='/user/${user.userId}'`);
				const img = $("<img>").attr("src", user.userImg).attr("alt", "User Image").attr("width", 50);
				const nickname = $("<span></span>").text(user.userNickname);
				li.append(img);
				li.append(" ");
				li.append(nickname);
				$("#followingList").append(li);
			});
		},
		error: function(error) {
			console.error("Error fetching data: ", error);
		}
	});
});



function loading() {
    $('#loading-icon').hide();
}