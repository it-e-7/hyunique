let imgList = [];
let thumbnailBox;
let styleChecked;
let tpoChecked;
let seasonChecked;
let content;

let dragTag;
let container;
let items = {};

let imgWidth;
let imgHeight;

$(document).ready(function() {

    getTagInform();

    $("#img-load-button").click(function() {
        $("#fileInput").click();
    });

    $("#fileInput").change(function() {
        $(".pre-container").hide();
        $(".write-container").show();
        $(".search-container").hide();
        $(".post-container").hide();
    });

    // 작성 완료 버튼
    $('#upload-button').click(compileAndSendPostData);

    // 썸네일 이미지 출력
    $("#fileInput").change(function(e) {
        const files = e.target.files;
        const file = files[0];
        if (!file.type.match("image/.*")) {
            alert("이미지 파일만 업로드할 수 있습니다.");
            return;
        }
        const reader = new FileReader();

        reader.onload = function(e) {
            const img = reader.result.split(',')[1];
            thumbnailBox = img;
            const imageElement = $("<img>").attr("src", e.target.result).attr("data-file", file.name);
            $('#thumbnail-img').append(imageElement);
            container = imageElement;
        }
        reader.readAsDataURL(file); // base64 인코딩
    });


    // 사용자가 클릭한 좌표 정보 저장
    let XOffset = 0;
    let YOffset = 0;

    $('#thumbnail-img').on('click', 'img', function(e){
        imgWidth = $(this).width();
        imgHeight = $(this).height();

        XOffset = e.offsetX;
        YOffset = e.offsetY;

        $(".result-list").empty();
        $(".write-container").hide();
        $(".search-container").show();
    });

    // 상품 검색
    $("#search-btn").off('click').click(function(){
        let productName = $("#search-input").val();
        if(productName){
          getSearchProduct(productName);
        }
    });

    // 상품 검색 엔터 이벤트
    $("#search-input").on('keydown', function(e){
        if(e.keyCode == 13) {
            let productName = $("#search-input").val();
            if(productName){
              getSearchProduct(productName);
            }
        }
    });

    // 상품 리스트 중에서 선택한 상품데이터를 뽑아내고, 색상, 사이즈 선택 모달 띄움
    $('.result-list').on('click', '.search-product-li', function() {
        vo = getSelectItem($(this));
        showProductModal(XOffset, YOffset, vo);
    });

});

function imageLoad() {

}

function modalEvent() {

    let colorIndex = 0;
    let sizeIndex = 0;

    $('#color-picker, #size-picker').off('touchstart touchmove touchend'); // 기존 이벤트 리스너 제거

    const colorItems = $('#color-picker .slide-item');
    const sizeItems = $('#size-picker .slide-item');

    const colorCount = colorItems.length;
    const sizeCount = sizeItems.length;

    let initialTouchPos = null;
    let lastTouchPos = null;

    function updateSlide(newTop = null, pickerId) {
      if (pickerId === 'color-picker') {
        $('#color-picker').data('selected-index', $(colorItems[colorIndex]).text());
        if (newTop === null) {
          newTop = -colorIndex * 50;
        }
        $('#colorContent').css('top', `${newTop}px`);
      } else if (pickerId === 'size-picker') {
        $('#size-picker').data('selected-index', $(sizeItems[sizeIndex]).text());
        if (newTop === null) {
          newTop = -sizeIndex * 50;
        }
        $('#sizeContent').css('top', `${newTop}px`);
      }
    }

    updateSlide(null, 'color-picker');
    updateSlide(null, 'size-picker');

    $('#color-picker, #size-picker').on('touchstart', function(e) {
      initialTouchPos = e.originalEvent.touches[0].clientY;
    });

    $('#color-picker, #size-picker').on('touchmove', function(e) {
      e.preventDefault();
      lastTouchPos = e.originalEvent.touches[0].clientY;
      const offset = lastTouchPos - initialTouchPos;
      const newTop = this.id === 'color-picker' ? -colorIndex * 50 + offset : -sizeIndex * 50 + offset;
      updateSlide(newTop, this.id);
    });

    $('#color-picker, #size-picker').on('touchend', function(e) {
      const finalTouchPos = e.originalEvent.changedTouches[0].clientY;

      if (initialTouchPos - finalTouchPos > 30) {  // Upward swipe
        if (this.id === 'color-picker') {
          colorIndex = (colorIndex + 1) % colorCount;
        } else {
          sizeIndex = (sizeIndex + 1) % sizeCount;
        }
      } else if (initialTouchPos - finalTouchPos < -30) { // Downward swipe
        if (this.id === 'color-picker') {
          colorIndex = (colorIndex - 1 + colorCount) % colorCount;
        } else {
          sizeIndex = (sizeIndex - 1 + sizeCount) % sizeCount;
        }
      }
      updateSlide(null, this.id);
    });
    // 새로운 코드 끝
}

// 검색 결과 리스트에서 선택한 아이템 정보 저장해서 객체로 반환
function getSelectItem(obj) {

    itemVO = {
        productId : obj.find(".search-product-id").text(),
        productBrand : obj.find(".search-product-brand").text(),
        productName : obj.find(".search-product-name").text(),
        productSize : '',
        productColor : '',
    };

    return itemVO;
}

// 게시글 내용 업로드
function compileAndSendPostData() {
    let tagValues = getGroupCheckBoxState();

    let post = {
        postContent: $('#content').val(),
        tpoId: -1,
        seasonId: -1,
        styleId: -1,
        thumbnail: null,
        imgList: imgList,
    };

    let nextPost = {
        postContent: $('#content').val(),
        tpoId: -1,
        seasonId: -1,
        styleId: -1,
        thumbnail: null,
    };

    Object.keys(tagValues).forEach(groupName => {
        let tagValueObj = tagValues[groupName];
        let tagNames = Object.keys(tagValueObj);
        let tagIds = Object.values(tagValueObj);

        post[groupName] = tagIds;
        nextPost[groupName] = tagNames
    });

    post['seasonId'] = post['seasonId'][0];
    post['tpoId'] = post['tpoId'][0];

    // 핀
    let product = Object.values(items).map(item => {
        return {
            pinX: item.xOffset / imgWidth,
            pinY: item.yOffset / imgHeight,
            pinType: item.pinType,
            productId: item.productId,
            productSize: item.productSize,
            productColor: item.productColor
        };
    });

    let postingVO = {postVO: post, postProductVO: product};

    sendPostToServer(postingVO);
    printSelectTagAndContent(nextPost);

    $(".post-container").show();
    $(".write-container").hide();
    $(".header-wrapper").hide();
}

// 터치한 위치에 선택한 상품을 태그로 붙이기
function attachTag(xOffset, yOffset, vo) {
    return function() {

        let tagElement = $("<span>").addClass("tag").attr("id","tag_"+new Date().getTime()).css({
            left: xOffset + "px",
            top: yOffset + "px",
            position: "absolute"
        });

        let id = tagElement.attr('id');

        items[id] = {
            initialX: 0,
            initialY: 0,
            currentX: 0,
            currentY: 0,
            xOffset: 0,
            yOffset: 0,
            active: false,
            pinType: null,
            productId: vo['productId'],
            productBrand: vo['productBrand'],
            productName: vo['productName'],
            productPrice: vo['productPrice'],
            productSize: vo['productSize'],
            productColor: vo['productColor']
        };

        tagElement.html(`

          ${items[id].productBrand}
          ${items[id].productName}
          ${items[id].productPrice}
          ${items[id].productSize}
        `);

        $('.modal').hide();
        $(".search-container").hide();
        $(".write-container").show();
        $("#search-input").val("");

        items[id].xOffset = xOffset;
        items[id].yOffset = yOffset;


        let imgContainer = $('#thumbnail-img');
        imgContainer.append(tagElement);

        // 새로 생성된 태그에 드래그 이벤트 바인딩
        tagElement.on("mousedown touchstart", function(event) {
            dragStart(event);
        });

        tagElement.on("mouseup touchend", function(event) {
            dragEnd(event);
        });

        tagElement.on("mousemove touchmove", function(event) {
            drag(event, tagElement);
        });
    };
}

function showProductModal(XOffset, YOffset, product) {
    $("#product-info").text('사이즈 색상');
    let modal = $("#product-search-modal");

    requestProductSizeAndColor(product['productId'])

    modal.show();

    $(".close-button").click(function() {
        modal.hide();
        $("#sizeContent").empty();
        $("#colorContent").empty();
    });

    $('#search-results-button').click(function() {
        product['productSize'] = $('#color-picker').data('selected-index');
        product['productColor'] = $('#size-picker').data('selected-index');

        attachTag(XOffset, YOffset, product)();
    });
}

// 상품 사이즈, 색상 DB에서 조회
function requestProductSizeAndColor(productId) {
    $.getJSON(`/product/inform?productId=${productId}`, function(data) {

        // size 처리
        if (data.productSize.length > 0) {
            $.each(data.productSize, function(index, size) {
                const slideItem = $("<div>").addClass("slide-item").text(size);
                $("#sizeContent").append(slideItem);
            });
        } else {
            const slideItem = $("<div>").addClass("slide-item").text("one");
            $("#sizeContent").append(slideItem);
        }

        // color 처리
        if (data.productColor.length > 0) {
            $.each(data.productColor, function(index, color) {
                const slideItem = $("<div>").addClass("slide-item").text(color);
                $("#colorContent").append(slideItem);
            });
        } else {
            const slideItem = $("<div>").addClass("slide-item").text("one");
            $("#colorContent").append(slideItem);
        }

        modalEvent();
    });
}

function dragStart(event) {
    const id = event.target.id;
    const item = items[id];

    if (event.type === "touchstart") {
        item.initialX = event.touches[0].clientX - item.xOffset;
        item.initialY = event.touches[0].clientY - item.yOffset;
    } else {
        item.initialX = event.clientX - item.xOffset;
        item.initialY = event.clientY - item.yOffset;
    }

    if ($(event.target).hasClass("tag")) {
        item.active = true;
    }
}

function dragEnd(event) {
    const id = event.target.id;
    const item = items[id];

    item.initialX = item.currentX;
    item.initialY = item.currentY;
    item.active = false;
}

function drag(event, tagElement) {
    const id = event.target.id;
    const item = items[id];

    if (item.active) {
        event.preventDefault();

        let newX, newY;

        if (event.type === "touchmove") {
            newX = event.touches[0].clientX - item.initialX;
            newY = event.touches[0].clientY - item.initialY;
        } else {
            newX = event.clientX - item.initialX;
            newY = event.clientY - item.initialY;
        }

        const imgWidth = container.width();
        const imgHeight = container.height();
        const imgOffset = container.offset();

        if (newX >= imgOffset.left && newX <= imgOffset.left + imgWidth &&
            newY >= imgOffset.top && newY <= imgOffset.top + imgHeight) {

            item.xOffset = newX;
            item.yOffset = newY;

            setTranslate(newX, newY, tagElement);
        }
    }
}

function setTranslate(xPos, yPos, el) {
    el.css({
        "left": xPos + "px",
        "top": yPos + "px"
    });
}

function sendPostToServer(postingVO) {
    $.ajax({
        url: `/post`,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(postingVO),
        success: function(response) {
            
        },
        error: function(error) {
            console.error('error', error);
        }
    });
}

function getSearchProduct(productName) {
    $.ajax({
        url: '/product/search/' + productName,
        type: 'GET',
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function(response) {
            renderSearchProductResults(response, productName);
        }
    });
}

// 상품 검색 결과 출력
function renderSearchProductResults(results, productName) {

    let resultList = $(".result-list");
    resultList.empty();
    $('.search-value').text(`${productName} 검색 결과`);

    $.each(results, function(index, product) {
        let listItem = $("<li>").addClass("search-product-li");
        let divItem = $("<div>").addClass("search-product-div");
        listItem.append($("<img>").attr("src", product.productImg).addClass("search-product-img"));
        divItem.append($("<p>").text(product.productId).addClass("search-product-id").attr("hidden", true));
        divItem.append($("<p>").text(product.productBrand).addClass("search-product-brand"));
        divItem.append($("<p>").text(product.productName).addClass("search-product-name"));
        divItem.append($("<p>").text(product.productPrice).addClass("search-product-price"));
        listItem.append(divItem);
        resultList.append(listItem);
    });
}

// 각 그룹별로 체크된 체크박스의 값을 Map<TagName, TagId> 로 반환
function getCheckedValuesInGroup(groupClass, type) {
    let checkedValuesMap = {};

    $(`.${groupClass} input[type=${type}]:checked`).each(function() {
        let tagId = +$(this).attr('tag-id');
        let tagName = $(this).attr('id');
        checkedValuesMap[tagName] = tagId;
    });

    return checkedValuesMap;
}

// 태그 그룹별로 체크된 태그값 추출
function getGroupCheckBoxState() {
    let styleCheckedValues = getCheckedValuesInGroup('style-button-group', 'checkbox');
    let tpoCheckedValues = getCheckedValuesInGroup('tpo-button-group', 'radio');
    let seasonCheckedValues = getCheckedValuesInGroup('season-button-group', 'radio');

    let tagValues = {
        tpoId: tpoCheckedValues,
        seasonId: seasonCheckedValues,
        styleId: styleCheckedValues,
    };

    return tagValues;
}

// 1. 태그 받아오는 함수
function getTagInform() {
    $.getJSON("/post/tag", function(data) {
        insertTags('style', data.styleTags);
        insertTags('tpo', data.tpoTags);
        insertTags('season', data.seasonTags);
    });
}

// 2. 태그 넣어주는 함수
function insertTags(tagType, tagData) {
    const $tagContainer = $('#' + tagType + '-tags');

    $.each(tagData, function(index, tag) {
        const inputType = (tagType === 'style') ? 'checkbox' : 'radio';
        const tagElement = `
            <div>
                <input type="${inputType}" id="${tag.TAGNAME}" tag-id="${tag.TAGID}" name="${tagType}-radio-group">
                <label for="${tag.TAGNAME}">${tag.TAGNAME}</label>
            </div>
        `;
        $tagContainer.append(tagElement);
    });
}


function printSelectTagAndContent(vo) {
    let tpoIdStr = '#' + vo['tpoId'][0];
    let seasonIdStr = '#' + vo['seasonId'][0];
    let styleIdStr = vo['styleId'].map(str => "#" + str.trim()).join(" ");

    const imageElement = $(`<p>${tpoIdStr} ${seasonIdStr} ${styleIdStr}</p>`);
    const li = $("<li>").append(imageElement);
    $(".tag-list").append(li);

    $(".content-text").append(vo['postContent']);
}