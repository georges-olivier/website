function trackPageView() {
	$.ajax({
		method: 'POST',
		url: 'https://api.georgesolivier.art/pageview',
		data: { uri: $(location).attr('href'), viewport: $(window).width() + ',' + $(window).height()}
	});
}

$(function() {
	trackPageView();

	$(window).on('hashchange', function() {
		trackPageView();
		// let path = $(location).attr('hash');
	});
});