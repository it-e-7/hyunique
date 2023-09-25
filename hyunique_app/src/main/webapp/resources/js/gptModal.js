// 이미지를 통해 선택한 상품 정보를 추출하는 함수
function getSelectItemFromImage(imgElement) {
    let product = {};
    // 가장 가까운 상위 div(gpt-product-list) 요소를 찾습니다.
    let productWrapper = $(imgElement).closest('.gpt-product-list');
    gptProductBox = productWrapper;

    // 상품 정보를 추출합니다.
    product['productId'] = productWrapper.find('#product-only-wrapper').attr('onclick').match(/\('([^']+)'\)/)[1];
    product['productBrand'] = productWrapper.find('strong').text();
    product['productName'] = productWrapper.find('.product-item-name').text();

    return product;
}

// <img> 요소에서 상품 정보를 추출하는 함수 호출
$('.chat-section-wrapper').on('click', '#bag-img', function() {
    let product = getSelectItemFromImage(this);
    let bagImg = $(this);
    if (bagImg.attr("src").includes("/resources/img/ic-bag-check.png")) {
            bagImg.attr("src", "/resources/img/ic-bag-non-check.png");
    }
    else {
        showProductModal(product);
    }
});

//확인 버튼을 눌렀을 때
$(".modal-check-btn").click(function() {
    //세션에 사이즈와 컬러를 저장한다
    // 확인 버튼을 눌렀을 때 아이템을 변경한다.
    console.log(gptProductBox);
    var bagImg = gptProductBox.closest('.gpt-product-list').find('#bag-img');
    if (bagImg.attr("src").includes("/resources/img/ic-bag-check.png")) {
        bagImg.attr("src", "/resources/img/ic-bag-non-check.png");
    } else {
        bagImg.attr("src", "/resources/img/ic-bag-check.png");
    }

    // 첫 번째 option을 선택되게 하고, 다른 것들은 선택 해제
    $(".select-product-size option:first").prop('selected', true);
    $(".select-product-color option:first").prop('selected', true);

    $("#product-search-modal").hide();
    $("#sizeContent").empty();
    $("#colorContent").empty();
    $('.select-product-color').empty();
    $('.select-product-size').empty();
});