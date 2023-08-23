function show () {
  document.querySelector(".background").className = "background show";
}

function close () {
  document.querySelector(".background").className = "background";
}

document.querySelector("#show").addEventListener('click', show);
document.querySelector("#close").addEventListener('click', close);