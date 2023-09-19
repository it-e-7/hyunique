let presentDisplayId = 1;
let scrollLock = false;

$(`#card-list-${presentDisplayId}`).css('display', 'flex');

$('.select-depart').scroll((e) => {
	if(scrollLock) return;
	scrollLock = true;
	
	const departHeight = $('#select-depart-0').height();
	const nextDisplayId = Math.round($('.select-depart').scrollTop() / departHeight) + 1;
	
	$(`#card-list-${presentDisplayId}`).css('display', 'none');
	$(`#card-list-${nextDisplayId}`).css('display', 'flex');
	
	presentDisplayId = nextDisplayId;
	console.log(presentDisplayId);
	
	setTimeout(() => {
		scrollLock = false;
	}, 100);
});

function sharePost(productName) {
	if(isMobile()) {
		try {
			navigator.share({
				title: `${productName} | 더 hyunique하게`,
				url: location.href,
			}).then(() => {
				
			}).catch(console.log);
		} catch(err) {
			const t = document.createElement("textarea");
			document.body.appendChild(t);
			t.value = location.href;
			t.select();
			document.execCommand('copy');
			document.body.removeChild(t);
			alert('클립보드에 복사되었습니다 !');
		}
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