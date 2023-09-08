let searchResultPage = 1;

function hideSearchModal(e) {
	if(!e.target.closest('.search-area-wrapper')) {
		$('.header-search-area').css('display', 'none');
		$('body').css('overflow-y', 'scroll');
	}
}

function displaySearch() {
	$('.header-search-area').css('display', 'block');
	$('body').css('overflow-y', 'hidden');
}

function getSearchResult(keyword, callback) {
	$.ajax({
		url: `/product/nsearch`,
	    type: 'POST',
	    data: {
	    	keyword,
	    	page: searchResultPage,
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

$('#search-input').keyup((e) => {
	searchResultPage = 1;
	getSearchResult(e.target.value, changeList);
});

$('.product-list').scroll((e) => {
	if(isSearchScrollbarAtBottom()) {
		searchResultPage++;
		getSearchResult($('#search-input').val(), addList);
	}
});