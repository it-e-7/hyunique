let searchResultPage = 0;

function hideSearchModal(e) {
	if(!e.target.closest('.search-area-wrapper')) {
		hideSearch();
	}
}

function displaySearch() {
	$('.header-search-area').css('display', 'block');
	$('body').css('overflow-y', 'hidden');
}

function hideSearch() {
	$('.header-search-area').css('display', 'none');
	$('body').css('overflow-y', 'scroll');
}

function getSearchResult(keyword, callback) {
	$.ajax({
		url: `/product/nsearch`,
	    type: 'POST',
	    data: {
	    	keyword,
	    	offset: searchResultPage,
	    },
	    success: function (response) {
	    	const listItems = response.map(product => 
	    		(`<li onclick="moveToProduct('${product.productId}')">
					<img src="${product.productImg}"/>
					<div>
						<strong>${product.productBrand}</strong>
						<p class="product-item-name">${product.productName}</p>
						<p class="product-item-price">
							&#8361;${product.productPrice.toLocaleString('ko-KR')}
						</p>
					</div>
	    		</li>`)
	    	).join('');
	    	callback(listItems);
	    },
	    error: function (response) {
	    	console.error(response);
	    }
	});
}

function isSearchScrollbarAtBottom() {
    const element = document.getElementsByClassName('product-list')[0];
    const scrollTop = (element.pageYOffset !== undefined) ? element.pageYOffset : (element.scrollTop || 0);
    const scrollHeight = (element.scrollHeight !== undefined) ? element.scrollHeight - 5 : 0;
    const windowHeight = element.clientHeight || element.innerHeight;
    
    return scrollTop + windowHeight >= scrollHeight; // 스크롤바가 가장 아래에 있는 경우 true를 반환
}

function changeList(listItems) {
	$('.product-list').html(listItems);
}

function addList(listItems) {
	$('.product-list').append(listItems);
}

$('.header-search-area').click(hideSearchModal);

let timer;
$('#search-input').keyup((e) => {
	searchResultPage = 0;
	
	if(timer) {
		clearTimeout(timer);
	}
	timer = setTimeout(() => {
		getSearchResult(e.target.value, changeList);
	}, 300);

	$('.search-area-wrapper').css('height', '70%');
});

$('#search-input').click(function() {
    $('.product-list').show();
    $('.search-area-wrapper').css('height', '70%');
})

$('.product-list').scroll((e) => {
	if(isSearchScrollbarAtBottom()) {
		searchResultPage++;
		getSearchResult($('#search-input').val(), addList);
	}
});

$("#img-search-btn").click(function() {
    $("#imgInput").val("");
    $("#imgInput").click();
});

$("#imgInput").change(imgSearchStart);

function imgSearchStart(e) {
    const file = e.target.files[0];
    if (!file.type.match("image/.*")) {
        alert("이미지 파일만 업로드할 수 있습니다.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        localStorage.setItem('image', event.target.result);
        window.location.href = '/product/img-search';
    };
    reader.readAsDataURL(file);

    $.ajax({
        url: `/product/img-search`,
        type: 'GET',
        success: function (response) {
            window.location.href = "/product/img-search";
        },
        error: function (response) {
        }
    });
}
