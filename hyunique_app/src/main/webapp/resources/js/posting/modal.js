let colorScrollLock = false;
let sizeScrollLock = false;

let colorPresentDisplayId = 1;
let sizePresentDisplayId = 1;


// 사이즈 스크롤
$('.select-product-size').scroll((e) => {
   if (sizeScrollLock) return;
   sizeScrollLock = true;

   const sizeHeight = $('#select-product-size-0').height();
   const nextDisplayId = Math.round($('.select-product-size').scrollTop() / sizeHeight) + 1;
   sizePresentDisplayId = nextDisplayId;


    console.log('pin size', sizePresentDisplayId);

   setTimeout(() => {
   		sizeScrollLock = false;
   }, 100);
});

// 색상 스크롤
$('.select-product-color').scroll((e) => {
    if (colorScrollLock) return;
    colorScrollLock = true;

    const colorHeight = $('#select-product-color-0').height();
    const nextDisplayId = Math.round($('.select-product-color').scrollTop() / sizeHeight) + 1;
    colorPresentDisplayId = nextDisplayId;
    console.log('pin color', colorPresentDisplayId);
    setTimeout(() => {
        colorScrollLock = false;
    }, 100);
});

// 모달 닫기
$(".close-button").click(function() {
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
    $("#product-info").text('사이즈 색상');

    colorPresentDisplayId = 1;
    sizePresentDisplayId = 1;

    requestProductSizeAndColor(product['productId']);

    $(".select-product-size").empty();
    $(".select-product-color").empty();
    $("#product-search-modal").show();
}

// 상품 사이즈, 색상 DB에서 조회 후 html 렌더링
function requestProductSizeAndColor(productId) {
    $.getJSON(`/product/inform?productId=${productId}`, function(data) {

        let selectSize = $(".select-product-size");
        let selectColor = $(".select-product-color");

        selectSize.append($("<li>").attr("id", 'select-product-size-0').html('&nbsp;'));
        selectColor.append($("<li>").attr("id", 'select-product-color-0').html('&nbsp;'));

        // size 처리
        if (data.productSize.length > 0) {
           $.each(data.productSize, function(index, size) {
               let slideItem = $("<li>").attr("id", `select-product-size-${index+1}`).text(size);
               selectSize.append(slideItem);
           });
        } else {
           slideItem = $("<li>").attr("id", "select-product-size-1").text("one");
           selectSize.append(slideItem);
        }

        // color 처리
        if (data.productColor.length > 0) {
           $.each(data.productColor, function(index, color) {
               slideItem = $("<li>").attr("id", `select-product-color-${index+1}`).text(color);  // id도 올바르게 수정
               selectColor.append(slideItem);
           });
        } else {
           slideItem = $("<li>").attr("id", "select-product-color-1").text("one");  // id도 올바르게 수정
           selectColor.append(slideItem);
        }

        selectSize.append($("<li>").html('&nbsp;'));
        selectColor.append($("<li>").html('&nbsp;'));
    });
}

// 모달 띄웠을 때, 스크롤 되는거 막기

let scrollPosition = 0;

// 모달 열기
function openModal() {
  $('body').css({
    'overflow': 'hidden',
    'position': 'fixed',
    'top': `-${scrollPosition}px`,
    'width': '100%'
  });
}

// 모달 닫기
function closeModal() {
  $('body').css({
    'overflow': '',
    'position': '',
    'top': '',
    'width': ''
  });
  $(window).scrollTop(scrollPosition);  // 저장한 스크롤 위치로 이동
}

