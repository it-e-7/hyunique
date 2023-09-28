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

function followerFilterList() {
    const query = document.getElementById('searchInput1').value.toLowerCase();
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
function followingFilterList() {
	const query = document.getElementById('searchInput2').value.toLowerCase();
	const listItems = document.querySelectorAll('#followingList li');
	
	listItems.forEach(item => {
		const username = item.innerText.toLowerCase();
		if (username.includes(query)) {
			item.style.display = '';
		} else {
			item.style.display = 'none';
		}
	});
}

function loading() {
    $('#loading-icon').hide();
}