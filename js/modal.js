let modal = false;

function openModal(img) {

	let imgWidth = img[0].naturalWidth;
	let imgHeight = img[0].naturalHeight;
	let ratio = 4/3;
	let max = window.innerHeight * 0.95;

	let modalWidth = (imgWidth > imgHeight) ? max * 1.1:max / ratio;
	let modalHeight = (imgWidth < imgHeight) ? max:max / ratio * 1.1;

	window.location.hash = '/image/' + img.attr('slug');

	// Prevent scrolling
	$('body').addClass('no-scroll');
	$('body').bind('touchmove', function(e){e.preventDefault()})

	// Show overlay
	let overlay = $('#overlay');
	overlay.css({display: 'flex', top: $(window).scrollTop()});

	$('#images img[current=true]').removeAttr('current');
	img.attr('current', true);

	// Append modal
	modal = $('<div>', {class: 'modal'});
	modal.append($('<img>', {class: 'preview', src: img.attr('src'), imgSeq: img.attr('imgSeq')}).css({width: modalWidth + 'px', height: modalHeight + 'px', padding: '3rem'}));
	overlay.append(modal);
}

function closeModal() {
	$('head title').text('Georges Olivier');
	window.location.hash = '';
	$('#overlay').fadeOut('fast');
	// Enable scrolling
	$('body').removeClass('no-scroll');
	$('body').unbind('touchmove')
	if (modal.length) {
		modal.remove();
		modal = false;
	}
}

$(function() {
	let overlay = $('<div>', {id: 'overlay'});
	$('body').append(overlay);
	overlay.on('click', function() {
		closeModal();
	});
});