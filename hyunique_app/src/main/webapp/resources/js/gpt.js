$(document).ready(function() {
  $(".btn-gpt-request").click(function() {
    let user_input = $(".user-gpt-input").val();
    
    $(".chat-section-wrapper").append('<div class="chat-user-wrapper"><div class="chat-by-user speech-bubble-user"><p>User: <span>'+ user_input + '</span></p></div></div>');
    
    $.ajax({
      url: "/gpt/chat",
      type: "GET",
      data: {
        message: user_input
      },
      success: function(data) {
		  //gpt응답
		  $(".chat-section-wrapper").append('<div class="chat-gpt-wrapper"><div class="chat-by-gpt speech-bubble-gpt"><p>Response: <span>' + data.response + '</span></p></div><div>');

		  //유저 응답
		  $("#response-content").text(data.response);
      },
      error: function(error) {
        console.log(error);
      }
    });
  });
});
