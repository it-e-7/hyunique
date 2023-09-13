let container;
const imgContainer = $('#thumbnail-img');

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

    console.log('현재 좌표 ', xOffset, yOffset);
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
    });
};

// 터치 시작, 마우스 클릭 시
imgContainer.on('mousedown touchstart', function(e) {
    dragContainer(e);
});

// 드래그
imgContainer.on('dragstart', function () {
    return false;
});

// touchmove 이벤트 발생시 스크롤이 움직이지 않도록 함
document.addEventListener('touchmove', function(event) {
    event.preventDefault();
}, { passive: false });


/* 핀 방향 바꾸기 */
/*
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
});*/


