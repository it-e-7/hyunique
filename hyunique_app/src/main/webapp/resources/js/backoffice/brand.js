const ctx = document.getElementById('brand-chart').getContext('2d');
const brandList = $('.qr-dashboard-product-wrapper ul');

const options = {
	animation: {
		animateRotate: true,
		animateScale: true,
	},
	aspectRatio: 1.4,
};

let brandTagData = {
	datasets: [{
        data: [],
        backgroundColor: [],
    }],
    labels: [],
}

let brandPriceData = {
	datasets: [{
        data: [],
        backgroundColor: [],
    }],
    labels: [],
}

let tagLi = '';
let priceLi = '';

let category = 'tag';

let myDoughnutChart = '';

function drawChart(chartData) {
	if(myDoughnutChart !== '') {
		myDoughnutChart.destroy();
	}
	myDoughnutChart = new Chart(ctx, {
	    type: 'doughnut',
	    data: chartData,
	    options: options
	});
}

function drawTagData() {
	category = 'tag';
	toggleCategoryButtonClass(category);
	drawChart(brandTagData);
	brandList.html(tagLi);
}

function drawPriceData() {
	category = 'price';
	toggleCategoryButtonClass(category);
	drawChart(brandPriceData);
	brandList.html(priceLi);
}

function sortByTagScore(a, b) {
	return b.tagScore - a.tagScore;
}

function sortByPrice(a, b) {
	return b.totalPrice - a.totalPrice;
}

function getBrandData(day) {
	if($(`#${day}d-btn`).hasClass('filter-btn-selected')) return;
	brandList.html('');
	toggleButtonClass(day);
	$.ajax({
		url: '/backoffice/brand',
		type: 'POST',
		data: {
			day: day,
		},
		success: function(response) {
			brandTagData.datasets[0].data = [];
			brandTagData.datasets[0].backgroundColor = [];
			brandTagData.labels = [];
			brandPriceData.datasets[0].data = [];
			brandPriceData.datasets[0].backgroundColor = [];
			brandPriceData.labels = [];
			
			tagLi = `<li class="title-li">
					<div class="simple-wrapper">
						<p>순위</p>
						<p>브랜드명</p>
					</div>
					<div  class="simple-wrapper">
						<p>&#128147; 갯수</p>
						<p>태그 횟수</p>
					</div>
					</li>`;
			priceLi = `<li class="title-li">
					<div class="simple-wrapper">
						<p>순위</p>
						<p>브랜드명</p>
					</div>
					<p>매출액</p>
					</li>`
			response.sort(sortByTagScore);
			response.filter(brand => brand.tagScore > 0).slice(0, 15).forEach((brand, idx) => {
				brandTagData.datasets[0].data.push(brand.tagScore);
				brandTagData.datasets[0].backgroundColor.push(makeRandomColor());
				brandTagData.labels.push(brand.productBrand);
				
				tagLi += `<li class="hover-li">
							<div class="simple-wrapper">
								<p class="rank-p">${idx + 1}</p>
								<p class="brand-p">${brand.productBrand}</p>
							</div>
							<div  class="simple-wrapper">
								<p class="like-p">${brand.totalLike}개</p>
								<p class="tag-p">${brand.totalTag}회</p>
							</div>
						</li>`;
			});
			
			response.sort(sortByPrice);
			console.log(response);
			response.filter(brand => brand.totalPrice > 0).slice(0, 15).forEach((brand, idx) => {
				brandPriceData.datasets[0].data.push(brand.totalPrice);
				brandPriceData.datasets[0].backgroundColor.push(makeRandomColor());
				brandPriceData.labels.push(brand.productBrand);
				
				priceLi += `<li class="hover-li">
					<div class="simple-wrapper">
					<p class="rank-p">${idx + 1}</p>
					<p class="brand-p">${brand.productBrand}</p>
				</div>
				<p>&#8361;${brand.totalPrice.toLocaleString('ko-KR')}</p>
				</li>`;
			});
			
			if(category === 'tag') {
				drawTagData();
			} else {
				drawPriceData();
			}
		},
		error: function(error) {
			console.log(error);
		}
	});
}

function makeRandomColor() {
	const RGB_1 = Math.floor(Math.random() * (255 + 1));
	const RGB_2 = Math.floor(Math.random() * (255 + 1));
	const RGB_3 = Math.floor(Math.random() * (255 + 1));
	const strRGBA = 'rgba(' + RGB_1 + ',' + RGB_2 + ',' + RGB_3 + ',0.3)';
	
	return strRGBA;
}

function toggleButtonClass(day) {
	$('#1d-btn').removeClass('filter-btn-selected');
	$('#7d-btn').removeClass('filter-btn-selected');
	$('#30d-btn').removeClass('filter-btn-selected');
	$('#90d-btn').removeClass('filter-btn-selected');
	$(`#${day}d-btn`).addClass('filter-btn-selected');
}

function toggleCategoryButtonClass(category) {
	$('#brand-tag').removeClass('filter-btn-selected');
	$('#brand-price').removeClass('filter-btn-selected');
	$(`#brand-${category}`).addClass('filter-btn-selected');
}

getBrandData(7);