// 우편번호 찾기 찾기 화면을 넣을 element
var element_wrap = document.getElementById('wrap');
var element_modal_wrap = document.getElementById('modal-wrap');
var element_address_modal = document.getElementById('address-modal');

function foldDaumPostcode() {

    //확인버튼 누르면
    //취소 버튼 누르면
    // iframe을 넣은 element를 안보이게 한다.
    element_wrap.style.display = 'none';
    element_modal_wrap.style.display = 'none';
}

function openAddressCheckModal() {
    element_address_modal.style.display ='block';
    element_wrap.style.display = 'none';
}

function sample3_execDaumPostcode(userId) {
    // 현재 scroll 위치를 저장해놓는다.
    var currentScroll = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
    new daum.Postcode({
        oncomplete: function(data) {
            // 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 각 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var addr = ''; // 주소 변수
            var extraAddr = ''; // 참고항목 변수

            //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                addr = data.roadAddress;
            } else { // 사용자가 지번 주소를 선택했을 경우(J)
                addr = data.jibunAddress;
            }

            // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
            if(data.userSelectedType === 'R'){
                // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                    extraAddr += data.bname;
                }
                // 건물명이 있고, 공동주택일 경우 추가한다.
                if(data.buildingName !== '' && data.apartment === 'Y'){
                    extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                if(extraAddr !== ''){
                    extraAddr = ' (' + extraAddr + ')';
                }
                // 조합된 참고항목을 해당 필드에 넣는다.
                document.getElementById("sample3_extraAddress").value = extraAddr;

            } else {
                document.getElementById("sample3_extraAddress").value = '';
            }

            // 주소 정보를 해당 필드에 넣는다.
            document.getElementById("sample3_address").value = addr;

            // 커서를 상세주소 필드로 이동한다.
            document.getElementById("sample3_detailAddress").focus();

            openAddressCheckModal();

            // 우편번호 찾기 화면이 보이기 이전으로 scroll 위치를 되돌린다.
            document.body.scrollTop = currentScroll;
        },
        // 우편번호 찾기 화면 크기가 조정되었을때 실행할 코드를 작성하는 부분. iframe을 넣은 element의 높이값을 조정한다.
        onresize : function(size) {
            element_wrap.style.height = size.height+'px';
        },
        width : '100%',
        height : '100%'
    }).embed(element_wrap);

    // iframe을 넣은 element를 보이게 한다.
    element_wrap.style.display = 'block';
    element_modal_wrap.style.display = 'block';
}

function updateUserAddress () {
//유저 주소의 조합
const userAddress = $('#sample3_address').val() +' '+ $('#sample3_detailAddress').val() + $('#sample3_extraAddress').val();

//확인하고 넣을 때 주소를 로컬 스토리지에 저장한다 -> 근데 전체 주소로 저장해서 넣어야 함! 조합으로!
localStorage.setItem('address', userAddress);

//유저의 주소 업데이트도 해줍니다!
$.ajax({
        url: `/payment/addressUpdate`,
        type: 'POST',
        contentType: 'application/json',
        data: userAddress,
        success: function (response) {
            //주소가 저장되었기 때문에 이제 결제로 이동합니다!
            paymentInformation(userAddress);
        },
        error: function (response) {
            console.error("유저 주소 정보 업데이트 실패");
        }
    });
}

//취소 버튼 클릭시
$("#address-cancel-button").click(function() {
    element_wrap.style.display = 'none';
    element_modal_wrap.style.display = 'none';
    element_address_modal.style.display ='none';
});

//확인 버튼 클릭시
$("#address-apply-button").click(function() {
    element_wrap.style.display = 'none';
    element_modal_wrap.style.display = 'none';
    element_address_modal.style.display ='none';
    updateUserAddress();
});