function modalEvent() {
    // 새로운 코드 시작
    let colorIndex = 0;
    let sizeIndex = 0;

    $('#color-picker, #size-picker').off('touchstart touchmove touchend'); // 기존 이벤트 리스너 제거

    const colorItems = $('#color-picker .slide-item');
    const sizeItems = $('#size-picker .slide-item');

    const colorCount = colorItems.length;
    const sizeCount = sizeItems.length;

    let initialTouchPos = null;
    let lastTouchPos = null;

    function updateSlide(newTop = null, pickerId) {
      if (pickerId === 'color-picker') {
        $('#color-picker').data('selected-index', $(colorItems[colorIndex]).text());
        if (newTop === null) {
          newTop = -colorIndex * 50;
        }
        $('#colorContent').css('top', `${newTop}px`);
      } else if (pickerId === 'size-picker') {
        $('#size-picker').data('selected-index', $(sizeItems[sizeIndex]).text());
        if (newTop === null) {
          newTop = -sizeIndex * 50;
        }
        $('#sizeContent').css('top', `${newTop}px`);
      }
    }

    updateSlide(null, 'color-picker');
    updateSlide(null, 'size-picker'); // 초기 위치 설정

    $('#color-picker, #size-picker').on('touchstart', function(e) {
      initialTouchPos = e.originalEvent.touches[0].clientY;
    });

    $('#color-picker, #size-picker').on('touchmove', function(e) {
      e.preventDefault();
      lastTouchPos = e.originalEvent.touches[0].clientY;
      const offset = lastTouchPos - initialTouchPos;
      const newTop = this.id === 'color-picker' ? -colorIndex * 50 + offset : -sizeIndex * 50 + offset;
      updateSlide(newTop, this.id);
    });

    $('#color-picker, #size-picker').on('touchend', function(e) {
      const finalTouchPos = e.originalEvent.changedTouches[0].clientY;

      if (initialTouchPos - finalTouchPos > 30) {  // Upward swipe
        if (this.id === 'color-picker') {
          colorIndex = (colorIndex + 1) % colorCount;
        } else {
          sizeIndex = (sizeIndex + 1) % sizeCount;
        }
      } else if (initialTouchPos - finalTouchPos < -30) { // Downward swipe
        if (this.id === 'color-picker') {
          colorIndex = (colorIndex - 1 + colorCount) % colorCount;
        } else {
          sizeIndex = (sizeIndex - 1 + sizeCount) % sizeCount;
        }
      }
      updateSlide(null, this.id);
    });
    // 새로운 코드 끝
}