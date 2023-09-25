const imageData = localStorage.getItem('image');

if (imageData) {
    const imageElement = $("<img>").attr("src", imageData)
                                   .attr("draggable", 'false')
                                   .attr("class", "image");
    $('.img-section-area').append(imageElement);
}

// 크롭 영역 및 핸들 생성
const $rectangle = $('<div>').attr('id', 'rectangle');
const $topLeft = $('<div>').addClass('handle').attr('id', 'top-left');
const $topRight = $('<div>').addClass('handle').attr('id', 'top-right');
const $bottomLeft = $('<div>').addClass('handle').attr('id', 'bottom-left');
const $bottomRight = $('<div>').addClass('handle').attr('id', 'bottom-right');

$rectangle.append($topLeft, $topRight, $bottomLeft, $bottomRight);
$('.img-section-area').append($rectangle);

let isDragging = false;
let resizing = false;
let currentHandle = null;

const imgContainer = $('.img-section-area');

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

    const imgLeft = imgContainer.offset().left;
    const imgTop = imgContainer.offset().top;
    const imgWidth = imgContainer.width();
    const imgHeight = imgContainer.height();

    function moveAt(clientX, clientY) {
        let newLeft = clientX - shiftX;
        let newTop = clientY - shiftY;

        newLeft = Math.max(imgLeft, Math.min(newLeft, imgLeft + imgWidth - target.width()));
        newTop = Math.max(imgTop, Math.min(newTop, imgTop + imgHeight - target.height()));

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

$('.img-section-area').on('mousedown touchstart', '.handle', function(e) {
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


/* 이미지 크롭 */

// 캔버스 초기화 함수
function initCanvas(img, canvas) {
    canvas.width = img.clientWidth;
    canvas.height = img.clientHeight;
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(img, 0, 0, img.clientWidth, img.clientHeight);
}

const img = $('.image')[0];
const canvas = $('<canvas>')[0];

// 이미지가 로드되면 캔버스에 그림
$(img).on('load', function() {
    const imgWidth = parseFloat($(this).css('width').replace('px', ''));
    const imgHeight = parseFloat($(this).css('height').replace('px', ''));

    // 캔버스 크기 설정
    canvas.width = imgWidth;
    canvas.height = imgHeight;

    // 캔버스를 중앙에 배치
    $(canvas).css({
        'max-width': '100%',
        'max-height': '100%',
        'margin': 'auto',
        'position': 'absolute',
        'top': 0,
        'bottom': 0,
        'left': 0,
        'right': 0,
        'z-index': -1
    });

    $('.img-section-area').append(canvas); // 새로운 코드

    initCanvas(img, canvas);
});

let timer = null;
let isMoved = false;

$('#rectangle').on('mousemove touchmove', function() {
    isMoved = true;
    if (timer) {
        clearTimeout(timer);
    }

    const rectangle = $('#rectangle');
    const canvasOffset = $(canvas).offset();
    const x = rectangle.offset().left - canvasOffset.left;
    const y = rectangle.offset().top - canvasOffset.top;
    const width = rectangle.width();
    const height = rectangle.height();

    const newCanvas = $('<canvas>')[0];
    newCanvas.width = width;
    newCanvas.height = height;
    const newCtx = newCanvas.getContext('2d');
    newCtx.drawImage(canvas, x, y, width, height, 0, 0, width, height);

    $('#croppedImage').remove();
    const croppedImageData = newCanvas.toDataURL();
    const newImage = $("<img>").attr("src", croppedImageData).attr("id", "croppedImage");
    $(".img-section-area").append(newImage);

    timer = setTimeout(() => {
        if (!isMoved) return;
        sendToServerImg(newCanvas);
        switchLayers();
        $('.modal').show();
    }, 3000);
});


function sendToServerImg(newCanvas) {
    newCanvas.toBlob(function(blob) {
        const formData = new FormData();
        formData.append('image', blob, 'imgSearch.jpg');

        $.ajax({
            url: '/product/img-search',
            type: 'POST',
            processData: false,
            contentType: false,
            data: formData,
            success: function(data) {
            console.log('Image sent successfully:', data);
                if (data) {
                    renderImgSearchResults(data);
                    switchLayers();
                }
            },
            error: function(error) {
                console.error('Error:', error);
            }
        });
    }, 'image/jpeg', 0.95);
}
