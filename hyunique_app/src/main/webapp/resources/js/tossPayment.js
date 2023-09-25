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
            } else if (error.code === 'INVALID_CARD_COMPANY') {
                // 유효하지 않은 카드 코드에 대한 에러 처리
            }
        });

}

function paymentAddressCheck () {
    let orderList = checkProductList();
    if (orderList.length != 0){
        if(localStorage.getItem('address')!=null){
            paymentInformation (localStorage.getItem('address'));
        }
        else{
        $("#sample3_search").click();
        }
    }
    else {
    alert("상품을 선택해주세요");
    }
}

//토스 결제를 하기 전에, 상품에 해당하는 정보를 가져옵시다
function paymentInformation (userAddress) {
    localStorage.setItem('address', userAddress);
    let orderList = checkProductList();

    //구매리스트 컨트롤러로 전송
    const addressData = localStorage.getItem('address');
    $.ajax({
            url: `/payment/confirm`,
            type: 'POST',
            contentType : 'application/json',
            data: JSON.stringify(orderList),
            success: function (response) {
                //토스를 위해 세션에도 저장해줍니다.
                sessionStorage.setItem('orderList', JSON.stringify(response.productList));
                paymentToss(response.apiKey,response.totalPrice,response.userId,response.url,JSON.stringify(orderList));
            },
            error: function (response) {
                console.error('결제 실패. 다시 시도해주세요');
            }
    });
}

function checkProductList () {
let orderList = [];
const productListElements = document.querySelectorAll('.gpt-product-list');
productListElements.forEach(productElement => {
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
return orderList
}