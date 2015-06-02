var App = App || {};

App.Controllers = App.Controllers || {};

App.Controllers.HomeController = (function () {
	function HomeController(views) {
        this.views = views;
    }

    HomeController.prototype.loadWelcomePage = function(selector){
        this.views.welcomeView.loadWelcomeView(selector);
    };

    return {
        load: function (views) {
            return new HomeController(views);
        }
    }
})();