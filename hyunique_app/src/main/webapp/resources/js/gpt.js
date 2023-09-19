//채팅창 form(박스), submit 이벤트 감지를 위해 변수 선언
let chatForm = document.querySelector('.main-gpt-wrapper');
const speech = new webkitSpeechRecognition;

const siriWave = new SiriWave({
    container: document.getElementById('voice-control'),
    width: 600,
    height: 100,
    style: "ios9",
    autostart:true,
    amplitude:0.5,
	speed:0.1,
	curveDefinition :[
    	  { color: "255,255,255", supportLine: true },
    	  { color: "106, 121, 255" },
    	  { color: "147, 216, 255" },
    	  { color: "255, 106, 222" },
    	]
});

$(document).ready(function () {
  wordflick();
  $("#12322").change(function() {
	  if ($(this).prop("checked")) {
      $("#bag-img").attr("src", "/resources/img/ic-bag-check.png");
    } else {
      $("#bag-img").attr("src", "/resources/img/ic-bag-noncheck.png");
    }
  });
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
    	  let imgElement = $('<img>');
          imgElement.attr('src', data);
          imgElement.on('load', function() {
            scrollToBottom();  // 이미지 로딩 후 스크롤
          });
          
          let imgWrapper = $('<div class="chat-gpt-wrapper" data-aos="zoom-in-up"><div class="chat-by-gpt speech-bubble-gpt"><p><span></span></p></div></div>');
          imgWrapper.find('span').append(imgElement);
          
          $(".chat-section-wrapper").append(imgWrapper);
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

function gptProductRequest (){
 $.ajax({
      url: "/gpt/product",
      type: "GET",
      data: {
      //데이터를 보내지 않습니다
      },
      success: function(data) {
      console.log("******gptProductRequest******"+data);
      data.forEach(function(product) {
          console.log(product); // VO 객체 전체를 출력
          console.log(product.productName);
          console.log(product.productPrice);
          console.log(product.productBrand);
      });
//    	  let imgElement = $('<img>');
//          imgElement.attr('src', data);
//          imgElement.on('load', function() {
//            scrollToBottom();  // 이미지 로딩 후 스크롤
//          });
//
            //결제 버튼 만들기
          let paymentButton = $('<button class="payment-button">눌러서 결제하기</button>');
           $(".chat-section-wrapper").append(paymentButton);
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
   let inputtext = $(".user-gpt-input").val();
    if(inputtext){
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
		    	  let modifiedResponse = data.response;
		    	  if (modifiedResponse.charAt(0) === '*') {
		    	    modifiedResponse = modifiedResponse.substring(1);
		    	    modifiedResponse = modifiedResponse.substring(-1);

		    	  }
		    	  if(data.response.charAt(0) !== '*'){
			    	  $(".chat-section-wrapper").append('<div class="chat-gpt-wrapper" data-aos="zoom-in-up"><div class="chat-by-gpt speech-bubble-gpt"><p><span>다음과 같은 상품으로 스타일링을 도와드릴게요</span></p></div><div>');
		    	  }
		    	  scrollToBottom();
		    	  setTimeout(() => {
			    	  $(".chat-section-wrapper").append('<div class="chat-gpt-wrapper" data-aos="zoom-in-up"><div class="chat-by-gpt speech-bubble-gpt"><p><span>' + modifiedResponse + '</span></p></div><div>');
			    	  scrollToBottom();
		    	  }, 1000);
		    	  $(".loader-wrapper").addClass("hidden");
		    	  $(".voice-control-wrapper").removeClass("hidden");
		    	  $("#response-content").text(modifiedResponse);
		    	  console.log(data);
		    	  if(data.response.charAt(0) !== '*'){
			    	  setTimeout(() => {
				    	  $(".chat-section-wrapper").append('<div class="chat-gpt-wrapper" data-aos="zoom-in-up"><div class="chat-by-gpt speech-bubble-gpt"><p><span>추천된 스타일링의 이미지를 그리고있어요 :)</span></p></div><div>');
			    	  	}, 2000);
					    scrollToBottom();
		    	  }
		    	  if(data.response.charAt(0) !== '*'){
		    	    gptImgRequest("A full-body portrait of a people wearing"," The people is standing on a white background in soft studio lighting.shot on EOS 5d mark2. person is looking at the camera.");

		    	    gptProductRequest();
              
		    	    $(".chat-section-wrapper").append(`
			    			  <div class='gpt-product-list'>
			    			  <li>
			    			  <div id="product-only-wrapper" onclick='moveToProduct(12322)'>
				    			  <img src='https://oreo-hyunique.s3.ap-northeast-2.amazonaws.com/profile/user_basic_profile.jpg'/>
				    			  <div>
				    			  	<strong>브랜드영역</strong>
				    			  	<p class='product-item-name'>설향딸기빵</p>
				    			  	<p class='product-item-price'>3,000원}
				    			  	</p>
				    			  </div>
			    			  </div>
				    		  <div id="bag-check">
				    			  <input type="checkbox" class="bag-check-hidden-btn"name="bag-check" value="12322" id="12322"><label for="12322"><img src="/resources/img/ic-bag-non-check.png" id="bag-img"/></label>
			    			  </div>
			    			  </li>
			    			  <div>
	    			  `)
  		    	    $(".chat-section-wrapper").append(
  		    	    		`<div class='purchase-area-wrapper'>
  		    	    			<div class="purchase-cancel-btn">
  		    	    				다음에 구매할게요
  		    	    			</div>
	    	    				<div class="purchase-accept-btn">
  		    	    				눌러서 구매 완료
  		    	    			</div>
  		    	    		</div>`
  		    	    )

		    	  }
		    	},
		      error: function(error) {
		        console.log(error);
		      }
		    });
		    document.getElementById("resultList").value = "";
    }
};
//`
//<div class='product-list">
//<li onclick='moveToProduct('${product.productId}')'>
//<img src='${product.productImg}'/>
//<div>
//	<strong>${product.productBrand}</strong>
//	<p class='product-item-name'>${product.productName}</p>
//	<p class='product-item-price'>${product.productPrice.toLocaleString('ko-KR')}
//	</p>
//</div>
//</li>
//<div>
//`

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
            siriWave.setAmplitude(2.5);
            siriWave.setSpeed(0.1);
            isAmplified = true;
        } else {
            speech.stop();
            siriWave.setAmplitude(0.5);
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
