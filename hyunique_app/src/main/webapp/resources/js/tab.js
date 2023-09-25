document.addEventListener("DOMContentLoaded", function() {
    const tabButtons = document.querySelectorAll(".tab-button");
    const tabContents = document.querySelectorAll(".tab-content");

    tabButtons.forEach(button => {
        button.addEventListener("click", () => {
            // 기존 탭 내용을 숨깁니다.
            tabContents.forEach(tab => {
                tab.style.display = "none";
            });

            // 선택한 탭의 내용을 표시합니다.
            const target = document.querySelector(button.dataset.tabTarget);
            target.style.display = "block";

            // 모든 탭 버튼 스타일 초기화
            tabButtons.forEach(tab => {
                tab.style.fontWeight = "normal";
                tab.style.backgroundColor = "transparent";
            });

            // 선택한 탭 버튼 스타일 변경
            button.style.fontWeight = "bold";
            
            // 다른 탭 버튼의 배경 색상 변경
            const otherTab = Array.from(tabButtons).find(tab => tab !== button);
            if (otherTab) {
                otherTab.style.backgroundColor = "#f2f2f2";
            }
        });
    });
});

var waveBtn = (function () {
    'use strict';
    var btn = document.querySelectorAll('.wave'),
        indicator = document.querySelector('.indicator');
    
    for(var i = 0; i < btn.length; i++) {
        btn[i].onmousedown = function (e) {
            var newRound = document.createElement('div'), x, y;
            const tabWidth = this.offsetWidth;
            const newPosition = this.dataset.num * tabWidth;
            newRound.className = 'cercle';
            this.appendChild(newRound);

            x = e.pageX - this.offsetLeft;
            y = e.pageY - this.offsetTop;

            newRound.style.left = x + "px";
            newRound.style.top = y + "px";
            newRound.className += " anim";

            indicator.style.marginLeft = newPosition + 'px'; 

            setTimeout(function() {
                newRound.remove();
            }, 1200);
        };
    }
}());

window.addEventListener('resize', function() {
  adjustTabAndIndicatorWidth();
});

adjustTabAndIndicatorWidth();

function adjustTabAndIndicatorWidth() {
  const bodyWidth = document.body.offsetWidth;
  const halfBodyWidth = bodyWidth / 2 + "px";
  
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => {
    tab.style.width = halfBodyWidth;
  });

  const indicator = document.querySelector('.indicator');
  indicator.style.width = halfBodyWidth;
}