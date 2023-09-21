
$(document).ready(function() {
  let currentIndex = 0;
  const banner = document.getElementById("banner");
  const images = banner.querySelectorAll("img");
  const imageCount = images.length;
  const scrollInterval = setInterval(function() {
    currentIndex++;
    if (currentIndex >= imageCount) {
      currentIndex = 0;
    }
    const newScrollPosition = images[currentIndex].offsetLeft;
    banner.scroll({
      left: newScrollPosition,
      behavior: 'smooth'
    });
  }, 3000);
  $('.btn-grad').on('click', function() {
	    window.location.href = "/login";
	  });
});

//추천, 스타일링 버튼을 클릭했을 때 작동
document.addEventListener('DOMContentLoaded', () => {
  const buttonContainer = document.getElementById('hyunique-main-top-recommend');
  const buttons = buttonContainer.querySelectorAll('.button');

  const selectedIndex = localStorage.getItem('selectedButtonIndex');
  buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
      buttons.forEach((btn) => {
        btn.classList.remove('selected');
        scrollToTop()
      });
      button.classList.add('selected');
      localStorage.setItem('selectedButtonIndex', index.toString());
      
      //배너 처리
      if (button.textContent.trim() === '스타일랭킹') {
          banner.style.display = 'none'; // 배너 숨기기
          document.getElementById("ranking-wrapper").style.display = 'flex';
          document.getElementById("ranking-description").style.display = 'flex';
          document.getElementById("recommend-description").style.display = 'none';
          const filterElement = $('#hyunique-main-top-filter');
          filterElement.hide();
          } 
      else {
          banner.style.display = 'flex'; // 배너 보이기
          document.getElementById("ranking-wrapper").style.display = 'none';
          document.getElementById("ranking-description").style.display = 'none';
          document.getElementById("recommend-description").style.display = 'flex';
          const filterElement = $('#hyunique-main-top-filter');
          filterElement.show();
          }
      if (button.textContent.trim() === '팔로우') {
    	  banner.style.display = 'none'; // 배너 숨기기
    	  document.getElementById("ranking-wrapper").style.display = 'none';
    	  document.getElementById("ranking-description").style.display = 'none';
    	  document.getElementById("recommend-description").style.display = 'none';
      }
      
      
      const filterElement = $('#hyunique-main-top-filter');
      const popularStyle = $('#popular-style');
      //팔로우가 아니라면 필터 보이게 처리
      if(button.textContent.trim()==='팔로우'){
        popularStyle.show();
      }
      else{
        popularStyle.hide();
      }

     if(button.textContent.trim()==='AI추천'){
       document.getElementById("recommend").click();
     }
      document.getElementById("applyFilter").click();
    });

    if (index === parseInt(selectedIndex)) {
      button.click();
    }
  });
     buttons[0].click();
     
     const btnGrad = document.querySelector('.btn-grad');
     let isHover = false;

     function applyHoverState() {
       btnGrad.style.backgroundPosition = 'right center';
       btnGrad.style.color = '#fff';
     }

     function removeHoverState() {
       btnGrad.style.backgroundPosition = 'left center';
       btnGrad.style.color = 'white';
     }

     setInterval(function() {
       if (isHover) {
         removeHoverState();
       } else {
         applyHoverState();
       }
       isHover = !isHover;
     }, 2000);
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
        '시티보이': 'cityboyCheckbox',
        '스포티' : 'sportyCheckbox',
        '레트로' : 'retroCheckbox'
      };

      var checkboxId = checkboxes[tag];
      var buttonClass = "FilterModalButton" + tag;
      var buttons = document.getElementsByClassName(buttonClass);

      if (checkboxId) {
        var checkbox = document.getElementById(checkboxId);

        if (checkbox) {
          // 체크 상태 확인
          if (checkbox.checked) {
            // 체크되어 있을 때의 스타일
            if (buttons.length > 0) {
              var button = buttons[0];
              button.style.backgroundColor = "initial";
              button.style.fontWeight = "normal";
              button.style.color = "#A5A5A5";
            }
          } else {
            // 체크되어 있지 않을 때의 스타일 (기본 스타일)
            if (buttons.length > 0) {
              var button = buttons[0];
              button.style.backgroundColor = "var(--jw-light-blue2)";
              button.style.fontWeight = "bold";
              button.style.color = "var(--jw-blue3)";
            }
          }

          // 체크 상태 토글
          checkbox.checked = !checkbox.checked;
        }
      }

      // 검색 시작
      document.getElementById("applyFilter").click();
  }

  // 버튼을 클릭하면 페이지 상단으로 스크롤하는 함수
  function scrollToTop() {
      window.scrollTo(0, 0); // 화면을 즉시 상단으로 스크롤합니다.
  }

  window.onscroll = function() {
	  scrollFunction();
	};

	function scrollFunction() {
	  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
		  document.getElementById("up-button").style.display = "flex";
	  } else {
		  document.getElementById("up-button").style.display = "none";
	  }
	}