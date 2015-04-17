$(document).ready(function () {
	$('#classButton').click(function () {
		var text = $('#inputClass').val();
		var color = $('#backgroundColor').val();
		text = '.' + text;
	    $(text).css('background', color);
	});
});

