function updateUser() {
    const userNickname = $('input[name="userNickname"]').val();
    const userIntroduce = $('input[name="userIntroduce"]').val();
    const userSex = $('input[name="userSex"]:checked').val();
    const instagramUrl = $('input[name="instagramUrl"]').val();
    const twitterUrl = $('input[name="twitterUrl"]').val();
    const facebookUrl = $('input[name="facebookUrl"]').val();

    $.ajax({
        url: '/hyunique/updateUser',
        type: 'POST',
        data: {
            userNickname,
            userIntroduce,
            userSex,
            instagramUrl,
            twitterUrl,
            facebookUrl
        },
        success: function (response) {
            alert('업데이트 성공!');
            window.location.reload();
        },
        error: function (response) {
            alert('업데이트 실패: 다시 시도해주세요.');
        }
    });
}
