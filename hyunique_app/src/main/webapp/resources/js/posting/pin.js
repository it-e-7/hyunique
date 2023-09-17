let container;
const imgContainer = $('#thumbnail-img');

// 사용자가 클릭한 좌표 정보 저장
let XOffset = 0;
let YOffset = 0;

let isDragging = false; // 핀 움직임 여부 판별
let isMouseDown = false; // 클릭 여부 판별

$('#thumbnail-img').on('click', 'img', function(e){
    imgWidth = $(this).width();
    imgHeight = $(this).height();

    XOffset = e.offsetX;
    YOffset = e.offsetY;

    showPage('.search-container');
    $('.search-value').empty();
    $('.search-value-fixed').empty();
    $('.result-list').empty();
});


// 터치한 위치에 상품 정보 핀 찍기
function attachTag(xOffset, yOffset, vo) {
    let tagElement = $("<span>").addClass("post-pin arrow-left").attr("id","tag_" + new Date().getTime())
                                .css({
                                    left: xOffset + "px",
                                    top: yOffset + "px",
                                    position: "absolute"
                                });

    let id = tagElement.attr('id');

    items[id] = {
        xPos: 0,
        yPos: 0,
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

    imgContainer.append(tagElement);

}

/* 핀 움직이는 이벤트 */

let currentDraggable = null;

const dragContainer = (e) => {
    if (e.type === 'touchstart') {
        e = e.originalEvent.touches[0];
    }

    let id = $(e.target).closest('.post-pin').attr('id');
    let item = items[id];

    const target = $(e.target).closest('.post-pin');
    if (target.length === 0) return;

    let initialX = parseInt(target.css('left'));
    let initialY = parseInt(target.css('top'));

    let shiftX = e.clientX - initialX;
    let shiftY = e.clientY - initialY;

    target.css({
        'position': 'absolute',
        'z-index': 1000
    });

    imgContainer.append(target);

    function moveAt(clientX, clientY) {
        target.css({
            left: clientX - shiftX + 'px',
            top: clientY - shiftY + 'px'
        });
    }

    function onMouseMove(event) {
        isDragging = true;

        if (event.type === 'touchmove') {
            event = event.touches[0];

        }
        moveAt(event.clientX, event.clientY);
    }

    $(document).on('mousemove touchmove', onMouseMove);
    $(document).one('mouseup touchend', function (event) {
        $(document).off('mousemove touchmove', onMouseMove);

        let currentX = parseInt(target.css('left'));
        let currentY = parseInt(target.css('top'));

        initialX = currentX;
        initialY = currentY;

        item.xPos = currentX;
        item.yPos = currentY;

        isDragging = false;
    });
};

// 터치 시작, 마우스 클릭 시
imgContainer.on('mousedown touchstart', '.post-pin', function(e) {
    e.stopPropagation();
    isDragging = false;
    dragContainer(e);
});

// 드래그
imgContainer.on('dragstart', function () {
    return false;
});


/* 핀 방향 바꾸기 */
$("#thumbnail-img").on("mousedown", ".post-pin", function() {
    isMouseDown = true;
});

$("#thumbnail-img").on("mouseup", ".post-pin", function(event) {
    if (isMouseDown && !isDragging) {   // 클릭 상태이고, 드래깅하지 않는 경우
        if ($(this).data("currentIndex") === undefined) {
            $(this).data("currentIndex", 0);
        }

        let currentIndex = $(this).data("currentIndex");

        // 기존에 붙어있는 핀 방향 제거
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

window.addEventListener('touchmove', function(event) {
    if(isDragging) {
        event.preventDefault();
    }
}, { passive: false });
