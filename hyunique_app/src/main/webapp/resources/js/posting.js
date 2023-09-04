let imgList = [];
let styleChecked;
let tpoChecked;
let seasonChecked;
let content;

let dragTag;
let container;

let items = {};

$(document).ready(function() {
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
    $('#upload-button').click(function() {
        let postVO = handleGroupCheckBoxState();

//        sendPostToServer(postVO, items);
        $(".post-container").show();
        $(".write-container").hide();
        $(".header-wrapper").hide();
    });

    $("#fileInput").change(function(e) {
        const files = e.target.files;
        $.each(files, function(index, file) {
            if (!file.type.match("image/.*")) {
                alert("이미지 파일만 업로드할 수 있습니다.");
                return;
            }
            const reader = new FileReader();
            reader.onload = function(e) {
                const imageElement = $("<img>").attr("src", e.target.result).attr("data-file", file.name);
                const img = reader.result.split(',')[1];
                imgList.push(img);

                const li = $("<li>").append(imageElement);
                $('#image-list').append(li);
                container = imageElement;

                imageElement.click(function(e) {
                    let XOffset = e.offsetX;
                    let YOffset = e.offsetY;

                    $(".result-list").empty();
                    $(".write-container").hide();
                    $(".search-container").show();

                    $("#search-btn").off('click').click(attachTag(XOffset, YOffset, li));
                });
            };
            reader.readAsDataURL(file);
        });
    });
});

// 터치한 위치에 선택한 상품을 태그로 붙이기
function attachTag(xOffset, yOffset, li) {
    return function() {
        let tagValue = $("#search-input").val();

        if (tagValue) {
            getSearchProduct(tagValue);

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
                productId: '',
                productBrand: '',
                productName: '',
                productPrice: 0,
                productSize: '',
                productColor: ''
            };

            $(".result-list").off("click").on("click", ".search-product-li", function() {
                items[id].productId = $(this).find(".search-product-id").text();
                items[id].productBrand = $(this).find(".search-product-brand").text();
                items[id].productName = $(this).find(".search-product-name").text();
                items[id].productPrice = $(this).find(".search-product-price").text();
                items[id].productSize = $(this).find(".search-product-size").text();

                console.log(id, items[id]);

                tagElement.html(`
                  ${items[id].productBrand}
                  ${items[id].productName}
                  ${items[id].productPrice}
                  ${items[id].productSize}
                `);

                $(".search-container").hide();
                $(".write-container").show();
                $("#search-input").val("");

            });

            items[id].xOffset = xOffset;
            items[id].yOffset = yOffset;

            li.append(tagElement);

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
        }
    };
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

function sendPostToServer(post, product) {
    const productArray = Object.values(items).map(item => {
        return {
            pinX: item.xOffset,
            pinY: item.yOffset,
            productId: item.productId,
            productSize: item.productSize,
        };
    });

    let combineObject = {postVO: post, postProductVO: productArray};

    $.ajax({
        url: `/post`,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(combineObject),
        success: function(response) {
            console.log(response);
        }
    });
}

function getSearchProduct(productName) {
    $.ajax({
        url: '/product/search/' + productName,
        type: 'GET',
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function(response) {
            let resultList = $(".result-list");
            $('.search-value').val(productName);

            $.each(response, function(index, product) {
                let listItem = $("<li>").addClass("search-product-li");
                let divItem = $("<div>").addClass("search-product-div");
                listItem.append($("<img>").attr("src", product.productImg).addClass("search-product-img"));
                divItem.append($("<p>").text(product.productId).addClass("search-product-id").attr("hidden", true));
                divItem.append($("<p>").text(product.productBrand).addClass("search-product-brand"));
                divItem.append($("<p>").text(product.productName).addClass("search-product-name"));
                divItem.append($("<p>").text(product.productPrice).addClass("search-product-price"));
                divItem.append($("<p>").text(product.productSize).addClass("search-product-size"));
                listItem.append(divItem);
                resultList.append(listItem);
            });
        }
    });
}


// 태그 선택했을 때 값 확인용
function handleCheckBoxState(tag, groupClass) {
    console.log(tag);

    let checkbox = $(`#${tag}`);
    console.log("checkbox: ", checkbox);
}

// 각 그룹별로 체크된 체크박스의 값을 ,단위로 구분해서 하나의 String 으로 반환
function getCheckedValuesInGroup(groupClass, type) {
    let checkedValuesString = "";

    $(`.${groupClass} input[type=${type}]:checked`).each(function() {
        checkedValuesString += $(this).attr('id') + ',';
    });

    checkedValuesString = checkedValuesString.slice(0, -1);
    return checkedValuesString;
}


// 태그 그룹별로 체크된 태그값 추출
function handleGroupCheckBoxState() {
    let styleCheckedValues = getCheckedValuesInGroup('style-button-group', 'checkbox');
    let tpoCheckedValues = getCheckedValuesInGroup('tpo-button-group', 'radio');
    let seasonCheckedValues = getCheckedValuesInGroup('season-button-group', 'radio');

    console.log('Style:', styleCheckedValues);
    console.log('TPO:', tpoCheckedValues);
    console.log('Season:', seasonCheckedValues);

    let PostingVO = {
        postContent: $('#content').val(),
        tpoId: tpoCheckedValues,
        seasonId: seasonCheckedValues,
        styleId: styleCheckedValues,
        imgList: imgList,
    };

    return PostingVO;
}

function getTagName(tagType) {
    $.ajax({
        url: `/post/tag/${tagType}`,
        type: 'GET',
        contentType: 'application/json',
        success: function(response) {
            console.log(response);
        }
    });
}