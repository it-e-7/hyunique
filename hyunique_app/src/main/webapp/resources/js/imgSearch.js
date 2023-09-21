const imageData = localStorage.getItem('image');
if (imageData) {
    const imageElement = $("<img>").attr("src", imageData)
                                   .attr("draggable", 'false')
                                   .attr("class", "image");
    const rectangleElement = $("<div>").attr("id", "rectangle");
    $('#container').append(imageElement, rectangleElement);
}



// JavaScript (jQuery)
$(document).ready(function() {
    let isDragging = false;
    let offsetX, offsetY;

    $('#rectangle').mousedown(function(e) {
        isDragging = true;
        offsetX = e.pageX - $(this).offset().left;
        offsetY = e.pageY - $(this).offset().top;
    });

    $(document).mouseup(function() {
        isDragging = false;
    });

    $(document).mousemove(function(e) {
        if (isDragging) {
            $('#rectangle').css({
                'top': e.pageY - offsetY,
                'left': e.pageX - offsetX
            });
        }
    });
});
