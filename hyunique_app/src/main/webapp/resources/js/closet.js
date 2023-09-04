// 현재 보여줄 카테고리를 저장하는 변수
let currentCategory = '';
const sessionId = document.getElementById('session-id').value;
const userId = document.getElementById('user-id').value;


function loadCloset(userId) {
    console.log("loadCloset 함수 실행, userId: " + userId);
    $.ajax({
        url: `/closet/${userId}`,
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            displayCloset(data);
        },
        error: function() {
            console.error('옷장 정보를 가져오는 데 실패했습니다.');
        }
    });
}

function displayCloset(closetVO) {
    console.log("displayCloset 함수 실행");
    console.log(closetVO);


    const categories = [
        'bagList', 'dressList', 'outerList', 'topList',
        'bottomList', 'shoesList', 'hatList', 'accessoryList'
    ];

    for (const category of categories) {
        let productHtml = '';
        const productList = closetVO[category];
        for (const product of productList) {
            productHtml += generateProductCard(product);
        }
        $(`#${category}`).html(productHtml).hide();
    }

    // 초기 카테고리를 설정
    filterProducts('bagList', categories);
}
function filterProducts(category) {
    console.log("filterProducts 함수 실행, 카테고리: " + category);

    const categories = [
        'bagList', 'dressList', 'outerList', 'topList',
        'bottomList', 'shoesList', 'hatList', 'accessoryList'
    ];

    for (const current of categories) {
        $(`#${current}`).hide();
    }
    $(`#${category}`).show();
    currentCategory = category;
}



function generateProductCard(product) {
    return `<div class="product-card" onclick="moveToProduct(${product.productId})">
                <img src="${product.productImg}" alt="${product.productName}" width="100" height="100"/>
                <p id="product-brand">${product.productBrand}</p>
                <p id="product-name">${product.productName}</p>
                <p id="product-price">₩${product.productPrice}</p>
            </div>`;
}
$(document).ready(function() {
	userId = sessionId
    loadCloset(userId);
	
});
