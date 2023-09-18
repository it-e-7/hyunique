//채팅창 form(박스), submit 이벤트 감지를 위해 변수 선언
let chatForm = document.querySelector('.main-gpt-wrapper');
const speech = new webkitSpeechRecognition;

const siriWave = new SiriWave({
    container: document.getElementById('voice-control'),
    width: 600,
    height: 100,
    style: "ios9",
    autostart:true,
    amplitude:0.3,
    curveDefinition :[
    	  { color: "255,255,255", supportLine: true },
    	  { color: "106, 121, 255" },
    	  { color: "147, 216, 255" },
    	  { color: "255, 106, 222" },
    	]
});

$(document).ready(function () {
  wordflick();
});
function scrollToBottom() {
	const lastMessage = document.querySelector('.chat-section-wrapper > :last-child');
	lastMessage.scrollIntoView();
}
function gptImgRequest(messageFront, messageBack){
 $.ajax({
      url: "/gpt/img",
      type: "GET",
      data: {
        message1: messageFront,
        message2: messageBack
      },
      success: function(data) {
		  $(".chat-section-wrapper").append('<div class="chat-gpt-wrapper" data-aos="zoom-in-up"><div class="chat-by-gpt speech-bubble-gpt"><p><span><img src='+ data +'></span></p></div><div>');
		  scrollToBottom();
		  $(".loader-wrapper").addClass("hidden");
		  $(".voice-control-wrapper").removeClass("hidden");
      },
      error: function(error) {
    	  console.log(error);

          if (error.response) {
            console.log("Avatar error status: ", error.response.status);
            console.log("Avatar error data: ", error.response.data);
          } else {
            console.log("Avatar error: response is undefined");
          }

      }
    });
}
function gptRequest() {
	let user_input = $(".user-gpt-input").val();
    $(".chat-section-wrapper").append('<div class="chat-user-wrapper" data-aos="zoom-in-up"><div class="chat-by-user speech-bubble-user"><p><span>'+ user_input + '</span></p></div></div>');
    scrollToBottom();
    $(".voice-control-wrapper").addClass("hidden");
    $(".loader-wrapper").removeClass("hidden");
    restartAnimation();
    
    $.ajax({
      url: "/gpt/chat",
      type: "GET",
      data: {
        message: user_input
      },
      success: function(data) {
		  //gpt응답
		  $(".chat-section-wrapper").append('<div class="chat-gpt-wrapper" data-aos="zoom-in-up"><div class="chat-by-gpt speech-bubble-gpt"><p><span>' + data.response + '</span></p></div><div>');
		  scrollToBottom();
		  $(".loader-wrapper").addClass("hidden");
		  $(".voice-control-wrapper").removeClass("hidden");
		  //유저 응답
		  $("#response-content").text(data.response);
		  console.log(data);
		  //하루 50번 요청 제한이 걸림
		  if(data.response.charAt(0) !== '*'){
			  gptImgRequest("A full-body portrait of a people wearing"," The people is standing on a white background in soft studio lighting.shot on EOS 5d mark2. person is looking at the camera.");
		  }
      },
      error: function(error) {
        console.log(error);
      }
    });
    document.getElementById("resultList").value = "";

};

//gpt 엔터 이벤트
$(".user-gpt-input").on('keydown', function(e){
    if(e.keyCode == 13) {
        let inputtext = $(".user-gpt-input").val();
        if(inputtext){
        	gptRequest();
        }
    }
});
let isAmplified = false;


if(!("webkitSpeechRecognition") in window){
    alert("Connect in Chrome Browser");
}else{

    let isAmplified = false;

    document.getElementById("voice-control").addEventListener("click",()=>{
        if (!isAmplified) {
            speech.start();
            siriWave.setAmplitude(1.9);
            siriWave.setSpeed(0.1);
            isAmplified = true;
        } else {
            speech.stop();
            siriWave.setAmplitude(0.3);
            siriWave.setSpeed(0.1);
            isAmplified = false;
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
        speech.stop();
        isAmplified = false;
        siriWave.setAmplitude(0.2);
        siriWave.setSpeed(0.2);
        document.getElementById("resultList").value = "";

    }
}

let words = ['AI가 열심히 옷을 고르고 있어요', '잠시만 기다려 주세요 :)'];
let i = 0, offset = 0, len = words.length;
let forwards = true, skip_count = 0, skip_delay = 15, speed = 70;
let animationInterval;

let wordflick = function () {
	animationInterval = setInterval(function () {
		if (forwards) {
			if (offset >= words[i].length) {
				++skip_count;
				if (skip_count == skip_delay) {
					forwards = false;
					skip_count = 0;
			    }
			  }
			}
		else {
		  if (offset == 0) {
		    forwards = true;
		    i++;
		    offset = 0;
		    if (i >= len) {
		      i = 0;
		    }
		  }
		}
		part = words[i].substr(0, offset);
		if (skip_count == 0) {
		  if (forwards) {
		    offset++;
		  }
		  else {
		    offset--;
		  }
		}
		$('.loader-text').text(part);
	},speed);
};

let restartAnimation = function() {
	  clearInterval(animationInterval); 
	  i = 0; 
	  offset = 0;
	  forwards = true;
	  skip_count = 0;
	  wordflick(); // 애니메이션 다시 시작
};
