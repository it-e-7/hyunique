let imgList = [];
let styleChecked;
let tpoChecked;
let seasonChecked;
let content;

let dragTag;
let items = {};

let imgWidth;
let imgHeight;

const classes = ['arrow-left', 'arrow-top', 'arrow-right', 'arrow-bottom'];
const pages = ['.pre-container', '.write-container', '.search-container', '.post-container']
let currentPage;

getTagInform();

$("#img-load-button").click(function() {
    $("#fileInput").val("");
    $("#fileInput").click();
});

$("#fileInput").change(thumbnailUpload);

// 썸네일 이미지 출력
function thumbnailUpload(e) {
    const files = e.target.files;
    const file = files[0];
    if (!file.type.match("image/.*")) {
        alert("이미지 파일만 업로드할 수 있습니다.");
        return;
    }
    const reader = new FileReader();

    reader.onload = function(e) {
        const img = reader.result.split(',')[1];
        imgList.push(img);
        const imageElement = $("<img>").attr("src", e.target.result)
                                       .attr("data-file", file.name)
                                       .attr("draggable", "false") ;
        $('#thumbnail-img').append(imageElement);
        container = imageElement;
    }
    reader.readAsDataURL(file); // base64 인코딩

    showPage('.write-container');
}

// 작성 완료 버튼
$('#upload-button').click(function() {
    compileAndSendPostData();
});

$('#add-img-btn').click(function() {
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
      const imageElement = $("<img>").attr("src", e.target.result).attr("data-file", file.name).attr("draggable", 'false');
      const img = reader.result.split(',')[1];
      imgList.push(img);
      li.append(imageElement);
      $('.add-img-container').append(li);
    }
    reader.readAsDataURL(file); // base64 인코딩
  });
});

$('.add-img-wrapper').on('mousedown touchdown', function(e) {
    const slider = $('.add-img-container');
    imageSlider(slider);
})


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
    $('.modal-check-btn').off('click').on('click', function() {

        product['productSize'] = $('.select-product-size option:selected').text();
        product['productColor'] = $('.select-product-color option:selected').text();

        if (product['productSize'] === '사이즈' || product['productColor'] === '색상') {
            alert('옵션을 선택하세요').
            return;
            return;
        }

        attachTag(XOffset, YOffset, product);
        $('.result-list').empty();
        showPage('.write-container');
    });
});

// 화면 전환 함수
function showPage(page) {
    console.log(page + ' 전환');
    $(pages.join(', ')).hide();
    $(page).show();
    currentPage = page;
}

// 뒤로 가기 함수
function goBack() {
    const preIndex = pages.indexOf(currentPage);
    const targetPage = pages[preIndex - 1];

    if (pages[preIndex] === pages[1]) {
        $('#thumbnail-img').empty();
        $('.add-img-container').empty();
        $("#style-tags input[type='checkbox']:checked").prop("checked", false);
        $("#tpo-tags input[type='radio']").prop("checked", false);
        $("#season-tags input[type='radio']").prop("checked", false);
        $('#content').val('');
    }

    if (pages[preIndex] === pages[2]) {
        $('.result-list').empty();
    }

    showPage(targetPage);
}


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
        imgList: imgList,
    };

    let nextPost = {
        postContent: $('#content').val(),
        tpoId: -1,
        seasonId: -1,
        styleId: -1,
        thumbnail: imgList[0],
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

    if (typeof post['seasonId'] === 'undefined' || typeof post['tpoId'] === 'undefined'
        || (Array.isArray(post['styleId']) && post['styleId'].length === 0)) {
        alert('태그를 선택해주세요');
        return;
    }

    if (post['postContent'] === '') {
        alert('내용을 작성해주세요');
        return;
    }

    // 핀
    let product = Object.values(items).map(item => {
        return {
            pinX: (item.xPos / imgWidth) * 100,
            pinY: (item.yPos / imgHeight) * 100,
            pinType: item.pinType,
            productId: item.productId,
            productSize: item.productSize,
            productColor: item.productColor
        };
    });

    let postingVO = {postVO: post, postProductVO: product};

    sendPostToServer(postingVO);
    printSelectTagAndContent(nextPost);

    showPage('.post-container');
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
    $('.search-value').text(`${productName}`);
    $('.search-value-fixed').text('상품 검색 결과입니다.');

    $.each(results, function(index, product) {
        let listItem = $("<li>").addClass("search-product-li");
        let divItem = $("<div>").addClass("search-product-div");
        listItem.append($("<img>").attr("src", product.productImg).addClass("search-product-img"));
        divItem.append($("<p>").text(product.productId).addClass("search-product-id").attr("hidden", true));
        divItem.append($("<p>").text(product.productBrand).addClass("search-product-brand"));
        divItem.append($("<p>").text(product.productName).addClass("search-product-name"));
        divItem.append($("<p>").text('₩ ' + product.productPrice.toLocaleString()).addClass("search-product-price"));
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
        const styleTags = data.filter(tag => tag.type === 'style');
        const tpoTags = data.filter(tag => tag.type === 'tpo');
        const seasonTags = data.filter(tag => tag.type === 'season');

        insertTags('style', styleTags);
        insertTags('tpo', tpoTags);
        insertTags('season', seasonTags);
    });
}

// 2. 태그 넣어주는 함수
function insertTags(tagType, tagData) {
    const $tagContainer = $('#' + tagType + '-tags');

    $.each(tagData, function(index, tag) {
        const inputType = (tagType === 'style') ? 'checkbox' : 'radio';
        const tagElement = `
            <div>
                <input type="${inputType}" id="${tag.tagName}" tag-id="${tag.tagId}" name="${tagType}-radio-group">
                <label for="${tag.tagName}">${tag.tagName}</label>
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

    $(".image-container img").attr("src", "data:image/png;base64," + vo['thumbnail']);

    const imageElement = $(`<p>${tpoIdStr} ${seasonIdStr} ${styleIdStr}</p>`);
    const li = $("<li>").append(imageElement);
    $(".tag-list").append(li);

    $(".content-text").append(vo['postContent']);
}

function moveHome() {
    window.location.href = '/';
}

function imageSlider(slider) {
    let isDown = false;
    let startX;
    let scrollLeft;
//    const slider = $('.add-img-container');

    const end = () => {
        isDown = false;
        slider.removeClass('active');
    };

    const start = (e) => {
        isDown = true;
        slider.addClass('active');
        startX = e.pageX || e.originalEvent.touches[0].pageX - slider.offset().left;
        scrollLeft = slider.scrollLeft();
    };

    const move = (e) => {
        if (!isDown) return;

        e.preventDefault();
        const x = e.pageX || e.originalEvent.touches[0].pageX - slider.offset().left;
        const dist = (x - startX);
        slider.scrollLeft(scrollLeft - dist);
    };

    slider.on('mousedown touchstart', 'li', start);
    slider.on('mousemove touchmove', move);
    slider.on('mouseleave mouseup touchend', end);
}



