// 모달을 띄우기 위한 스크립트

document.addEventListener("DOMContentLoaded", function() {

var itemsPerPage = 10;
        var currentPage = 1;
        var isLoading = false; //로딩중이다 아니다를 판단하기 위함

        $(window).scroll(function() {
            if (isScrollbarAtBottom()) {
                            if (isLoading) {
                                return;
                            }
                loadMoreImages();
            }
        });

        function loadMoreImages() {
        isLoading = true;
            $.ajax({
                url: `/filter/getFilterPost`,
                type: "GET",
                data: {
                    page: currentPage
                },
                success: function(data) {
                    $("#photo-gallery").append(data);
                    currentPage++;
                    isLoading = false;
                }
            });
        }

        function isScrollbarAtBottom() {
            var element = document.documentElement;
            var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (element.scrollTop || 0);
            var scrollHeight = (element.scrollHeight !== undefined) ? element.scrollHeight : 0;
            var windowHeight = element.clientHeight || window.innerHeight;

            return scrollTop + windowHeight >= scrollHeight; // 스크롤바가 가장 아래에 있는 경우 true를 반환
        }

        loadMoreImages();
        //이건 첫 로딩을 위한 로드 모어 이미지입니다!

    const filterModalButton = document.getElementById("filterModalButton");
    const modal = document.querySelector(".modal");
    const closeModalButton = document.getElementById("closeModalButton"); // 모달 닫기 버튼

    const formData = {
                minHeight: 140, // 초기 값 설정
                maxHeight: 180, // 초기 값 설정
    };

    filterModalButton.addEventListener("click", function() {
        modal.style.display = "block"; // 모달을 표시
        updateRangeBackgroundColor();
    });

    // 모달 닫기 버튼 클릭 시 모달 닫음
    closeModalButton.addEventListener("click", function() {
        modal.style.display = "none";
    });

    // 모달 외부를 클릭하면 모달을 닫습니다.
    modal.addEventListener("click", function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    //필터 검색

        const applyFilterButton = document.getElementById("applyFilter"); // 적용 버튼 선택
        // 적용 버튼을 클릭할 때 AJAX로 데이터를 서버로 전송
        applyFilterButton.addEventListener("click", function() {

        //데이터를 가져옵니다.
        const selectedGender = document.querySelector('input[name="gender"]:checked');
        const selectedTpoCheckboxes = document.querySelectorAll('input[name="tpo"]:checked');
        const selectedSeasonCheckboxes = document.querySelectorAll('input[name="season"]:checked');
        const selectedMoodCheckboxes = document.querySelectorAll('input[name="mood"]:checked');

            let selectedTpoValues = [];
            let selectedSeasonValues = [];
            let selectedMoodValues = [];
            formData.page = currentPage;

                if (selectedGender) {
                    formData.gender = selectedGender.value;
                } else {
                    formData.gender = null;
                }

                if (selectedTpoCheckboxes.length > 0) {
                    selectedTpoValues = Array.from(selectedTpoCheckboxes).map(checkbox => checkbox.value);
                    formData.tpo = selectedTpoValues;
                } else {
                    formData.tpo  = [];
                }

                if (selectedSeasonCheckboxes.length > 0) {
                    selectedSeasonValues = Array.from(selectedSeasonCheckboxes).map(checkbox => checkbox.value);
                    formData.season = selectedSeasonValues;
                } else {
                    formData.season  = [];
                }

                if (selectedMoodCheckboxes.length > 0) {
                    selectedMoodValues = Array.from(selectedMoodCheckboxes).map(checkbox => checkbox.value);
                    formData.mood = selectedMoodValues;
                } else {
                    formData.mood  = [];
                }

            // AJAX를 사용하여 서버로 데이터 전송
            $.ajax({
                type: "GET",
                url: `/filter/getFilterPost`, // 서버 측 URL 설정
                data: formData,
                success: function(data) {
                    modal.style.display = "none";
                    $("#photo-gallery").empty();
                    $("#photo-gallery").append(data);
                    currentPage = 1;
                    loadMoreImages();
                },
                error: function(err) {
                    // 오류 처리
                    console.error(err);
                }
            });
        });

    // 각 요소 가져오기
    const sliderContainer = document.querySelector('.rs-container');
    const leftPointer = document.querySelector('.rs-pointer[data-dir="left"]');
    const rightPointer = document.querySelector('.rs-pointer[data-dir="right"]');
    const rsHeight = document.querySelector('.rs-height');

    // 초기 위치 설정
    leftPointer.style.left = '0%'; // 원하는 초기 위치 설정 (여기서는 슬라이더의 가장 왼쪽)
    rightPointer.style.left = '100%'; // 원하는 초기 위치 설정 (여기서는 슬라이더의 가장 오른쪽)

    // 슬라이더 이벤트 핸들러
    function updateRsHeight() {
        const minHeight = 140; // 최소 키
        const maxHeight = 180; // 최대 키

        // 슬라이더의 현재 위치 계산 찾을 수 없으면 뒤에 나온 퍼센트로
        const leftValue = parseFloat(leftPointer.style.left) || 0;
        const rightValue = parseFloat(rightPointer.style.left) || 100;
        // 실제 높이 계산
        const currentMinHeight = minHeight + (leftValue / 100) * (maxHeight - minHeight);
        const currentMaxHeight = minHeight + (rightValue / 100) * (maxHeight - minHeight);

        // rs-height 업데이트 반올림으로
        rsHeight.textContent = `${currentMinHeight.toFixed(0)}cm - ${currentMaxHeight.toFixed(0)}cm`;

        formData.minHeight = parseInt(currentMinHeight.toFixed(0));
        formData.maxHeight = parseInt(currentMaxHeight.toFixed(0));

    }

    // 슬라이더 드래그 이벤트 처리
    let isLeftDragging = false;
    let isRightDragging = false;
    let leftOffsetX = 0;
    let rightOffsetX = 0;

    leftPointer.addEventListener('mousedown', function (e) {
            isLeftDragging = true;
    });

    rightPointer.addEventListener('mousedown', function (e) {
            isRightDragging = true;
    });

    document.addEventListener('mousemove', function (e) {
        if (isLeftDragging) {
            const newLeftValue = (e.clientX - leftOffsetX - sliderContainer.getBoundingClientRect().left) / sliderContainer.clientWidth * 100;
            // 보정: 왼쪽 원은 오른쪽 원을 넘어가지 못하도록 체크
            const rightValue = parseFloat(rightPointer.style.left) || 100;
            if (newLeftValue < 0) {
                leftPointer.style.left = '0%';
            } else if (newLeftValue + 3 > rightValue) { // 여기서 10은 원의 크기에 따라 조절해야 할 수치입니다.
                leftPointer.style.left = (rightValue - 3) + '%';
            } else {
                leftPointer.style.left = newLeftValue + '%';
                leftPointer.style.left = newLeftValue + '%';
            }
                updateRangeBackgroundColor();
        }


        if (isRightDragging) {
            const newRightValue = (e.clientX - rightOffsetX - sliderContainer.getBoundingClientRect().left) / sliderContainer.clientWidth * 100;

            // 보정: 오른쪽 원은 왼쪽 원을 넘어가지 못하도록 체크
            const leftValue = parseFloat(leftPointer.style.left) || 0;
            if (newRightValue > 100) {
                rightPointer.style.left = '100%';
            } else if (newRightValue - 3 < leftValue) { // 여기서 10은 원의 크기에 따라 조절해야 할 수치입니다.
                rightPointer.style.left = (leftValue + 3) + '%';
            } else {
                rightPointer.style.left = newRightValue + '%';
            }
                updateRangeBackgroundColor();
        }

        updateRsHeight();
    });

    document.addEventListener('mouseup', function () {
        isLeftDragging = false;
        isRightDragging = false;
    });

    // 라디오 버튼위한 스크립트 (ex.성별)
    const maleRadio = document.getElementById("maleRadio");
    const femaleRadio = document.getElementById("femaleRadio");

    maleRadio.addEventListener("click", function() {
        femaleRadio.checked = false;
    });

    femaleRadio.addEventListener("click", function() {
        maleRadio.checked = false;
    });

    function updateRangeBackgroundColor() {
        const leftValue = parseFloat(leftPointer.style.left) || 0;
        const rightValue = parseFloat(rightPointer.style.left) || 100;
        const rangeElement = document.querySelector('.rs-slider-region');

        // Calculate the width of the range
        const rangeWidth = rightValue - leftValue;

        // Set the width and position of the range background
        rangeElement.style.left = leftValue + '%';
        rangeElement.style.width = rangeWidth + '%';
    }

});