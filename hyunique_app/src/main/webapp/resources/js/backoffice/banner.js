let bannerFile = '';

$('#banner-img').change(event => {
	bannerFile = event.target.files[0];
});

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function(e) {
      $('#preview').attr("src", e.target.result);
    };
    reader.readAsDataURL(input.files[0]);
  } else {
    $('#preview').attr("src", "");
  }
}

function addBanner() {
	const formData = new FormData();
	formData.append("bannerName", $('#banner-name').val());
	formData.append("banner", bannerFile);
	
	fetch('/backoffice/banner', {
        method: 'POST',
        body: formData
    }).then((response) => {
    	location.reload();
    });
}

function deleteBanner(displayOrder) {
	$.ajax({
		url: '/backoffice/banner/delete',
		type: 'POST',
		data: {
			displayOrder
		},
		success: function(response) {
			location.reload()
		},
		error: function(error) {
			
		}
	});
}

function upBanner(displayOrder) {
	$.ajax({
		url: '/backoffice/banner/up',
		type: 'POST',
		data: {
			displayOrder
		},
		success: function(response) {
			location.reload()
		},
		error: function(error) {
			
		}
	});
}

function downBanner(displayOrder) {
	$.ajax({
		url: '/backoffice/banner/down',
		type: 'POST',
		data: {
			displayOrder
		},
		success: function(response) {
			location.reload()
		},
		error: function(error) {
			
		}
	});
}