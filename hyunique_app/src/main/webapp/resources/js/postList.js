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
