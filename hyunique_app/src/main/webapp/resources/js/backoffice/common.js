let paths = location.pathname.split('/');
const pathLi = $(`#${paths[paths.length - 1]}`).addClass('present-path-li');
pathLi.css('background-color', 'white');
pathLi.css('color', 'black');

function signoutAdmin() {
	ajax({
		url: '/backoffice/logout',
		type: "POST",
	    success: function(response) {
	    	console.log(response);
	    },
	    error: function(error) {  
	    	console.log(error);
	    }
	});
}