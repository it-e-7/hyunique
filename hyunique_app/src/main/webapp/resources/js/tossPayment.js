/**
 * 토스 페이먼츠 결제 함수
 */
function paymentToss(apiKey,totalPrice,userId,url){
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
    }).then((res) =>{

    }).catch(function (error) {
            if (error.code === 'USER_CANCEL') {
                // 결제 고객이 결제창을 닫았을 때 에러 처리
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
  const imageSource = productElement.querySelector('img[src="/resources/img/ic-bag-check.png"]').getAttribute('src');
  if (imageSource == '/resources/img/ic-bag-non-check.png') {
    const productWrapper = productElement.querySelector('#product-only-wrapper');
    productWrapper.getAttribute("onclick");
    var regex = /'([^']+)'/;
    orderList.push(productWrapper.getAttribute("onclick").match(regex)[1]);
  }
});

//구매리스트 컨트롤러로 전송
$.ajax({
        url: `/payment/confirm`,
        type: 'POST',
        contentType : 'application/json',
        data: JSON.stringify(orderList),
        success: function (response) {
            //원래는 여기서 결제 내역을 우리 DB에 저장해야 하나, 세션에 저장해서 넘기도록 하겠습니다
            sessionStorage.setItem('orderList', JSON.stringify(response.productList));
            console.log("JSON.stringify(response.productList)"+JSON.stringify(response.productList));
            paymentToss(response.apiKey,response.totalPrice,response.userId,response.url);
        },
        error: function (response) {
            console.log('결제 실패. 다시 시도해주세요');
        }
    });
}