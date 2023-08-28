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

    $('#upload-button').click(function() {
        getFormValue();
        $(".write-container").hide();
        $(".post-container").show();
        sendPostToServer();
    });

    $("#fileInput").change(function(e) {
        const files = e.target.files;
        imgList.push(files);
        $.each(files, function(index, file) {
            if (!file.type.match("image/.*")) {
                alert("이미지 파일만 업로드할 수 있습니다.");
                return;
            }
            const reader = new FileReader();
            reader.onload = function(e) {
                const imageElement = $("<img>").attr("src", e.target.result).attr("data-file", file.name);
                const li = $("<li>").append(imageElement);
                $('#image-list').append(li);
                container = imageElement;

                imageElement.click(function(e) {
                    var XOffset = e.offsetX;
                    var YOffset = e.offsetY;
                    console.log("offset: ", XOffset, YOffset);

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
        $(".search-container").hide();
        $("#search-input").val("");
        $(".write-container").show();

        if (tagValue) {
            getSearchProduct(tagValue);
            var tagElement = $("<span>").addClass("tag").text(tagValue).attr("id","tag_"+new Date().getTime()).css({
                left: xOffset + "px",
                top: yOffset + "px",
                position: "absolute"
            });

            const id = tagElement.attr('id');  // 아이템에 고유한 ID를 설정해야 합니다.
            items[id] = {
                initialX: 0,
                initialY: 0,
                currentX: 0,
                currentY: 0,
                xOffset: 0,
                yOffset: 0,
                active: false
            };

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

        // 이미지의 크기와 위치를 가져옵니다.
        const imgWidth = container.width();
        const imgHeight = container.height();
        const imgOffset = container.offset();

        if (newX >= imgOffset.left && newX <= imgOffset.left + imgWidth &&
            newY >= imgOffset.top && newY <= imgOffset.top + imgHeight) {

            // 현재 위치를 저장합니다.
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

function searchProduct(productName) {
    $.ajax({
        url: '/hyunique/post/search',
        type: 'GET',
        contentType: 'application/json',
        data: {productName},
        success: function(response) {
            window.location.href = 'post/search';
        }
    });

    $("#search-btn").click(function() {
        return $("#productName").val();
    });
}

function getFormValue() {
    styleChecked = $('input[name="style"]:checked').val();
    tpoChecked = $('input[name="tpo"]:checked').val();
    seasonChecked = $('input[name="season"]:checked').val();
    content = $('#content').val();

    $('.post-image-container').append(imgList[0]);
    $('.tag-container').append(styleChecked + ' ' + tpoChecked + ' ' + seasonChecked);

    console.log(styleChecked, tpoChecked, seasonChecked, content, imgList[0]);
}

function sendPostToServer() {
    var PostingVO = {
        postContent: content,
        tpoName: tpoChecked,
        seasonName: seasonChecked,
        styleName: styleChecked,
        imgUrl: img
    };

    $.ajax({
        url: `${url}/post`,
        type: 'POST',
        enctype:"multipart/form-data",
        contentType: 'application/json',
        data: JSON.stringify(PostingVO),
        processData: false,   // 업로드를 위한 필수 파라미터
        contentType: false,   // 업로드를 위한 필수 파라미터
        success: function(response) {
            console.log(response);
        }
    });
}

function getSearchProduct(productName) {
    $.ajax({
        url: 'url: '/hyunique/post/search/' + productName,
        type: 'GET',
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function(response) {
            console.log(response);
        }
    });
}