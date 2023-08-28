let imgList = [];
let styleChecked;
let tpoChecked;
let seasonChecked;
let content;

let x;
let y;
let tag;
let tagFloatingDiv;

let pressTimer;

var container = $("#image-view");

var active = false;
var currentX;
var currentY;
var initialX;
var initialY;
var xOffset = 0;
var yOffset = 0;

$(document).ready(function() {
    $("#uploadButton").click(function() {
        $("#fileInput").click();
    });

    $("#fileInput").change(function() {
        $(".container").hide();
        $(".write-container").show();
    });

    $('#upload-button').click(function(){
        getFormValue();
        $(".write-container").hide();
        $(".post-container").show();
        console.log(img);
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

                // 좌표 선택 (저장할 때 퍼센트로 저장하기)
                imageElement.click(function(e){
                    var offsetX = e.offsetX;
                    var offsetY = e.offsetY;
                    var tagValue = prompt("태그를 입력하세요:"); // 태그 값을 입력받습니다.
                    if (tagValue) {
                        var tagElement = $("<span>").addClass("tag").text(tagValue).css({
                            left: offsetX + "px",
                            top: offsetY + "px",
                            position: "absolute"
                        });
//                        li.append(tagElement);
                        $(this).parent().append(tagElement);
                        tagElement.draggable();


container.on("mousedown touchstart", function(event) {
    dragStart(event);
});

container.on("mouseup touchend", function(event) {
    dragEnd(event);
});

container.on("mousemove touchmove", function(event) {
    drag(event);
});

function dragStart(event) {
    if (event.type === "touchstart") {
        initialX = event.touches[0].clientX - xOffset;
        initialY = event.touches[0].clientY - yOffset;
    } else {
        initialX = event.clientX - xOffset;
        initialY = event.clientY - yOffset;
    }

    if (event.target === container.get(0)) {
        active = true;
    }
}

function dragEnd(event) {
    initialX = currentX;
    initialY = currentY;

    active = false;
}

function drag(event) {
    if (active) {
        event.preventDefault();

        if (event.type === "touchmove") {
            currentX = event.touches[0].clientX - initialX;
            currentY = event.touches[0].clientY - initialY;
        } else {
            currentX = event.clientX - initialX;
            currentY = event.clientY - initialY;
        }

        xOffset = currentX;
        yOffset = currentY;

        container.css("transform", "translate3d(" + currentX + "px, " + currentY + "px, 0)");
    }
}


    function dragStart(e) {
      if (e.type === "touchstart") {
        initialX = e.touches[0].clientX - xOffset;
        initialY = e.touches[0].clientY - yOffset;
      } else {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
      }

      if (e.target === tagElement) {
        active = true;
      }
    }

    function dragEnd(e) {
      initialX = currentX;
      initialY = currentY;

      active = false;
    }

    function drag(e) {
      if (active) {

        e.preventDefault();

        if (e.type === "touchmove") {
          currentX = e.touches[0].clientX - initialX;
          currentY = e.touches[0].clientY - initialY;
        } else {
          currentX = e.clientX - initialX;
          currentY = e.clientY - initialY;
        }

        xOffset = currentX;
        yOffset = currentY;

        setTranslate(currentX, currentY, tagElement);
      }
    }

    function setTranslate(xPos, yPos, el) {
      el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
    }

                    }
                });
            };
            reader.readAsDataURL(file);
        });
    });

});

function getFormValue() {
    styleChecked = $('input[name="style"]:checked').val();
    tpoChecked = $('input[name="tpo"]:checked').val();
    seasonChecked = $('input[name="season"]:checked').val();
    content = $('#content').val();

    $('.post-image-container').append(img);
    $('.tag-container').append(styleChecked + ' ' + tpoChecked + ' ' + seasonChecked);

    console.log(styleChecked, tpoChecked, seasonChecked, content, img);
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




