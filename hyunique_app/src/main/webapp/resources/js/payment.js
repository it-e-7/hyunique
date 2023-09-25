var orderIdFromSession = sessionStorage.getItem('orderList');
var parsedValue = JSON.parse(orderIdFromSession);
var purchaseProductList = document.querySelector('.purchase-product-list');

for (var i = 0; i < parsedValue.length; i++) {
    var productItem = parsedValue[i];
    console.log(productItem.productName);
    var listItem = document.createElement('li');
    listItem.innerHTML = `
        <div id="product-only-wrapper">
            <img src="${productItem.productImg}">
            <div>
                <strong>${productItem.productBrand}</strong>
                <p class="product-item-name">${productItem.productName}</p>
                <p class="product-item-price">${productItem.productPrice}원</p>
            </div>
        </div>
    `;
    purchaseProductList.appendChild(listItem);
}

var productIds = [];
for (var i = 0; i < parsedValue.length; i++) {
    var productId = parsedValue[i].productId;
    productIds.push(productId);
}

// 결과 출력
console.log(productIds);
$.ajax({
        url: `/payment/purchaseLog`,
        type: 'POST',
        contentType : 'application/json',
        data: JSON.stringify(productIds),
        success: function (response) {
            //우리 DB애 저장완료 되었습니다 !
        },
        error: function (response) {
            console.error('데이터가 성공적으로 저장되지 않았습니다.');
        }
    });