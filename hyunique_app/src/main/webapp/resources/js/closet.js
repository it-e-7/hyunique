function fetchClosetInfo(sessionId) {
  $.ajax({
    url: `/closet/${sessionId}`,
    type: 'GET',
    success: function(closetItems) {
      var closetDiv = $('#closet'); // HTML에서 옷장 정보를 표시할 div
      closetDiv.empty(); // 기존 옷장 아이템 제거

      closetItems.forEach(function(item) {
        var productImage = $('<img/>', {
          src: item.productImg,
          class: 'thumbnail-image'
        });

        var productInfo = $('<div/>', {
          text: item.typeName
        });

        var productDiv = $('<div/>');
        productDiv.append(productImage);
        productDiv.append(productInfo);

        closetDiv.append(productDiv); // 옷장 아이템 추가
      });
    },
    error: function(error) {
      console.log('옷장 정보를 불러오는 데 실패했습니다:', error);
    }
  });
}
