let container;

// 사용자가 클릭한 좌표 정보 저장
let XOffset = 0;
let YOffset = 0;

$('#thumbnail-img').on('click', 'img', function(e){
    imgWidth = $(this).width();
    imgHeight = $(this).height();

    XOffset = e.offsetX;
    YOffset = e.offsetY;

    showPage('.search-container');
    $('.search-value').empty();
    $('.result-list').empty();
});

// 터치한 위치에 상품 정보 핀 찍기
function attachTag(xOffset, yOffset, vo) {
    let tagElement = $("<span>").addClass("post-pin arrow-left").attr("id","tag_"+new Date().getTime()).css({
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
        pinType: 'arrow-left',
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

// 핀 움직이는 이벤트
function dragStart(event, id) {
    const item = items[id];

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

/* 핀 방향 바꾸기 */
let isMouseDown = false;  // 마우스를 누르고 있는지 판단하는 변수

// 마우스를 누르면 isMouseDown을 true로 설정
$(".image-view").on("mousedown", ".post-pin", function() {
    isMouseDown = true;
});

$(".image-view").on("mouseup", ".post-pin", function(event) {
    // 마우스를 뗄 때 동작
    if (isMouseDown) {
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