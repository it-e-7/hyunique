let presentDisplayId = $('select[name="depart"]').val();

$(`#card-list-${presentDisplayId}`).css('display', 'flex');

$('select[name="depart"]').on('change', (e) => {
	const nextDisplayId = e.target.value;
	
	$(`#card-list-${presentDisplayId}`).css('display', 'none');
	$(`#card-list-${nextDisplayId}`).css('display', 'flex');
	
	presentDisplayId = nextDisplayId;
});