const imageData = localStorage.getItem('image');
if (imageData) {
    const imageElement = $("<img>").attr("src", imageData)
                                   .attr("draggable", 'false')
                                   .attr("class", "image");
    $('#container').append(imageElement);
}

// 사각형 및 핸들 생성
const $rectangle = $('<div>').attr('id', 'rectangle');
const $topLeft = $('<div>').addClass('handle').attr('id', 'top-left');
const $topRight = $('<div>').addClass('handle').attr('id', 'top-right');
const $bottomLeft = $('<div>').addClass('handle').attr('id', 'bottom-left');
const $bottomRight = $('<div>').addClass('handle').attr('id', 'bottom-right');

$rectangle.append($topLeft, $topRight, $bottomLeft, $bottomRight);
$('#container').append($rectangle);

let isDragging = false;
let resizing = false;
let currentHandle = null;

const imgContainer = $('#container');

const dragContainer = (e) => {
    if (resizing) return;

    if (e.type === 'touchstart') {
        e = e.originalEvent.touches[0];
    }

    let id = $(e.target).closest('#rectangle').attr('id');

    const target = $(e.target).closest('#rectangle');
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

        isDragging = false;
        resizing = false;
        currentHandle = null;
    });
};

// 터치 시작, 마우스 클릭 시
imgContainer.on('mousedown touchstart', '#rectangle', function(e) {
    e.stopPropagation();
    isDragging = false;
    dragContainer(e);
});

// 드래그
imgContainer.on('dragstart', function () {
    return false;
});

/* 영역 사이즈 변경 */

let prevX, prevY;

$('#container').on('mousedown touchstart', '.handle', function(e) {
    resizing = true;
    currentHandle = $(this).attr('id');

    let clientX, clientY;
    if (e.type === 'touchstart') {
        clientX = e.originalEvent.touches[0].pageX;
        clientY = e.originalEvent.touches[0].pageY;
    } else {
        clientX = e.pageX;
        clientY = e.pageY;
    }

    prevX = clientX;
    prevY = clientY;

    e.preventDefault();
});

$(document).on('mousemove touchmove', function(e) {
    if (resizing) {
        const rectangle = $("#rectangle");
        const rectOffset = rectangle.offset();

        if (e.type === 'touchmove') {
            e = e.originalEvent.touches[0];
        }

        let dx = e.pageX - prevX;
        let dy = e.pageY - prevY;

        let newWidth = rectangle.width();
        let newHeight = rectangle.height();
        let newLeft = parseFloat(rectangle.css('left'));
        let newTop = parseFloat(rectangle.css('top'));

        switch(currentHandle) {
            case 'top-left':
                newLeft += dx;
                newTop += dy;
                newWidth -= dx;
                newHeight -= dy;
                break;
            case 'top-right':
                newTop += dy;
                newWidth += dx;
                newHeight -= dy;
                break;
            case 'bottom-left':
                newLeft += dx;
                newWidth -= dx;
                newHeight += dy;
                break;
            case 'bottom-right':
                newWidth += dx;
                newHeight += dy;
                break;
        }

        rectangle.css({
            'left': newLeft + 'px',
            'top': newTop + 'px',
            'width': newWidth + 'px',
            'height': newHeight + 'px'
        });

        prevX = e.pageX;
        prevY = e.pageY;
    }
});

$(document).on('mouseup touchend', function() {
    resizing = false;
    currentHandle = null;
});
