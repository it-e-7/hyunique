let paths = location.pathname.split('/');
const pathLi = $(`#${paths[paths.length - 1]}`).addClass('present-path-li');
pathLi.css('background-color', 'white');
pathLi.css('color', 'black');