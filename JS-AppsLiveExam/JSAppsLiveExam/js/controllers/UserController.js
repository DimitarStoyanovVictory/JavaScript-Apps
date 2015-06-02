var App = App || {};

App.Controllers = App.Controllers || {};

App.Controllers.UserController = (function () {
	function UserController(model, views) {
        this.model = model;
        this.views = views;
    }

    UserController.prototype.loadLoginPage = function (selector) {
        this.views.loginView.loadLoginView(selector);
    };

    UserController.prototype.loadRegisterPage = function (selector) {
        this.views.registerView.loadRegisterView(selector);
    };

    UserController.prototype.loadMyNotesPage = function (selector, currentPage) {
        var data = {};
        var _this = this;
        
        return this.model.getMyNotes(currentPage - 1)
        .then(function(result){
            data.currentPage = currentPage;
            data.notes = result.results;
            
            return _this.model.countMyNotes();
        }, function(error){
            App.errorNoty('top', 'Cannot load my notes.');
        }).then(function(result){
            data.totalNotes = result.count;
            
            _this.views.myNotesView.loadMyNotesView(selector, data);
        }, function(error){
            App.errorNoty('top', 'Cannot load my notes.');
        });
    };

    UserController.prototype.loadHomePage = function (selector) {
        var data = {
            fullName: sessionStorage['fullName'],
            username: sessionStorage['username']    
        };
        
        this.views.homeView.loadHomeView(selector, data);
    };

    UserController.prototype.login = function (username, password) {
        if(validateLogin(username, password) === true) {
            return this.model.login(username, password)
            .then(function (loginData) {
    			setUserToStorage(loginData);
                App.successNoty('top', 'Successfull logged in.');
    			window.location.replace('#/home/');
    		}, function (error) {
                App.errorNoty('top', 'Invalid username/password.');
                window.location.replace('#/login/');
            });   
        }
    };
    
    UserController.prototype.register = function (data) {
        if(validateRegister(data) === true){
            return this.model.register(data)
            .then(function (registerData) {
                App.successNoty('top', 'Successfull registration.');

                $.sammy(function () {
                    this.trigger('login', { username: data.username, password: data.password });
                });
            }, function (error) {
                App.errorNoty('topLeft', 'Unknow error occured during registration.');
                window.location.replace('#/register/');
            });
        }
    };

    UserController.prototype.logout = function () {
        return this.model.logout()
        .then(function () {
			clearUserFromStorage();
            App.successNoty('top', 'Successfully logged out.');
			window.location.replace('#/');
		}, function (error) {
            App.errorNoty('top', 'Error logging out.');
        });

    };

    function validateLogin(username, password){
        var isValid = true;
        
        if(username.length < App.config.usernameLength){
            App.errorNoty('topLeft', 'All usernames are at least ' + App.config.usernameLength + ' characters long.');
            isValid = false;
        } else if(password.length < App.config.passwordLength){
            App.errorNoty('topLeft', 'All passwords are at least ' + App.config.passwordLength + ' characters long.');
            isValid = false;
        }
        
        return isValid;
    }
    
    function validateRegister(data){
        var isValid = true;
        
        if(data.username.length < App.config.usernameLength){
            App.errorNoty('topLeft', 'Username must be at least ' + App.config.usernameLength + ' characters long.');
            isValid = false;
        } else if(data.password.length < App.config.passwordLength){
            App.errorNoty('topLeft', 'Password must be at least ' + App.config.passwordLength + ' characters long.');
            isValid = false;
        } else if(data.fullName.length < App.config.fullNameLength){
            App.errorNoty('topLeft', 'Full name must be at least ' + App.config.fullNameLength + ' characters long.');
            isValid = false;
        }
        
        return isValid;
    }

    function setUserToStorage(data) {
        sessionStorage['username'] = data.username;
        sessionStorage['fullName'] = data.fullName;
        sessionStorage['userId'] = data.objectId;
        sessionStorage['sessionToken'] = data.sessionToken;
    }

    function clearUserFromStorage() {
        delete sessionStorage['username'];
        delete sessionStorage['fullName'];
        delete sessionStorage['userId'];
        delete sessionStorage['sessionToken'];
    }

    return {
        load: function (model, views) {
            return new UserController(model, views);
        }
    }
})();