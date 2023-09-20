/**
 * 토스 페이먼츠 결제 함수
 */
function paymentToss(){

    var tossPayments = TossPayments(tossPayKey); //테스트 클라이언트 키
    //data = createPaymentData()
    //입력받은 값에서 가져오게 변형
    var successUrl = url+'/payment/confirm'; // 결제 성공 시 이동할 페이지
    var failUrl = url+'/payment/confirm';; // 결제 실패 시 이동할 페이지
    tossPayments.requestPayment('카드', {
/*        amount: data.amount,
        orderId:  data.orderId,
        orderName: data.orderName,
        customerName: data.customerName,*/
        amount: 10000,
        orderId: 1010101,
        orderName: 1212121,
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