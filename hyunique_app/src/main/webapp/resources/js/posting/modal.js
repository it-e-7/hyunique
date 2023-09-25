let colorScrollLock = false;
let sizeScrollLock = false;

let colorPresentDisplayId = 1;
let sizePresentDisplayId = 1;



// 모달 닫기
$(".modal-cancel-btn").click(function() {
    closeModal();
    $("#product-search-modal").hide();
    $("#sizeContent").empty();
    $("#colorContent").empty();
    $('.select-product-color').empty();
    $('.select-product-size').empty();
});

// 모달 띄우기
function showProductModal(product) {
    openModal();
    colorPresentDisplayId = 1;
    sizePresentDisplayId = 1;

    requestProductSizeAndColor(product);

    $(".select-product-size").empty();
    $(".select-product-color").empty();
    $("#product-search-modal").show();
}

// 상품 사이즈, 색상 DB에서 조회 후 html 렌더링
function requestProductSizeAndColor(product) {
    $.getJSON(`/product/inform?productId=${product['productId']}`, function(data) {

        $('.search-product-brand').text(product['productBrand']);
        $('.search-product-name').text(product['productName']);

        let selectSize = $(".select-product-size");
        let selectColor = $(".select-product-color");

        selectSize.append($("<option>").attr("value", '').attr("disabled", 'disabled').attr('selected', 'selected').text('사이즈'));
        selectColor.append($("<option>").attr("value", '').attr("disabled", 'disabled').attr('selected', 'selected').text('색상'));

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

// 모달 띄웠을 때, 스크롤 되는거 막기

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

// 모달 닫기y
function closeModal() {
    $('.search-container').css({
        'overflow': 'auto'
    });

    $('.search-container').off('scroll touchmove mousewheel');


  $(window).scrollTop(0);  // 저장한 스크롤 위치로 이동

}

