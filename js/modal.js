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

	// Interaction buttons
	let favorite = $('<a>', {class: 'button'}).append(
		$('<i>', {class: 'fa-regular fa-heart'})
	)

	let buy = $('<a>', {class: 'button green'}).append(
		$('<i>', {class: 'fa-solid fa-basket-shopping'})
	)

	let notify = $('<a>', {class: 'button'}).append(
		$('<i>', {class: 'fa-regular fa-bell'})
	)

	let interactionButtons = $('<div>').append(
		favorite,
		//buy,
		//notify
	);
	interactionButtons.css({position: 'absolute', top: 5, left: modalWidth + 15});

	// Social buttons
	let newline = "\n\n";
	let url = 'https://showcase.georgesolivier.art/image/'+img.attr('slug');
	let description = img.attr('imgtitle')+' — from Georges Olivier\'s '+img.attr('imgTheme')+' collection.';
	let hashtags = '#'+img.attr('imgTheme')+' #art #artworks #artgallery';

	let shareTwitter = $('<a>', {class: 'button'}).append(
		$('<i>', {class: 'fa-brands fa-x-twitter'})
	).on('click', function(e) {
		e.stopPropagation();
		window.open('https://twitter.com/share?'+serialize({
			text: description+newline+url+newline+hashtags
		}), 'social', 'status=no,menubar=no,width=550,height=850');
	});

	let shareFacebook = $('<a>', {class: 'button'}).append(
		$('<i>', {class: 'fa-brands fa-facebook-f'})
	).on('click', function(e) {
		e.stopPropagation();
		window.open(
			'https://www.facebook.com/sharer/sharer.php?'+serialize({
				u: url
			}), 'social', 'status=no,menubar=no,width=550,height=850'
		);
		return false;
	});

	let sharePinterest = $('<a>', {class: 'button'}).append(
		$('<i>', {class: 'fa-brands fa-pinterest-p'})
	).on('click', function(e) {
		e.stopPropagation();

		window.open(
			'http://pinterest.com/pin/create/button/?'+serialize({
				description: description+' '+hashtags,
				url: url
			}), 'social', 'status=no,menubar=no,width=850,height=850'
		);
		return false;
	});

	let link = $('<a>', {class: 'button'}).append(
		$('<i>', {class: 'fa-solid fa-link'})
	)

	let copy = $('<a>', {class: 'button'}).append(
		$('<i>', {class: 'fa-regular fa-image'})
	)

	let socialButtons = $('<div>').append(
		shareTwitter,
		sharePinterest,
		shareFacebook,
		$('<div>', {class: 'divide'}),
		copy,
		link
	);
	socialButtons.css({position: 'absolute', bottom: 5, left: modalWidth + 15});

	// Append modal
	modal = $('<div>', {class: 'modal'});
	modal.append(
		$('<img>', {
			class: 'preview',
			src: img.attr('src'),
			imgSeq: img.attr('imgSeq')}).css({width: modalWidth + 'px', height: modalHeight + 'px', padding: '3rem'
		}),
		interactionButtons,
		socialButtons
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