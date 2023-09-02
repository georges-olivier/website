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

	let newline = "\n\n";

	// Share options
	let shareTwitter = $('<a>', {class: 'button'}).append(
		$('<i>', {class: 'fa-brands fa-x-twitter'})
	).on('click', function(e) {
		e.stopPropagation();
		window.open('https://twitter.com/share?'+serialize({
			text: img.attr('imgtitle')+' — from Georges Olivier\'s '+img.attr('imgTheme')+' collection.'+newline+
			'https://showcase.georgesolivier.art/image/'+img.attr('slug')+newline+
			'#'+img.attr('imgTheme')+' #art #artworks #artgallery'
		}), 'social', 'status=no,menubar=no,width=550,height=850');
	});

	let shareFacebook = $('<a>', {class: 'button'}).append(
		$('<i>', {class: 'fa-brands fa-facebook-f'})
	);

	let social = $('<div>').append(
		shareTwitter,
		shareFacebook
	);
	social.css({position: 'absolute', bottom: 0, left: modalWidth + 15});

	// Append modal
	modal = $('<div>', {class: 'modal'});
	modal.append(
		$('<img>', {
			class: 'preview',
			src: img.attr('src'),
			imgSeq: img.attr('imgSeq')}).css({width: modalWidth + 'px', height: modalHeight + 'px', padding: '3rem'
		}),
		social
	);
	overlay.append(modal);
}

function closeModal() {
	$('head title').text('Georges Olivier');
	history.pushState(null,null,'#');
	$('#overlay').fadeOut('fast');
	// Enable scrolling
	$('body').removeClass('no-scroll');
	$('body').unbind('touchmove')
	if (modal.length) {
		modal.remove();
		modal = false;
	}
}

serialize = function(obj) {
	var str = [];
	for (var p in obj) {
		if (obj.hasOwnProperty(p)) {
			str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
		}
	}
	return str.join("&");
}

$(function() {
	let overlay = $('<div>', {id: 'overlay'});
	$('body').append(overlay);
	overlay.on('click', function() {
		closeModal();
	});
});