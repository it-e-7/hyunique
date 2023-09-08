let currentCategory = '';
const sessionId = document.getElementById('session-id').value;
const userId = document.getElementById('user-id').value;

$(document).ready(function() {
    loadCloset(userId);
});

//옷장 로드하는 함수
function loadCloset(userId) {
    console.log("loadCloset 함수 실행, userId: " + userId);
    $.ajax({
        url: `/closet/${userId}`,
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            displayCloset(data);
        },
        error: function() {
            console.error('옷장 정보를 가져오는 데 실패했습니다.');
        }
    });
}

//옷장 보여주는 함수
function displayCloset(closetVO) {
    console.log("displayCloset 함수 실행");
    console.log(closetVO);


    const categories = [
        'bagList', 'dressList', 'outerList', 'topList',
        'bottomList', 'shoesList', 'hatList', 'accessoryList'
    ];
    $('#allList').empty();
    
    let emptyCategory = 0;

    for (const category of categories) {
        let productHtml = '';
        const productList = closetVO[category];
        for (const product of productList) {
            productHtml += generateProductCard(product);
        }
        $(`#${category}`).html(productHtml).hide();
        
        if(productList.length === 0) {
        	emptyCategory++;
        } else {
        	addCategoryPreviewToAllList(category, productList);
        }
    }
    
    if(emptyCategory === 8) {
    	$('#allList').addClass('empty');
    }

    filterProducts('bagList', categories);
}

//카테고리별로 나누는 함수
function filterProducts(category) {
    console.log("filterProducts 함수 실행, 카테고리: " + category);

    const categories = [
        'allList', 'bagList', 'dressList', 'outerList', 'topList',
        'bottomList', 'shoesList', 'hatList', 'accessoryList'
    ];

 // 기존 코드 4줄
    const wrapper = document.getElementById(category);
    const overlayDiv = document.createElement('div');
    overlayDiv.className = 'overlay';
    overlayDiv.innerHTML = `
      <lord-icon
        src="https://cdn.lordicon.com/vixtkkbk.json"
	    trigger="loop"
	    delay="1500"
	    colors="primary:#121331,secondary:#545454"
	    style="width:170px;height:170px">
      </lord-icon>
      <p id="txt-more-style">다양한 스타일링을 올려보세요!</p>
    `;

    // .overlay를 제외한 실제 상품의 개수를 확인한다.
    const realChildrenCount = Array.from(wrapper.children).filter(child => !child.classList.contains('overlay')).length;

    if (realChildrenCount !== 0) {
      wrapper.classList.remove("empty");
      wrapper.style.display = 'grid'; // 상품이 있을 때는 display를 grid로 설정

      // 만약 overlay div가 있으면, 삭제한다.
      const existingOverlay = wrapper.querySelector('.overlay');
      if(existingOverlay) {
        wrapper.removeChild(existingOverlay);
      }

    } else {
      wrapper.classList.add("empty");
      wrapper.style.display = 'flex'; // 상품이 없을 때는 display를 flex로 설정

      // 이미 overlay div가 있다면 추가하지 않는다.
      if(!wrapper.querySelector('.overlay')) {
        wrapper.appendChild(overlayDiv);
      }
    }

    // 기존 코드 4줄
    for (const current of categories) {
      $(`#${current}`).hide();
    }
    $(`#${category}`).show();
    currentCategory = category;

}

//allList에 카테고리별 미리보기 추가 함수
function addCategoryPreviewToAllList(category, productList) {
    let previewHtml = `<div class="category-preview" onclick="filterProducts('${category}')">`;
    
    previewHtml += '<div class="image-wrapper">';
    let count = 0;
    for (const product of productList.slice(0, 4)) {
        previewHtml += `<img src="${product.productImg}" alt="${product.productName}" class="preview-thumbnail" />`;
        count++;
    }
    while (count < 4) {
        previewHtml += '<div class="preview-thumbnail empty-thumbnail"></div>';
        count++;
    }
    previewHtml += '</div>';
    const categoryNames = {
        'bagList': '가방',
        'dressList': '원피스',
        'outerList': '겉옷',
        'topList': '상의',
        'bottomList': '하의',
        'shoesList': '신발',
        'hatList': '모자',
        'accessoryList': '액세서리'
    };
    const categoryName = categoryNames[category] || category;
    
    previewHtml += `<div class="category-name">${categoryName}</div>`;
    previewHtml += '</div>';
    
    $('#allList').append(previewHtml);
    
}

//상품 영역 생성 함수
function generateProductCard(product) {
    return `<div class="product-card" onclick="moveToProduct(${product.productId})">
                <img src="${product.productImg}" alt="${product.productName}" width="100" height="100"/>
                <p id="product-brand">${product.productBrand}</p>
                <p id="product-name">${product.productName}</p>
                <p id="product-price">₩${product.productPrice}</p>
            </div>`;
}
