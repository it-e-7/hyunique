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