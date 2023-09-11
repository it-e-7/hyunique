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

let classes = ['arrow-left', 'arrow-top', 'arrow-right', 'arrow-bottom'];

// 사용자가 클릭한 좌표 정보 저장
let XOffset = 0;
let YOffset = 0;

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

$('#addImgBtn').click(function() {
    $('#addFileInput').click();
});

// 추가 이미지
$("#addFileInput").change(function(e) {
  const files = e.target.files;

  $.each(files, function(index, file) {
    if (!file.type.match("image/.*")) {
      alert("이미지 파일만 업로드할 수 있습니다.");
      return;
    }
    const reader = new FileReader();

    reader.onload = function(e) {
      const li = $("<li>");
      const imageElement = $("<img>").attr("src", e.target.result).attr("data-file", file.name);
      const img = reader.result.split(',')[1];
      imgList.push(img);
      li.append(imageElement);
      $('.add-img-container').append(li);
    }
    reader.readAsDataURL(file); // base64 인코딩
  });
});



$('#thumbnail-img').on('click', 'img', function(e){
    imgWidth = $(this).width();
    imgHeight = $(this).height();

    XOffset = e.offsetX;
    YOffset = e.offsetY;

    $('.search-value').empty();
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

// 상품 리스트 중에서 선택한 상품 id를 뽑아서, 해당 상품의 색상, 사이즈 선택 모달 띄움
$('.result-list').on('click', '.search-product-li', function() {
    let product = getSelectItem($(this));
    showProductModal(product);

    // 확인 버튼을 누르면 핀이 표시됨
    $('#search-results-button').off('click').on('click', function() {
        product['productSize'] = $(`#select-product-size-${sizePresentDisplayId}`).text();
        product['productColor'] = $(`#select-product-color-${colorPresentDisplayId}`).text();

        attachTag(XOffset, YOffset, product);
    });
});

let isMouseDown = false;  // 마우스를 누르고 있는지 판단하는 변수

// 마우스를 누르면 isMouseDown을 true로 설정
$(".image-view").on("mousedown", ".post-pin", function() {
    isMouseDown = true;
});

// 마우스를 뗄 때 동작
$(".image-view").on("mouseup", ".post-pin", function(event) {

    if (isMouseDown) { // 마우스가 눌러져 있는 상태에서 뗐을 때만 동작
        if ($(this).data("currentIndex") === undefined) {
            $(this).data("currentIndex", 0);
        }

        let currentIndex = $(this).data("currentIndex");

        $(this).removeClass('arrow-left arrow-right arrow-bottom arrow-top');

        // 다음 클래스 인덱스 계산
        currentIndex = (currentIndex + 1) % classes.length;

        // 새로운 클래스 추가
        $(this).addClass(classes[currentIndex]);
        items[this.id].pinType = classes[currentIndex];

        // 새로운 인덱스 저장
        $(this).data("currentIndex", currentIndex);
    }

    isMouseDown = false;
});




// 검색 결과 리스트에서 선택한 아이템 정보 저장해서 객체로 반환
function getSelectItem(obj) {
    itemVO = {
        productId : obj.find(".search-product-id").text(),
        productBrand : obj.find(".search-product-brand").text(),
        productName : obj.find(".search-product-name").text(),
        productPrice : obj.find(".search-product-price").text(),
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
        thumbnailUrl: thumbnailBox,
        imgList: imgList,
    };

    console.log(JSON.stringify(post));

    let nextPost = {
        postContent: $('#content').val(),
        tpoId: -1,
        seasonId: -1,
        styleId: -1,
        thumbnail: thumbnailBox,
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


// 터치한 위치에 상품 정보 핀 찍기
function attachTag(xOffset, yOffset, vo) {
    let tagElement = $("<span>").addClass("post-pin arrow-left").attr("id","tag_"+new Date().getTime()).css({
        left: xOffset + "px",
        top: yOffset + "px",
        position: "absolute"
    });

    let id = tagElement.attr('id');

    console.log('attach tag id: ', id);

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
      <p class="pin-brand">${items[id].productBrand}</p>
      <p class="pin-price">${items[id].productPrice}</p>
      <p class="pin-size-color">${items[id].productSize} / ${items[id].productColor}</p>
    `);

    $('.modal').hide();
    $(".search-container").hide();
    $(".write-container").show();
    $("#search-input").val("");

    items[id].xOffset = xOffset;
    items[id].yOffset = yOffset;

    console.log(tagElement);
    console.log(items);

    let imgContainer = $('#thumbnail-img');
    imgContainer.append(tagElement);

    // 새로 생성된 태그에 드래그 이벤트 바인딩
    tagElement.on("mousedown touchstart", function(event) {
        dragStart(event, id);
    });

    tagElement.on("mouseup touchend", function(event) {
        dragEnd(event, id);
    });

    tagElement.on("mousemove touchmove", function(event) {
        drag(event, tagElement, id);
    });
}


function dragStart(event, id) {
    const item = items[id];

    console.log('item ' + item);
    console.log('id ' + id);

    if (event.type === "touchstart") {
        item.initialX = event.touches[0].clientX - item.xOffset;
        item.initialY = event.touches[0].clientY - item.yOffset;
    } else {
        item.initialX = event.clientX - item.xOffset;
        item.initialY = event.clientY - item.yOffset;
    }

    if ($(event.currentTarget).hasClass("post-pin")) {
        item.active = true;
    }
}

function dragEnd(event, id) {
    const item = items[id];

    item.initialX = item.currentX;
    item.initialY = item.currentY;
    item.active = false;
}

function drag(event, tagElement, id) {
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

// 업로드 후 화면에 태그값, 썸네일, 글 출력
function printSelectTagAndContent(vo) {
    let tpoIdStr = '#' + vo['tpoId'][0];
    let seasonIdStr = '#' + vo['seasonId'][0];
    let styleIdStr = vo['styleId'].map(str => "#" + str.trim()).join(" ");

    $(".image-container img").attr("src", "data:image/png;base64," + thumbnailBox);

    const imageElement = $(`<p>${tpoIdStr} ${seasonIdStr} ${styleIdStr}</p>`);
    const li = $("<li>").append(imageElement);
    $(".tag-list").append(li);

    $(".content-text").append(vo['postContent']);
}