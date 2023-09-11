document.addEventListener("DOMContentLoaded", function () {
    let passOneQR = 0;

    var video = document.createElement("video");
    var canvasElement = document.getElementById("canvas");
    var canvas = canvasElement.getContext("2d", { willReadFrequently: true });
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

    function drawBorder() {
        canvas.strokeStyle = "#32517F";
        canvas.lineWidth = 5;
        canvas.strokeRect(0, 0, canvasElement.width, canvasElement.height);
    }

    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } }).then(function (stream) {
        video.srcObject = stream;
        video.setAttribute("playsinline", true);
        video.play();
        requestAnimationFrame(tick);
    });

    function tick() {
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
            loadingMessage.hidden = true;
            canvasElement.hidden = false;
            outputContainer.hidden = false;
            const minDimension = Math.min(video.videoWidth, video.videoHeight);
            canvasElement.height = minDimension;
            canvasElement.width = minDimension;
            canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);

            // 테두리 그리기 함수 호출
            drawBorder();

            var imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
            var code = jsQR(imageData.data, imageData.width, imageData.height, {
                inversionAttempts: "dontInvert",
            });

            if (code) {
                drawLine(code.location.topLeftCorner, code.location.topRightCorner, "#FF0000");
                drawLine(code.location.topRightCorner, code.location.bottomRightCorner, "#FF0000");
                drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, "#FF0000");
                drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, "#FF0000");
                outputMessage.hidden = true;
                outputData.parentElement.hidden = false;

                if (passOneQR == 0 && inValidURL(code.data)) {
                    //let newWindow = window.open(code.data, '_blank');
                    console.log(code.data);
                    passOneQR = 1;
                    //history.back();
                }
            } else {
                outputMessage.hidden = false;
                outputData.parentElement.hidden = true;
            }
        }
        requestAnimationFrame(tick);
    }

    // URL 로직 검사 함수
    function inValidURL(url) {
        let pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
        if (pattern.test(url)) {
            return true;
        } else {
            return false;
        }
    }
});
