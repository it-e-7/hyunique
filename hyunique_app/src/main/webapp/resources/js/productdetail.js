let presentDisplayId = $('select[name="depart"]').val();

$(`#card-list-${presentDisplayId}`).css('display', 'flex');

$('select[name="depart"]').on('change', (e) => {
	const nextDisplayId = e.target.value;
	
	$(`#card-list-${presentDisplayId}`).css('display', 'none');
	$(`#card-list-${nextDisplayId}`).css('display', 'flex');
	
	presentDisplayId = nextDisplayId;
});

function moveToPost(postId) {
	location.href=`/hyunique/post/${postId}`;
}

function sharePost(productName) {
	if(navigator.share && (isMobile.apple.phone || isMobile.android.phone)) {
		navigator.share({
			title: `${productName} | 더 hyunique하게`,
			text: `하이`,
			url: location.href,
		}).then(() => {
			console.log('공유 완료');
		}).catch(console.error);
	} else {
		const t = document.createElement("textarea");
		document.body.appendChild(t);
		t.value = location.href;
		t.select();
		document.execCommand('copy');
		document.body.removeChild(t);
		alert('클립보드에 복사되었습니다 !');
	}
}