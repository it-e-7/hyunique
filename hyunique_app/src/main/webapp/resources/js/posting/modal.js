let colorScrollLock = false;
let sizeScrollLock = false;

// 모달 닫기
$(".modal-cancel-btn").click(function() {
    closeModal();
    $("#product-search-modal").hide();
    $("#sizeContent").empty();
    $("#colorContent").empty();
});

// 모달 띄우기
function showProductModal(product) {
    openModal();
    requestProductSizeAndColor(product);
    $("#product-search-modal").show();
}

// 상품 사이즈, 색상 DB에서 조회 후 html 렌더링
function requestProductSizeAndColor(product) {
    let selectSize = $(".select-product-size");
    let selectColor = $(".select-product-color");

    // 첫 번째 option을 선택되게 하고, 다른 것들은 선택 해제
    $(".select-product-size option:first").prop('selected', true);
    $(".select-product-color option:first").prop('selected', true);

    $.getJSON(`/product/inform?productId=${product['productId']}`, function(data) {

       // size 처리
        if (data.productSize.length > 0) {
           $.each(data.productSize, function(index, size) {
               let slideItem = $("<option>").attr("value", `${index}`).text(size);
               selectSize.append(slideItem);
           });
        } else {
           slideItem = $("<option>").attr("value", "0").text("one");
           selectSize.append(slideItem);
        }

        // color 처리
        if (data.productColor.length > 0) {
           $.each(data.productColor, function(index, color) {
               slideItem = $("<option>").attr("value", `${index}`).text(color);  // id도 올바르게 수정
               selectColor.append(slideItem);
           });
        } else {
           slideItem = $("<option>").attr("value", "0").text("one");  // id도 올바르게 수정
           selectColor.append(slideItem);
        }

    });
}

/* 모달 띄웠을 때, 스크롤 되는거 막기 */

// 모달 열기
function openModal() {
    $('.search-container').css({
        'overflow':'hidden'
    });

    $('.search-container').on('scroll touchmove mousewheel', function(event) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    });
}

// 모달 닫기
function closeModal() {
    $('.search-container').css({
        'overflow': 'auto'
    });
    $('.search-container').off('scroll touchmove mousewheel');

    $(".select-product-size option:not(:first)").remove();
    $(".select-product-color option:not(:first)").remove();
}

