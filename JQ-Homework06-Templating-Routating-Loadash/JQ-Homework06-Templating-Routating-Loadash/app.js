var app = app || {};

(function () {
	app.router = Sammy(function () {
		var selector = '#wrapper';

		var object = this;
		
		object.get('#/', function () {
			$(selector).text('Hello welcome, pleace select a name');
		});

	    var name = '';
	    $('a').click(function() {
			name = $(this).text();
	        object.get('#/' + name, function() {
	            $(selector).text('Hello ' + name + '!');
	        });
	    });
	});
	
	app.router.run('#/');
})();