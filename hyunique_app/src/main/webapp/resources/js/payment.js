var orderIdFromSession = sessionStorage.getItem('orderList');
var parsedValue = JSON.parse(orderIdFromSession);
var purchaseProductList = document.querySelector('.purchase-product-list');
var filteredData;

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

var sessionData = JSON.parse(sessionStorage.getItem("productListSizeColor"))

for(let i=0 ; i<sessionData.length ; i++){
    console.log(sessionData[i].productId);
    let check = 0;
    for(let j=0 ; j<productIds.length ; j++){
        console.log(productIds[i]);
        if (productIds[i] == sessionData[i].productId){
        check = 1;
        }
    }
    if (check == 0){
    let deleteId = sessionData[i].productId;
    filteredData = sessionData.filter(item => item.productId !== deleteId);
    }
    else{
    filteredData = sessionData;
    }
}
console.log(JSON.stringify(filteredData));

$.ajax({
        url: `/payment/purchaseLog`,
        type: 'POST',
        data: JSON.stringify(filteredData),
        contentType: 'application/json',
        success: function (response) {
            //우리 DB애 저장완료 되었습니다 !
        },
        error: function (response) {
            console.error('데이터가 성공적으로 저장되지 않았습니다.');
            console.error(response);
        }
    });