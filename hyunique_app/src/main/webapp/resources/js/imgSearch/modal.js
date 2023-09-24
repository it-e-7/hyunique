/* 모달 슬라이드 */
let isDraggingModal = false;
let startY = 0;
let modalIsUp = false;

$("#bottomSheet").on("mousedown touchstart", function(e) {
    isDraggingModal = true;
    startY = e.type === "mousedown" ? e.clientY : e.originalEvent.touches[0].clientY;
});

$(document).on("mousemove touchmove", function(e) {
    if (!isDraggingModal) return;
});


$(document).on("mouseup touchend", slideModal);


function slideModal(e) {
    if (!isDraggingModal) return;

    let clientY = e.clientY || e.originalEvent.changedTouches[0].clientY;

    const deltaY = startY - clientY;
    if (deltaY > 0) { // 위로 드래그
        console.log("up!");
        $("#bottomSheet").css({
            'bottom': '0%',
            'height': '80%',
            'transition': 'bottom 0.2s ease-in-out, height 0.2s ease-in-out'
        });
        modalIsUp = true;
    } else { // 아래로 드래그
        console.log("down!");
        $("#bottomSheet").css({
            'bottom': '-20%',
            'height': '60%',
            'transition': 'bottom 0.2s ease-in-out, height 0.2s ease-in-out'
        });
        modalIsUp = false;
    }
    isDraggingModal = false;
}

/* 스켈레톤 로딩 */
function switchLayers() {
    const dataLayer = $('.data-layer');
    const skeletonLayer = $('.skeleton-layer');

    if (dataLayer.css('display') === 'grid') {
        dataLayer.css('display', 'none');
        skeletonLayer.css('display', 'grid');
    } else {
        dataLayer.css('display', 'grid');
        skeletonLayer.css('display', 'none');
    }
}



// 상품 검색 결과 출력
function renderImgSearchResults(results) {
    let resultList = $('.data-layer');
    $('.data-layer').empty();

    $.each(results, function(index, product) {
        let listItem = $("<li>").addClass("search-result-li");
        let divItem = $("<div>").addClass("product-div");
        let divImg = $("<div>").addClass("img-wrapper");
        divImg.append($("<img>").attr("src", product.productImg).addClass("product-img").attr('draggable', 'false'));
        listItem.append(divImg);

        let productIdElement = $("<p>")
            .text(product.productId)
            .addClass("product-id")
            .attr("hidden", true)
            .on('click', function() {
                moveToProduct(product.productId)
                });
        divItem.append(productIdElement);

//        divItem.append($("<p>").text(product.productId).addClass("product-id").attr("hidden", true));


        divItem.append($("<p>").text(product.productBrand).addClass("product-brand"));
        divItem.append($("<p>").text(product.productName).addClass("product-name"));
        divItem.append($("<p>").text('₩ ' + product.productPrice.toLocaleString()).addClass("product-price"));
        listItem.append(divItem);
        resultList.append(listItem);
    });
}

/* 상품 페이지 이동 */
