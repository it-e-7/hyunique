document.addEventListener("DOMContentLoaded", function() {

        let passOneQR = 0;

		var video = document.createElement("video");
		var canvasElement = document.getElementById("canvas");
		var canvas = canvasElement.getContext("2d");
		var loadingMessage = document.getElementById("loadingMessage");
		var outputContainer = document.getElementById("output");
		var outputMessage = document.getElementById("outputMessage");
		var outputData = document.getElementById("outputData");

		function drawLine(begin, end, color) {
			canvas.beginPath();
			canvas.moveTo(begin.x, begin.y);
			canvas.lineTo(end.x, end.y);
			canvas.lineWidth = 4;
			canvas.strokeStyle = color;
			canvas.stroke();
                }
		navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } }).then(function(stream) {
      		        video.srcObject = stream;
      		        video.setAttribute("playsinline", true);      // iOS 사용시 전체 화면을 사용하지 않음을 전달
         		video.play();
      		        requestAnimationFrame(tick);
		});
		function tick() {
			loadingMessage.innerText = "⌛ 스캔 기능을 활성화 중입니다."
			if(video.readyState === video.HAVE_ENOUGH_DATA) {
        		      loadingMessage.hidden = true;
        		      canvasElement.hidden = false;
        		      outputContainer.hidden = false;
        		      canvasElement.height = video.videoHeight;
        	 	      canvasElement.width = video.videoWidth;
        		      canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
        		      var imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
        		      var code = jsQR(imageData.data, imageData.width, imageData.height, {
                                    inversionAttempts : "dontInvert",
        		      });
                              if(code) { //QR코드 인식에 성공한 경우
                                    drawLine(code.location.topLeftCorner, code.location.topRightCorner, "#FF0000");
                                    drawLine(code.location.topRightCorner, code.location.bottomRightCorner, "#FF0000");
                                    drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, "#FF0000");
                                    drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, "#FF0000");
                                    outputMessage.hidden = true;
                                    outputData.parentElement.hidden = false;
                                    //코드에 있는 데이터를 출력하지만 이내 이동으로 바뀐다
                                    if (passOneQR == 0){
                                    let newWindow = window.open(code.data, '_blank');
                                    passOneQR = 1;
                                    history.back();
                                    }
                              }
                              // QR코드 인식에 실패한 경우
                              else {
                                    outputMessage.hidden = false;
                                    outputData.parentElement.hidden = true;
                              }
                      }
      		      requestAnimationFrame(tick);
		}

		//URL 로직검사
	});