document.addEventListener("DOMContentLoaded", function() {
    const tabButtons = document.querySelectorAll(".tab-button");
    const tabContents = document.querySelectorAll(".tab-content");

    tabButtons.forEach(button => {
        button.addEventListener("click", () => {
            const target = document.querySelector(button.dataset.tabTarget);

            tabContents.forEach(tab => {
                tab.style.display = "none";
            });

            target.style.display = "block";
        });
    });
});


//... 이전 코드
var waveBtn = (function () {
    'use strict';
    var btn = document.querySelectorAll('.wave'),
        indicator = document.querySelector('.indicator');
    
    for(var i = 0; i < btn.length; i++) {
        btn[i].onmousedown = function (e) {
            var newRound = document.createElement('div'), x, y;
            const tabWidth = this.offsetWidth; // 현재 탭의 넓이를 얻습니다.
            const newPosition = this.dataset.num * tabWidth; // 새 위치를 계산합니다.
            newRound.className = 'cercle';
            this.appendChild(newRound);

            x = e.pageX - this.offsetLeft;
            y = e.pageY - this.offsetTop;

            newRound.style.left = x + "px";
            newRound.style.top = y + "px";
            newRound.className += " anim";

            // 여기서 수정: 데이터의 num에 따라 indicator 마진 설정
            indicator.style.marginLeft = newPosition + 'px'; // 새로운 마진으로 설정

            setTimeout(function() {
                newRound.remove();
            }, 1200);
        };
    }
}());

//새로운 코드: 화면 크기가 변경될 때마다 실행
window.addEventListener('resize', function() {
  adjustTabAndIndicatorWidth();
});

// 처음 로딩될 때 한 번 실행
adjustTabAndIndicatorWidth();

// tab과 indicator의 크기를 조정하는 함수
function adjustTabAndIndicatorWidth() {
  const bodyWidth = document.body.offsetWidth;
  const halfBodyWidth = bodyWidth / 2 + "px";
  
  // 모든 .tab 요소에 대하여
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => {
    tab.style.width = halfBodyWidth;
  });

  // .indicator 요소에 대하여
  const indicator = document.querySelector('.indicator');
  indicator.style.width = halfBodyWidth;
}