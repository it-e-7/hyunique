const productList = $('.backoffice-product-list');

function getProductData(day) {
	if($(`#${day}d-btn`).hasClass('filter-btn-selected')) return;
	productList.html('');
	toggleButtonClass(day);
	$.ajax({
		url: '/backoffice/product',
		type: 'POST',
		data: {
			day: day,
		},
		success: function(response) {
			let list = `<li>
							<div class="simple-wrapper">
								<p class="bold-p">순위</p>
								<p class="bold-p" style="width: 420px;padding-left: 21px;">제품</p>
							</div>
							<p class="bold-p">대표 게시물</p>
							<div class="simple-wrapper">
								<p class="bold-p">&#128147; 갯수</p>
								<p class="bold-p">태그 횟수</p>
							</div>
						</li>`;
			
			productList.html(response.forEach((product,idx) => {
				list += `<li>
							<div class="simple-wrapper hover-wrapper" onclick="location.href = '/product/${product.productId}'">
								<p class="product-rank">${status.index + 1}</p>
								<img src="${product.productImg}">
								<div class="product-inform-wrapper">
									<p>${product.productBrand }</p>
									<p>${product.productName }</p>
								</div>
							</div>
							<div class="simple-wrapper hover-wrapper" onclick="location.href = '/post/${product.postId}'">
								<img src="${product.thumbnailUrl }">
								<p class="user-nickname">${product.userNickname }</p>
							</div>
							<div class="simple-wrapper">
								<p class="bold-p like-p">${product.totalLike }</p>
								<p class="bold-p tag-p">${product.totalTag }</p>
							</div>
						</li>`;
			}));
			productList.html(list);
		},
		error: function(error) {
			console.log(error);
		}
	});
}

function toggleButtonClass(day) {
	$('#1d-btn').removeClass('filter-btn-selected');
	$('#7d-btn').removeClass('filter-btn-selected');
	$('#30d-btn').removeClass('filter-btn-selected');
	$('#90d-btn').removeClass('filter-btn-selected');
	$(`#${day}d-btn`).addClass('filter-btn-selected');
}