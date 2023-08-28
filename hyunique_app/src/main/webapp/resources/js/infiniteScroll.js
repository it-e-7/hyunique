$(document).ready(function() {
        var itemsPerPage = 20;
        var currentPage = 0;
        var isLoading = false; //로딩중이다 아니다를 판단하기 위함

        $(window).scroll(function() {
            if (isScrollbarAtBottom()) {
                            if (isLoading) {
                                return;
                            }
                loadMoreImages();
            }
        });

        function loadMoreImages() {
        isLoading = true;
            $.ajax({
                url: `/post/getMorePost`,
                type: "GET",
                data: {
                    page: currentPage
                },
                success: function(data) {
                     $("#photo-gallery").append(data);
                    currentPage++;
                    isLoading = false;
                }
            });
        }

        function isScrollbarAtBottom() {
            var element = document.documentElement;
            var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (element.scrollTop || 0);
            var scrollHeight = (element.scrollHeight !== undefined) ? element.scrollHeight : 0;
            var windowHeight = element.clientHeight || window.innerHeight;

            return scrollTop + windowHeight >= scrollHeight; // 스크롤바가 가장 아래에 있는 경우 true를 반환
        }

        loadMoreImages();
    });