var App = App || {};

App.Views = App.Views || {};

App.Views.HomeViews = (function () {
	function HomeViews() {
        this.welcomeView = {
			loadWelcomeView: loadWelcomeView
		};
    }
	
	function loadWelcomeView(selector) {
		$.get('templates/welcome.html', function (template) {
            var outHtml = Mustache.render(template);
            $(selector).html(outHtml);
        });
	}
	
    return {
        load: function () {
            return new HomeViews();
        }
    }
})();