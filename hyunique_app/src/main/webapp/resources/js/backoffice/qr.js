const ctx = document.getElementById('qr-chart').getContext('2d');
const productList = $('.qr-dashboard-product-wrapper ul');

const options = {
	animation: {
		animateRotate: true,
		animateScale: true,
	},
	aspectRatio: 1.4,
};

let data = {
    datasets: [{
        data: [],
        backgroundColor: [],
    }],
    labels: [],
};

function drawChart() {
	const myDoughnutChart = new Chart(ctx, {
	    type: 'doughnut',
	    data: data,
	    options: options
	});
}

function getQRData(day) {
	if($(`#${day}d-btn`).hasClass('qr-btn-selected')) return;
	productList.html('');
	toggleButtonClass(day);
	$.ajax({
		url: '/backoffice/qr',
		type: 'POST',
		data: {
			filter: day,
		},
		success: function(response) {
			let list = '';
			const tempData = [];
			const tempLabel = [];
			const tempBackColor = [];
			
			productList.html(response.forEach((product,idx) => {
				list += `<li onclick="location.href = '/product/${product.productId}'">
					<p class="rank-p">${idx + 1}</p>
					<img src="${product.productImg}">
					<div class="product-inform-wrapper">
						<p class="brand">${product.productBrand}</p>
						<p>${product.productName}</p>
					</div>
					<p class="qr-count-p">${product.qrCount}회</p>
					</li>`;
				
				tempBackColor.push(makeRandomColor());
				tempData.push(product.qrCount);
				
				if(tempLabel.length < 4) {
					tempLabel.push(product.productName);
				}
				
				data.datasets[0].data = tempData;
				data.datasets[0].backgroundColor = tempBackColor;
				data.labels = tempLabel;
			}));
			drawChart();
			productList.html(list);
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
	$('#1d-btn').removeClass('qr-btn-selected');
	$('#7d-btn').removeClass('qr-btn-selected');
	$('#30d-btn').removeClass('qr-btn-selected');
	$('#90d-btn').removeClass('qr-btn-selected');
	$(`#${day}d-btn`).addClass('qr-btn-selected');
}

getQRData(1);