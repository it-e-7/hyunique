/**
 * 토스 페이먼츠 결제 함수
 */
function paymentToss(apiKey,totalPrice,userId,url){

    var tossPayments = TossPayments(apiKey); //테스트 클라이언트 키
    var successUrl = url+'/payment/confirm'; // 결제 성공 시 이동할 페이지
    var failUrl = url+'/payment/confirm';; // 결제 실패 시 이동할 페이지
    tossPayments.requestPayment('카드', {
/*        amount: data.amount,
        orderId:  data.orderId,
        orderName: data.orderName,
        customerName: data.customerName,*/
        amount: totalPrice,
        orderId: 1010101,
        orderName: "원터치결제",
        customerName : 1212121,
    }).then((res) =>{
        paymentSuccess(memberId);


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

// 모든 gpt product list 요소를 선택합니다.
const productListElements = document.querySelectorAll('.gpt-product-list');

let orderList = [];
// 각 요소를 순회하면서 이미지 소스가 일치하는 요소를 찾습니다.
productListElements.forEach(productElement => {
   //현재는 테스트를 위하여 체크되지 않은 이미지를 전송합니다. 이후에는 수정해주세요
  const imageSource = productElement.querySelector('img[src="/resources/img/ic-bag-non-check.png"]').getAttribute('src');
  console.log(imageSource);
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
            //이제 토스 결제 열면된다!
            paymentToss(response.apiKey,response.totalPrice,response.userId,response.url);
            console.log("apiKey : "+response.apiKey);
            console.log("totalPrice : "+response.totalPrice);
            console.log("userId : "+response.userId);
            console.log("url : "+response.url);
        },
        error: function (response) {
            console.log('결제 실패. 다시 시도해주세요');
        }
    });
}