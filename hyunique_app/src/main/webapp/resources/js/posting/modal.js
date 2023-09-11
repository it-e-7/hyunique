let colorScrollLock = false;
let sizeScrollLock = false;
let colorPresentDisplayId;
let sizePresentDisplayId;

// 사이즈 스크롤
$('.select-product-size').scroll((e) => {
   if (sizeScrollLock) return;
   sizeScrollLock = true;

   const sizeHeight = $('#select-product-size-0').height();
   const nextDisplayId = Math.round($('.select-product-size').scrollTop() / sizeHeight) + 1;
   sizePresentDisplayId = nextDisplayId;

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

    setTimeout(() => {
        colorScrollLock = false;
    }, 100);
});

// 모달 닫기
$(".close-button").click(function() {
    $("#product-search-modal").hide();
    $("#sizeContent").empty();
    $("#colorContent").empty();
});

// 모달 띄우기
function showProductModal(XOffset, YOffset, product) {
    $("#product-info").text('사이즈 색상');
    requestProductSizeAndColor(product['productId'])
    $(".select-product-size").empty();
    $(".select-product-color").empty();
    $("#product-search-modal").show();

    // 확인 버튼을 누르면 핀이 표시됨
    $('#search-results-button').off('click').on('click', function() {
        product['productSize'] = $(`#select-product-size-${sizePresentDisplayId}`).text();
        product['productColor'] = $(`#select-product-color-${colorPresentDisplayId}`).text();

        attachTag(XOffset, YOffset, product);
    });
}

// 상품 사이즈, 색상 DB에서 조회 후 html 렌더링
function requestProductSizeAndColor(productId) {
   $.getJSON(`/product/inform?productId=${productId}`, function(data) {

       let slideItem;

       slideItem = $("<li>").attr("id", 'select-product-size-0').html('&nbsp;');
       $(".select-product-size").append(slideItem);

       // size 처리
       if (data.productSize.length > 0) {
           $.each(data.productSize, function(index, size) {
               slideItem = $("<li>").attr("id", `select-product-size-${index+1}`).text(size);
               $(".select-product-size").append(slideItem);
           });
       } else {
           slideItem = $("<li>").attr("id", "select-product-size-1").text("one");
           $(".select-product-size").append(slideItem);
       }

       // color 처리
       if (data.productColor.length > 0) {
           $.each(data.productColor, function(index, color) {
               slideItem = $("<li>").attr("id", `select-product-color-${index+1}`).text(color);  // id도 올바르게 수정
               $(".select-product-color").append(slideItem);
           });
       } else {
           slideItem = $("<li>").attr("id", "select-product-color-1").text("one");  // id도 올바르게 수정
           $(".select-product-color").append(slideItem);
       }

       slideItem = $("<li>").html('&nbsp;');
       $(".select-product-size").append(slideItem);
   });
}
