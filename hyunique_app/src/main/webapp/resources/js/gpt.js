//채팅창 form(박스), submit 이벤트 감지를 위해 변수 선언
let chatForm = document.querySelector('.main-gpt-wrapper');
const speech = new webkitSpeechRecognition;

var siriWave = new SiriWave({
    container: document.getElementById('voice-control'),
    width: 300,
    height: 150,
    style: "ios9",
    autostart:true,
    amplitude:0.1,
    curveDefinition :[
    	  { color: "255,255,255", supportLine: true },
    	  { color: "106, 121, 255" },
    	  { color: "147, 216, 255" },
    	  { color: "255, 106, 222" },
    	]
  });

function gptRequest() {
	let user_input = $(".user-gpt-input").val();
    prepareScroll()
    $(".chat-section-wrapper").append('<div class="chat-user-wrapper" data-aos="zoom-in-up"><div class="chat-by-user speech-bubble-user"><p>User: <span>'+ user_input + '</span></p></div></div>');
    
    $.ajax({
      url: "/gpt/chat",
      type: "GET",
      data: {
        message: user_input
      },
      success: function(data) {
		  //gpt응답
		  $(".chat-section-wrapper").append('<div class="chat-gpt-wrapper" data-aos="zoom-in-up"><div class="chat-by-gpt speech-bubble-gpt"><p>Response: <span>' + data.response + '</span></p></div><div>');

		  //유저 응답
		  $("#response-content").text(data.response);
      },
      error: function(error) {
        console.log(error);
      }
    });
    document.getElementById("resultList").value = "";

};

let isAmplified = false;
// 준비 함수, 약간의 시간을 두어 scroll 함수를 호출하기
function prepareScroll() {
  window.setTimeout(scrollUl, 50);
}

// scroll 함수
function scrollUl() {
  let chatUl = document.querySelector('.chat-section-wrapper');
  chatUl.scrollTop = chatUl.scrollHeight; // 스크롤의 위치를 최하단으로
}



if(!("webkitSpeechRecognition") in window){
    alert("Connect in Chrome Browser");
}else{

    let isAmplified = false; // 새로운 변수 추가

    document.getElementById("voice-control").addEventListener("click",()=>{
        if (!isAmplified) {
            speech.start();
            siriWave.setAmplitude(1.8);
            siriWave.setSpeed(0.4);
            isAmplified = true; // 상태 변경
        } else {
            speech.stop();
            siriWave.setAmplitude(0.2);
            siriWave.setSpeed(0.2);
            isAmplified = false; // 상태 변경
        }
    });
    speech.addEventListener("result", (event)=>{
        console.log(event);
        const { transcript } = event["results"][0][0];
        console.log(transcript);
        resultListView(transcript);
    });

    function resultListView(transcript){
        document.getElementById("resultList").value = transcript;
        gptRequest();
        document.getElementById("resultList").value = "";

    }
}

