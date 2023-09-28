const compressedFileList = [];

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

// 이미지 압축
async function compressImage(inputFile) {
    try {
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1200,
        };
        return await imageCompression(inputFile, options);

    } catch (error) {
        console.error("이미지 압축 오류", error);
        return null;
    }
}


// 썸네일 처리
function thumbnailUpload(e) {
    const file = e.target.files[0];
    if (!file.type.match("image/.*")) {
        alert("이미지 파일만 업로드할 수 있습니다.");
        return;
    }
    // 파일 압축
    compressImage(file).then(compressedFile => {
        if (compressedFile) {
            compressedFileList.push(compressedFile);

            // 썸네일 생성
            const reader = new FileReader();
            reader.onload = function(event) {
            const thumbnail = $("<img>").attr("src", event.target.result)
                                        .attr("data-file", file.name)
                                        .attr("draggable", "false");
            $('.thumbnail-img-wrap').append(thumbnail);
            showPage('.write-container');
            };
            reader.readAsDataURL(compressedFile);
        }
    }).catch(error => {
        console.error("An error occurred:", error);
    });
}

// 추가 이미지
$("#addFileInput").change(function(e) {
    const files = e.target.files;

    $.each(files, function(index, file) {
        if (!file.type.match("image/.*")) {
            alert("이미지 파일만 업로드할 수 있습니다.");
            return;
        }

        // 파일 압축
        compressImage(file).then(compressedFile => {
            if (compressedFile) {
                compressedFileList.push(compressedFile);

                // 추가 이미지 처리
                const reader = new FileReader();
                reader.onload = function(e) {
                    const li = $("<li>");
                    const imageElement = $("<img>").attr("src", e.target.result)
                                                   .attr("data-file", file.name)
                                                   .attr("draggable", 'false');
                    li.append(imageElement);
                    $('.add-img-container').append(li);
                };
                reader.readAsDataURL(compressedFile);
            }
        }).catch(error => {
            console.error("파일 압축 중 오류 발생:", error);
        });
    });
});

// 추가 이미지 삭제
$('.add-img-container').on('click', 'li:not(:first)',  function() {
    $(this).remove();
});

// 작성 완료 버튼
$('#upload-button').click(function() {
    compileAndSendPostData();
});


function loadingStart() {
    $('.write-loading-wrapper').css({
        'overflow':'hidden'
    });

    $('.write-loading-wrapper').on('scroll touchmove mousewheel', function(event) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    });

    $('.write-loading-wrapper').show();
    $("#loading-icon").show();
}


function loadingEnd() {
    $('.write-loading-wrapper').css({
        'overflow': 'auto'
    });

    $('.write-loading-wrapper').off('scroll touchmove mousewheel');
    $('.write-loading-wrapper').hide();
    $("#loading-icon").hide();
}


$('#add-img-btn').click(function() {
    $('#addFileInput').click();
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
            alert('옵션을 선택하세요');
            return;
        }

        attachTag(XOffset, YOffset, product);
        $('.result-list').empty();
        closeModal();
        showPage('.write-container');
    });
});

// 화면 전환 함수
function showPage(page) {
    $(pages.join(', ')).hide();
    $(page).show();
    currentPage = page;

    if (page==='.write-container') {
        showTutorial();
    }
}

// 뒤로가기 함수
function goBack() {
    const preIndex = pages.indexOf(currentPage);
    const targetPage = pages[preIndex - 1];

    if (pages[preIndex] === pages[1]) {
        $('.thumbnail-img-wrap').empty();

        const container = $('.add-img-container');
        const firstItem = container.find('li').first().detach();

        if (firstItem.length) {
          container.empty();
          container.append(firstItem);
        }

        compressedFileList.length = 0;
        $("#style-tags input[type='checkbox']:checked").prop("checked", false);
        $("#tpo-tags input[type='radio']").prop("checked", false);
        $("#season-tags input[type='radio']").prop("checked", false);
        $('#content').val('');
    }

    if (pages[preIndex] === pages[2]) {
        $('.result-list').empty();
        $('.search-text').val('');
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
    const formData = new FormData();

    let tagValues = getGroupCheckBoxState();

    let post = {
        postContent: $('#content').val(),
        tpoId: -1,
        seasonId: -1,
        styleId: -1,
    };

    let nextPost = {
        postContent: $('#content').val(),
        tpoId: -1,
        seasonId: -1,
        styleId: -1,
        thumbnail: compressedFileList[0],
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

    // JSON 데이터를 문자열로 변환하고 FormData 객체에 추가
    formData.append("postingVO", JSON.stringify(postingVO));
    compressedFileList.forEach((file, index) => {
        formData.append("files", file, file.name);
    });

    try {
        loadingStart();
        sendPostToServer(formData, nextPost);
    } catch (error) {
        console.error("재업로드 필요: ", error);
    }
}


async function sendPostToServer(formData, nextPost) {
    try {
        const response = await fetch('/post', {
            method: 'POST',
            body: formData
        });

        const responseBody = await response.text();

        if (responseBody === 'success') {
            console.log('Upload success');
            printSelectTagAndContent(nextPost);
            showPage('.post-container');
            compressedFileList.length = 0;
        } else {
            console.log('Upload failed');
            alert("업로드가 실패하였습니다. 다시 시도해주세요.");
            throw new Error("Server responded with failure");
        }
    } catch (error) {
        console.error("파일 업로드 중 오류 발생:", error);
        throw error;
    } finally {
        loadingEnd();
    }
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

    let blob = new Blob([vo['thumbnail']], {type: 'image/jpeg'});
    let objectURL = URL.createObjectURL(blob);

    $("#post-image-thumbnail").html(
        $('<img>', {
           'src': objectURL
        })
    );

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

function showTutorial() {

    if (document.cookie.indexOf("tutorialSeen=true") === -1) {
        $('.tutorial-wrap').show();

        setTimeout(function() {
            $('.tutorial-wrap').hide();
        }, 4000);

        document.cookie = "tutorialSeen=true; expires=Fri, 31 Dec 9999 23:59:59 GMT";
    }
}

