// 모달을 띄우기 위한 스크립트

document.addEventListener("DOMContentLoaded", function() {
    const filterModalButton = document.getElementById("filterModalButton");
    const modal = document.querySelector(".modal");
    const closeModalButton = document.getElementById("closeModalButton"); // 모달 닫기 버튼

    filterModalButton.addEventListener("click", function() {
        modal.style.display = "block"; // 모달을 표시
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

            let selectedTpoValues = [];
            const formData = {};

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

               console.log(formData);
            // AJAX를 사용하여 서버로 데이터 전송
            $.ajax({
                type: "GET",
                url: "/hyunique/api/filter/getFilterPost", // 서버 측 URL 설정
                data: formData,
                success: function(response) {
                    console.log(response);
                    modal.style.display = "none";
                },
                error: function(err) {
                    // 오류 처리
                    console.log(response);
                    console.error(err);
                }
            });
        });

});

// 키의 변화를 위한 스크립트
    const heightRange = document.getElementById("heightRange");
    const selectedHeight = document.getElementById("selectedHeight");

    // 키 입력 값에 따라 표시 업데이트
    heightRange.addEventListener("input", function() {
        selectedHeight.textContent = heightRange.value;
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