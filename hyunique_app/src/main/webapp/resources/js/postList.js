//추천, 스타일링 버튼을 클릭했을 때 작동

document.addEventListener('DOMContentLoaded', () => {
  const buttonContainer = document.getElementById('hyunique-main-top-recommend');
  const buttons = buttonContainer.querySelectorAll('.button');

  const selectedIndex = localStorage.getItem('selectedButtonIndex');

  buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
      buttons.forEach((btn) => {
        btn.classList.remove('selected');
      });

      button.classList.add('selected');

      localStorage.setItem('selectedButtonIndex', index.toString());
    });

    if (index === parseInt(selectedIndex)) {
      button.click();
    }
  });
});

  function handleButtonClick(tag) {
    //선택된 태그 값이 전달된다.
    //모달에서 원하는 값을 설정해서 처리해야 된다.

    var checkboxes = {
        '남': 'maleCheckbox',
        '여': 'femaleCheckbox',
        '미니멀': 'minimalCheckbox',
        '이지캐주얼': 'easyCheckbox',
        '비즈니스캐주얼': 'businessCheckbox',
        '스트릿': 'streetCheckbox',
        '원마일웨어': 'onemileCheckbox',
        '유니크': 'uniqueCheckbox',
        '러블리': 'lovelyCheckbox',
        '아메카지': 'amekajiCheckbox',
        '시티보이': 'cityboyCheckbox'
      };

      var checkboxId = checkboxes[tag];

      if (checkboxId) {
        var checkbox = document.getElementById(checkboxId);

        if (checkbox) {
          checkbox.checked = !checkbox.checked; // 체크 상태 토글
        }
      }
      //검색 시작
      document.getElementById("applyFilter").click();
  }