let imgList = [];
let styleChecked;
let tpoChecked;
let seasonChecked;
let content;

let dragTag;
let container;

let items = {};

$(document).ready(function() {
    $("#uploadButton").click(function() {
        $("#fileInput").click();
    });

    $("#fileInput").change(function() {
        $(".container").hide();
        $(".write-container").show();
        $(".search-container").hide();
    });

    // 작성 완료 버튼
    $('#upload-button').click(function() {

        var postVO = getFormValue();

        sendPostToServer(postVO, items);
        $(".write-container").hide();
        $(".post-container").show();
//        sendPostToServer();
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
                    var XOffset = e.offsetX;
                    var YOffset = e.offsetY;

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

function attachTag(xOffset, yOffset, li) {
    return function() {
        var tagValue = $("#search-input").val();

        if (tagValue) {
            getSearchProduct(tagValue);

            var tagElement = $("<span>").addClass("tag").attr("id","tag_"+new Date().getTime()).css({
                left: xOffset + "px",
                top: yOffset + "px",
                position: "absolute"
            });

            var id = tagElement.attr('id');
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

function getFormValue() {

   var PostingVO = {
        postContent: $('#content').val(),
        tpoId: +$('input[name="tpo"]:checked').val(),
        seasonId: +$('input[name="season"]:checked').val(),
        styleId: +$('input[name="style"]:checked').val(),
        imgList: imgList,
    };

//    $('.post-image-container').append(imgList[0]);
//    $('.tag-container').append(styleChecked + ' ' + tpoChecked + ' ' + seasonChecked);

    return PostingVO;
}

function sendPostToServer(post, product) {
    const productArray = Object.values(items).map(item => {
        return {
            pinX: item.xOffset,
            pinY: item.yOffset,
            productId: item.productId,
            productBrand: item.productBrand,
            productName: item.productName,
            productPrice: item.productPrice,
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
            var resultList = $(".result-list");
            $('.search-value').val(productName);

            $.each(response, function(index, product) {
                var listItem = $("<li>").addClass("search-product-li");
                var divItem = $("<div>").addClass("search-product-div");
                listItem.append($("<img>").attr("src", product.productImg).addClass("search-product-img"));
                divItem.append($("<p>").text(product.productId).addClass("search-product-id"));
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