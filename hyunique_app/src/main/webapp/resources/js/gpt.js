const isChrome = /chrome/i.test(navigator.userAgent);
const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent) && !isChrome;
let speech;
let isAmplified = false;
let siriWave;

let chatForm = document.querySelector('.main-gpt-wrapper');

let words = ['AI가 열심히 옷을 고르고 있어요', '잠시만 기다려 주세요 :)'];
let i = 0, offset = 0, len = words.length;
let forwards = true, skip_count = 0, skip_delay = 15, speed = 70;
let animationInterval;

let openProduct = function(productId) {
	window.open(`https://www.hy-unique.com/product/${productId}`);
}

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

if (!isSafari) {
	  speech = new webkitSpeechRecognition;
			siriWave = new SiriWave({
		    container: document.getElementById('voice-control'),
		    width: 360,
		    height: 60,
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
}else{console.log("사파리 로그인")}


$(document).ready(function () {
	  $(".chat-section-wrapper").append('<div class="chat-gpt-wrapper" data-aos="zoom-in-up"><div class="gpt-profile-wrapper"><div id="gpt-profile-img-wrapper"><img id="gpt-profile-img" src="/resources/img/ic-ai-chatbot.jpg"/></div><div id="gpt-name">AI휴니</div></div><div class="chat-by-gpt speech-bubble-gpt"><p><span>안녕하세요!!<br><br>스타일링부터 구매까지 도와드릴 AI휴니예요.<br><br><b>하단의 버튼을 눌러 코디가 필요한 상황이나 장소를 알려주세요!</b></span></p></div><div>');
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
          
          let imgWrapper = $('<div class="chat-gpt-wrapper" data-aos="zoom-in-up"><p><span id="dall-e-img"></span></p></div>');
          imgWrapper.find('span').append(imgElement);
          
          $(".chat-section-wrapper").append(imgWrapper);
          $(".loader-wrapper").addClass("hidden");
          if (!isSafari) {
        	  $(".voice-control-wrapper").removeClass("hidden");
          }
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
      data.forEach(function(product) {
          $(".chat-section-wrapper").append(`
              <div class='gpt-product-list'>
              <li>
              <div id="product-only-wrapper" onclick="openProduct('${product.productId}')">
                  <img src=${product.productImg}>
                  <div id="product-info-wrapper">
                    <strong>${product.productBrand}</strong>
                    <p class='product-item-name'>${product.productName}</p>
                    <p class='product-item-price'>${product.productPrice.toLocaleString('ko-KR')}원</p>
                  </div>
              </div>
              <div id="bag-check">
                  <input type="checkbox" class="bag-check-hidden-btn"name="bag-check" value="12322" id="12322"><label for="12322"><img src="/resources/img/ic-bag-non-check.png" id="bag-img"/></label>
              </div>
              </li>
    <div>
      `)
      });
            //결제 버튼 만들기
            $(".chat-section-wrapper").append(
    	    		`<div class='purchase-area-wrapper'>
    	    			<div class="purchase-cancel-btn">
    	    				다음에 구매할게요
    	    			</div>
    				<button class="purchase-accept-btn" onclick="paymentAddressCheck()">
    	    				눌러서 구매 완료
    	    			</div>
    	    		</button>`
    	    )
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
    if (!isSafari) {
    	speech.stop();
		siriWave.setAmplitude(0.5);
		siriWave.setSpeed(0.1);
		isAmplified = false;
    }

   let inputtext = $(".user-gpt-input").val();
    if(inputtext){
		let user_input = $(".user-gpt-input").val();
		    $(".chat-section-wrapper").append('<div class="chat-user-wrapper" data-aos="zoom-in-up"><div class="chat-by-user speech-bubble-user"><p><span>'+ user_input + '</span></p></div></div>');
		    scrollToBottom();
	        if (!isSafari) {
	        	$(".voice-control-wrapper").addClass("hidden");
			    $(".loader-wrapper").removeClass("hidden");
	        }
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
			    	  $(".chat-section-wrapper").append('<div class="chat-gpt-wrapper" data-aos="zoom-in-up"><div class="gpt-profile-wrapper"><div id="gpt-profile-img-wrapper"><img id="gpt-profile-img" src="/resources/img/ic-ai-chatbot.jpg"/></div><div id="gpt-name">AI휴니</div></div><div class="chat-by-gpt speech-bubble-gpt"><p><span>다음과 같은 상품으로 스타일링을 도와드릴게요</span></p></div><div>');
		    	  }
		    	  scrollToBottom();
		    	  setTimeout(() => {
			    	  $(".chat-section-wrapper").append('<div class="chat-gpt-wrapper" data-aos="zoom-in-up"><div class="gpt-profile-wrapper"><div id="gpt-profile-img-wrapper"><img id="gpt-profile-img" src="/resources/img/ic-ai-chatbot.jpg"/></div><div id="gpt-name">AI휴니</div></div><div class="chat-by-gpt speech-bubble-gpt"><p><span>' + modifiedResponse + '</span></p></div><div>');
			    	  scrollToBottom();
		    	  }, 1000);
		    	  $(".loader-wrapper").addClass("hidden");
		          if (!isSafari) {
		        	  $(".voice-control-wrapper").removeClass("hidden");
		          }
		    	  $("#response-content").text(modifiedResponse);
		    	  if(data.response.charAt(0) !== '*'){
			    	  setTimeout(() => {
				    	  $(".chat-section-wrapper").append('<div class="chat-gpt-wrapper" data-aos="zoom-in-up"><div class="gpt-profile-wrapper"><div id="gpt-profile-img-wrapper"><img id="gpt-profile-img" src="/resources/img/ic-ai-chatbot.jpg"/></div><div id="gpt-name">AI휴니</div></div><div class="chat-by-gpt speech-bubble-gpt"><p><span>휴니가 스타일링 예시를 그리고 있어요...</span></p></div><div>');
						  scrollToBottom();
			    	  }, 2000);
					    scrollToBottom();
		    	  }
		    	  if(data.response.charAt(0) !== '*'){
		    	    gptImgRequest("A full-body portrait of a people wearing"," The people is standing on a white background in soft studio lighting.shot on EOS 5d mark2. person is looking at the camera.");
		    	    gptProductRequest();
				    scrollToBottom();
		    	  }
		    	},
		      error: function(error) {
		        console.log(error);
		      }
		    });
		    document.getElementById("resultList").value = "";
    }
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

if (!isSafari) {
	if(!("webkitSpeechRecognition") in window){
	    toastr.error('크롬 브라우저로 접속해주세요.');
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
}

let restartAnimation = function() {
	  clearInterval(animationInterval); 
	  i = 0; 
	  offset = 0;
	  forwards = true;
	  skip_count = 0;
	  wordflick(); // 애니메이션 다시 시작
};
