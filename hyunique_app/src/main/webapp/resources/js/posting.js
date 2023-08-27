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
    });

    $('#upload-button').click(function() {
        getFormValue();
        $(".write-container").hide();
        $(".post-container").show();
        sendPostToServer();

        console.log(items);
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

                    var tagValue = prompt("태그를 입력하세요:");
                    if (tagValue) {

                        var tagElement = $("<span>").addClass("tag").text(tagValue).attr("id","tag_"+new Date().getTime()).css({
                            left: XOffset + "px",
                            top: YOffset + "px",
                            position: "absolute"
                        });

                        const id = tagElement.attr('id');
                        console.log("id: "+ id);

                        items[id] = {
                            initialX: 0,
                            initialY: 0,
                            currentX: 0,
                            currentY: 0,
                            xOffset: 0,
                            yOffset: 0,
                            active: false
                        };

                        console.log("전역 : " + XOffset, YOffset);

                        items[id].xOffset = XOffset;
                        items[id].yOffset = YOffset;

                        li.append(tagElement);

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
                });
            };
            reader.readAsDataURL(file);
        });
    });
});

function dragStart(event) {
    const id = event.target.id;
    const item = items[id];

    console.log(item.xOffset, item.yOffset);

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

        if (event.type === "touchmove") {
            item.currentX = event.touches[0].clientX - item.initialX;
            item.currentY = event.touches[0].clientY - item.initialY;
        } else {
            item.currentX = event.clientX - item.initialX;
            item.currentY = event.clientY - item.initialY;
        }

        item.xOffset = item.currentX;
        item.yOffset = item.currentY;

        setTranslate(item.currentX, item.currentY, tagElement);
    }
}


function setTranslate(xPos, yPos, el) {
    el.css({
        "left": xPos + "px",
        "top": yPos + "px"
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
        url: '/hyunique/post',
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