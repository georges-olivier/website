let modal;

function openModal(attr = []) {
	// Prevent scrolling
	$('body').addClass('no-scroll');
	$('body').bind('touchmove', function(e){e.preventDefault()})

	// Show overlay
	let overlay = $('#overlay');
	overlay.css('display', 'flex');

	// Append modal
	modal = $('<div>', {class: 'modal'});
	overlay.append(modal);
	console.log('open');
}

function closeModal() {
	$('#overlay').fadeOut('fast');
	// Enable scrolling
	$('body').removeClass('no-scroll');
	$('body').unbind('touchmove')

	modal.remove();
	console.log('close');
}

$(function() {
	let overlay = $('<div>', {id: 'overlay'});
	$('body').append(overlay);
	overlay.on('click', function() {
		closeModal();
	});
});