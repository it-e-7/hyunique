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
 // allList 영역 초기화
    $('#allList').empty();

    for (const category of categories) {
        let productHtml = '';
        const productList = closetVO[category];
        for (const product of productList) {
            productHtml += generateProductCard(product);
        }
        $(`#${category}`).html(productHtml).hide();

        // allList에 미리보기 추가
        addCategoryPreviewToAllList(category, productList);
    }

    // 초기 카테고리를 설정
    filterProducts('bagList', categories);
}
function filterProducts(category) {
    console.log("filterProducts 함수 실행, 카테고리: " + category);

    const categories = [
        'allList', 'bagList', 'dressList', 'outerList', 'topList',
        'bottomList', 'shoesList', 'hatList', 'accessoryList'
    ];

    for (const current of categories) {
        $(`#${current}`).hide();
    }
    $(`#${category}`).show();
    currentCategory = category;
}

//새로운 함수: allList에 카테고리별 미리보기 추가
function addCategoryPreviewToAllList(category, productList) {
    let previewHtml = '<div class="category-preview">';
    
    // 이미지 4개를 묶는 div 추가
    previewHtml += '<div class="image-wrapper">';
    
    let count = 0;

    for (const product of productList.slice(0, 4)) {
    	
        previewHtml += `<img src="${product.productImg}" alt="${product.productName}" class="preview-thumbnail" />`;
        count++;
    }

    // 아이템이 없거나 4개 미만인 경우 light-gray로 채우기
    while (count < 4) {
        previewHtml += '<div class="preview-thumbnail empty-thumbnail"></div>';
        count++;
    }
    previewHtml += '</div>';  // 이미지 4개를 묶는 div 닫기

    previewHtml += `<div class="category-name">${category}</div>`;
    previewHtml += '</div>';

    $('#allList').append(previewHtml);
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
    loadCloset(userId);
});
