//채팅창 form(박스), submit 이벤트 감지를 위해 변수 선언
let chatForm = document.querySelector('.main-gpt-wrapper');

$(document).ready(function() {
  $(".btn-gpt-request").click(function() {
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
  });
});


// 준비 함수, 약간의 시간을 두어 scroll 함수를 호출하기
function prepareScroll() {
  window.setTimeout(scrollUl, 50);
}

// scroll 함수
function scrollUl() {
  // 채팅창 form 안의 ul 요소, (ul 요소 안에 채팅 내용들이 li 요소로 입력된다.)
  let chatUl = document.querySelector('.chat-section-wrapper');
  chatUl.scrollTop = chatUl.scrollHeight; // 스크롤의 위치를 최하단으로
}

