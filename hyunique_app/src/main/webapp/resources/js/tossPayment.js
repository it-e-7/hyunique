/**
 * 토스 페이먼츠 결제 함수
 */
function paymentToss(apiKey,totalPrice,userId,url,orderList){
    var tossPayments = TossPayments(apiKey); //테스트 클라이언트 키
    var successUrl = url+'/payment/success'; // 결제 성공 시 이동할 페이지
    var failUrl = url+'/payment/fail'; // 결제 실패 시 이동할 페이지
    tossPayments.requestPayment('카드', {
        amount: totalPrice,
        orderId: 2785164821,
        orderName: "원터치결제",
        customerName : 1212121,
        successUrl: successUrl, // ${결제 성공 후 redirect할 url}
        failUrl:failUrl, //  ${결제 실패한 경우 redirect할 url}
    })
    .catch(function (error) {
            console.error('오류가 발생했습니다:', error); // 오류 메시지를 콘솔에 출력합니다.
            if (error.code === 'USER_CANCEL') {
                console.log("3");
            } else if (error.code === 'INVALID_CARD_COMPANY') {
                // 유효하지 않은 카드 코드에 대한 에러 처리
            }
        });

}

//토스 결제를 하기 전에, 상품에 해당하는 정보를 가져옵시다
function paymentInformation () {

// 그리고 결제에 필요한 정보값을 다 담아서 리턴하는걸로

const productListElements = document.querySelectorAll('.gpt-product-list');

let orderList = [];
productListElements.forEach(productElement => {
   //현재는 테스트를 위하여 체크되지 않은 이미지를 전송합니다. 이후에는 수정해주세요
  let imageSource = productElement.querySelector('img[src="/resources/img/ic-bag-check.png"]')
  if (imageSource != null){
  imageSource = imageSource.getAttribute('src');
  }
  else {
  return ;
  }
  if (imageSource == '/resources/img/ic-bag-check.png') {
    const productWrapper = productElement.querySelector('#product-only-wrapper');
    productWrapper.getAttribute("onclick");
    var regex = /'([^']+)'/;
    orderList.push(productWrapper.getAttribute("onclick").match(regex)[1]);
  }
});

//구매리스트 컨트롤러로 전송
    if (orderList.length != 0){
        //주소를 입력하지 않았으면 주소를 입력하라고 알려준다.
        //현재는 주문 테이블이 존재하지 않음으로 세션에서 값을 가져옵니다.
        const addressData = localStorage.getItem('address');
        if (addressData == null){
            //도로명 주소를 입력하지 않았습니다.
            //도로명 주소를 입력해주세요 모달 띠우기
            alert ("도로명 주소를 입력해주세요!");
            $("#sample3_search").click();
        }
        else{
            $.ajax({
                    url: `/payment/confirm`,
                    type: 'POST',
                    contentType : 'application/json',
                    data: JSON.stringify(orderList),
                    success: function (response) {
                        //원래는 여기서 결제 내역을 우리 DB에 저장해야 하나, 세션에 저장해서 넘기도록 하겠습니다
                        sessionStorage.setItem('orderList', JSON.stringify(response.productList));
                        paymentToss(response.apiKey,response.totalPrice,response.userId,response.url,JSON.stringify(orderList));
                    },
                    error: function (response) {
                        console.error('결제 실패. 다시 시도해주세요');
                    }
            });
        }
    }
    else {
    alert("상품을 선택해주세요");
    }
}