 $(document).ready(function() {
    $("#btn-user-gpt-input").click(function() {
      let user_input = $("#user-gpt-input").val();
      $.ajax({
        url: "/gpt/chat", // 이 부분은 실제 Controller의 URL에 맞게 변경
        type: "GET",
        data: {
          message: user_input
        },
        success: function(data) {
          $("#response-content").text(data.response); // 결과를 표시
        },
        error: function(error) {
          console.log(error);
        }
      });
    });
  });