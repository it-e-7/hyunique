//채팅창 form(박스), submit 이벤트 감지를 위해 변수 선언
let chatForm = document.querySelector('.main-gpt-wrapper');
const speech = new webkitSpeechRecognition;

const siriWave = new SiriWave({
    container: document.getElementById('voice-control'),
    width: 600,
    height: 100,
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
function scrollToBottom() {
	const lastMessage = document.querySelector('.chat-section-wrapper > :last-child');
	lastMessage.scrollIntoView();
}

function gptRequest() {
	let user_input = $(".user-gpt-input").val();
    $(".chat-section-wrapper").append('<div class="chat-user-wrapper" data-aos="zoom-in-up"><div class="chat-by-user speech-bubble-user"><p><span>'+ user_input + '</span></p></div></div>');
    scrollToBottom();
    $(".voice-control-wrapper").addClass("hidden");
    $(".loader-wrapper").removeClass("hidden");
    
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
      },
      error: function(error) {
        console.log(error);
      }
    });
    document.getElementById("resultList").value = "";

};

let isAmplified = false;


if(!("webkitSpeechRecognition") in window){
    alert("Connect in Chrome Browser");
}else{

    let isAmplified = false;

    document.getElementById("voice-control").addEventListener("click",()=>{
        if (!isAmplified) {
            speech.start();
            siriWave.setAmplitude(1.8);
            siriWave.setSpeed(0.4);
            isAmplified = true;
        } else {
            speech.stop();
            siriWave.setAmplitude(0.2);
            siriWave.setSpeed(0.2);
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
        document.getElementById("resultList").value = "";

    }
}

