let page = 0;
const productId = new URL(location.href).searchParams.get('productId');
const gridBox = $('.post-thumbnail-list-wrapper');
let scrollLock = false;

function moveToPost(postId) {
	location.href=`/hyunique/post/${postId}`;
}

function moveToProduct(productId) {
	location.href=`/hyunique/product/${productId}`;
}

getNextPost();

function getNextPost() {
	if(scrollLock) return; 
	scrollLock = true;
	$.ajax({
	    url: `/hyunique/product/style/post?productId=${productId}&page=${page}`,
	    type: 'GET',
	    success: function (response) {
	    	console.log(response);
	    	response.forEach((post) => {
	    		gridBox.append(`<img src="${post.thumbnailUrl}"
	    						onclick="moveToPost('${post.postId}')" />`);
	    	});
	        scrollLock = false;
	    },
	    error: function (response) {
	    	console.log(response);
	    	scrollLock = false;
	    }
	});
}

function isScrollbarAtBottom() {
    const element = document.documentElement;
    const scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (element.scrollTop || 0);
    const scrollHeight = (element.scrollHeight !== undefined) ? element.scrollHeight - 5 : 0;
    const windowHeight = element.clientHeight || window.innerHeight;

    return scrollTop + windowHeight >= scrollHeight; // 스크롤바가 가장 아래에 있는 경우 true를 반환
}

$(window).scroll(function() {
    if(isScrollbarAtBottom()) {
    	if (scrollLock) return;
        getNextPost();
    }
});