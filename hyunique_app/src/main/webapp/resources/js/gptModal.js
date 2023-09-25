// 이미지를 통해 선택한 상품 정보를 추출하는 함수
function getSelectItemFromImage(imgElement) {
    let product = {};
    // 가장 가까운 상위 div(gpt-product-list) 요소를 찾습니다.
    let productWrapper = $(imgElement).closest('.gpt-product-list');

    // 상품 정보를 추출합니다.
    product['productId'] = productWrapper.find('#product-only-wrapper').attr('onclick').match(/\('([^']+)'\)/)[1];
    product['productBrand'] = productWrapper.find('strong').text();
    product['productName'] = productWrapper.find('.product-item-name').text();

    return product;
}

// <img> 요소에서 상품 정보를 추출하는 함수 호출
$('.chat-section-wrapper').on('click', '#bag-img', function() {
    console.log("1");
    let product = getSelectItemFromImage(this);
    showProductModal(product);
});
