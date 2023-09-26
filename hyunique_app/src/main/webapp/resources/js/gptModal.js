let currentProduct = {};
let productList = [];

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
    currentProduct = product;
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
    var bagImg = gptProductBox.closest('.gpt-product-list').find('#bag-img');
    if (bagImg.attr("src").includes("/resources/img/ic-bag-check.png")) {
        bagImg.attr("src", "/resources/img/ic-bag-non-check.png");
    } else {
        bagImg.attr("src", "/resources/img/ic-bag-check.png");
    }
    let selectSize = $(".select-product-size");
    let selectColor = $(".select-product-color");

    //세션에다가 값 저장
    currentProduct['productSize'] = $('.select-product-size option:selected').text();
    currentProduct['productColor'] = $('.select-product-color option:selected').text();

    if (currentProduct['productSize'] === '사이즈' || currentProduct['productColor'] === '색상') {
        alert('옵션을 선택하세요');
        return;
    }

    addOrUpdateProduct(currentProduct);
    sessionStorage.setItem("productListSizeColor", JSON.stringify(productList));

    $("#product-search-modal").hide();
    $("#sizeContent").empty();
    $("#colorContent").empty();
    closeModalGPT();

});

// 제품을 리스트에 추가 또는 업데이트
function addOrUpdateProduct(product) {
  const existingProductIndex = productList.findIndex(item => item.productId === product.productId);

  if (existingProductIndex !== -1) {
    productList[existingProductIndex] = product;
  } else {
    productList.push(product);
  }
}

// 모달 닫기
function closeModalGPT() {
    $('.search-container').css({
        'overflow': 'auto'
    });
    $('.search-container').off('scroll touchmove mousewheel');

    $(".select-product-size option:not(:first)").remove();
    $(".select-product-color option:not(:first)").remove();
}

// 모달 닫기
$(".modal-cancel-btn-gpt").click(function() {
    closeModalGPT();
    $("#product-search-modal").hide();
    $("#sizeContent").empty();
    $("#colorContent").empty();
});