let currentCategory = '';
const sessionId = document.getElementById('session-id').value;
const userId = document.getElementById('user-id').value;

$(document).ready(function() {
    loadCloset(userId);
});

//옷장 로드하는 함수
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

//옷장 보여주는 함수
function displayCloset(closetVO) {
    console.log("displayCloset 함수 실행");
    console.log(closetVO);


    const categories = [
        'bagList', 'dressList', 'outerList', 'topList',
        'bottomList', 'shoesList', 'hatList', 'accessoryList'
    ];
    $('#allList').empty();

    for (const category of categories) {
        let productHtml = '';
        const productList = closetVO[category];
        for (const product of productList) {
            productHtml += generateProductCard(product);
        }
        $(`#${category}`).html(productHtml).hide();

        addCategoryPreviewToAllList(category, productList);
    }

    filterProducts('bagList', categories);
}

//카테고리별로 나누는 함수
function filterProducts(category) {
    console.log("filterProducts 함수 실행, 카테고리: " + category);

    const categories = [
        'allList', 'bagList', 'dressList', 'outerList', 'topList',
        'bottomList', 'shoesList', 'hatList', 'accessoryList'
    ];
    
    const wrapper = document.getElementById(category);
    if (wrapper.children.length !== 0) {
      wrapper.classList.remove("empty");  // 상품이 있으면 empty 클래스 제거
    } else {
      wrapper.classList.add("empty");  // 상품이 없으면 empty 클래스 추가
    }
    
    for (const current of categories) {
        $(`#${current}`).hide();
    }
    $(`#${category}`).show();
    currentCategory = category;
}

//allList에 카테고리별 미리보기 추가 함수
function addCategoryPreviewToAllList(category, productList) {
    let previewHtml = `<div class="category-preview" onclick="filterProducts('${category}')">`;
    
    previewHtml += '<div class="image-wrapper">';
    let count = 0;
    for (const product of productList.slice(0, 4)) {
        previewHtml += `<img src="${product.productImg}" alt="${product.productName}" class="preview-thumbnail" />`;
        count++;
    }
    while (count < 4) {
        previewHtml += '<div class="preview-thumbnail empty-thumbnail"></div>';
        count++;
    }
    previewHtml += '</div>';
    const categoryNames = {
        'bagList': '가방',
        'dressList': '원피스',
        'outerList': '겉옷',
        'topList': '상의',
        'bottomList': '하의',
        'shoesList': '신발',
        'hatList': '모자',
        'accessoryList': '액세서리'
    };
    const categoryName = categoryNames[category] || category;
    
    previewHtml += `<div class="category-name">${categoryName}</div>`;
    previewHtml += '</div>';

    $('#allList').append(previewHtml);
}

//상품 영역 생성 함수
function generateProductCard(product) {
    return `<div class="product-card" onclick="moveToProduct(${product.productId})">
                <img src="${product.productImg}" alt="${product.productName}" width="100" height="100"/>
                <p id="product-brand">${product.productBrand}</p>
                <p id="product-name">${product.productName}</p>
                <p id="product-price">₩${product.productPrice}</p>
            </div>`;
}
