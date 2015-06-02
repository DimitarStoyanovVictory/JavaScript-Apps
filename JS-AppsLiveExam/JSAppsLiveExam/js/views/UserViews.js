var App = App || {};

App.Views = App.Views || {};

App.Views.UserViews = (function () {
	function UserViews() {
        this.loginView = {
            loadLoginView: loadLoginView
        };
        this.registerView = {
            loadRegisterView: loadRegisterView
        };
        this.homeView = {
            loadHomeView: loadHomeView
        };
        this.myNotesView = {
            loadMyNotesView: loadMyNotesView  
        };
    }

    function loadLoginView(selector) {
        $.get('templates/login.html', function (template) {
            var outHtml = Mustache.render(template);
            $(selector).html(outHtml);
        }).then(function () {
            $('#loginButton').click(function (event) {
                var username = $('#username').val().trim();
                var password = $('#password').val().trim();
                
                $.sammy(function () {
                    this.trigger('login', { username: username, password: password});
                });

                return false;
            });
        }).done();
    }

    function loadHomeView(selector, data) {
        $.get('templates/home.html', function (template) {
            var outHtml = Mustache.render(template, data);
            $(selector).html(outHtml);
        }).done();
    }

    function loadRegisterView(selector) {
        $.get('templates/register.html', function (template) {
            var outHtml = Mustache.render(template);
            $(selector).html(outHtml);
        }).then(function () {
            $('#registerButton').click(function () {
                var username = $('#username').val().trim();
                var password = $('#password').val().trim();
                var fullName = $('#fullName').val().trim();
                
                $.sammy(function () {
                    this.trigger('register', { username: username, password: password, fullName: fullName});
                });

                return false;
            });
        }).done();
    }

    function loadMyNotesView(selector, data){
        $.get('templates/myNoteTemplate.html', function (template) {
            var outHtml = Mustache.render(template, data);
            $(selector).html(outHtml);
        }).then(function () {
            $('.delete').on('click', function(event){
                window.location.replace('#/notes/delete/' + $(event.target).parent('.item').attr('data-id'));
            });
            
            $('.edit').on('click', function(event){
                window.location.replace('#/notes/edit/' + $(event.target).parent('.item').attr('data-id'));
            });
            
            $('.item a').click(function(event){
                event.preventDefault(); 
            });
            
            $('#pagination').pagination({
                items: data.totalNotes,
                itemsOnPage: 10,
                cssStyle: 'light-theme',
                hrefTextPrefix: '#/myNotes/'
            }).pagination('selectPage', data.currentPage);
        }).done();
    }
    
    return {
        load: function () {
            return new UserViews();
        }
    }
})();