$(function() {
	$.ajax({
		method: 'POST',
		url: 'https://api.georgesolivier.art/pageview',
		data: { uri: $(location).attr('pathname'), useragent: navigator.userAgent}
	});
});