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