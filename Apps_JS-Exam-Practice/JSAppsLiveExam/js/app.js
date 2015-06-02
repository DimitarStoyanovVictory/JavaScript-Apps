var app = app || {};

$(document).ready(function() {
    (function() {
        app.router = Sammy(function() {
            var baseUrl = 'https://www.parse.com/1/';
            var selector = '#container';

            function makeRequest(method, serviceUrl, data) {
                var defer = $.Deferred();

                $.ajax({
                    method: method,
                    headers: {
                        'X-Parse-Application-Id': 'ZROpk2PxlQuD3zUFa59RiZOQEf08XT5RQQwYTtyL',
                        'X-Parse-REST-API-Key': 'cQxhntc8WZTVgktB6gInGJpOVjMC6EcF0ZDQMEQe',
                        'Content-type': 'application/json'
                    },
                    url: baseUrl + serviceUrl,
                    data: JSON.stringify(data),
                    success: function(serverData) {
                        defer.resolve(serverData);
                    },
                    error: function(serverError) {
                        defer.reject(serverError);
                    }
                });

                return defer.promise();
			}

            function setUserToStorage(user) {
				sessionStorage['username'] = user.username;
				sessionStorage["fullName"] = user.fullName;
			}

            function loadWelcomeView(selector) {
                $.get('templates/welocme.html', function(template) {
                    var outHtml = Mustache.render(template);
                    $(selector).html(outHtml);
                });
            }

            this.get('#/', function() {
                $.get('templates/welcome.html', function(template) {
                    $(selector).html(template);
                });
            });

            this.get('#/login/', function() {
                $.get('templates/login.html', function(template) {
                    $(selector).html(template);

                    $('#loginButton').click(function() {
                        var user = {
                            username: $('#username').val(),
                            password: $('#password').val()
                        }

                        var serviceUrl = 'login?username=' + user.username + '&password=' + user.password;

						makeRequest('GET', serviceUrl)
							.then(function (serverLoginData) {
								app.successNoty('top', 'Successfully logged in');
								window.location.replace('#/home/');
						        setUserToStorage(serverLoginData);
						        loadWelcomeView(selector);
								console.log(serverLoginData);
							}, 
								function (serverLoginError) {
								app.errorNoty('top', 'Invalid username/password/');
								console.log(serverLoginError);
							}
						);
                    });
                });
            });

            this.get('#/register/', function() {
                $.get('templates/register.html', function(template) {
                    $(selector).html(template);

                    $('#registerButton').click(function() {
                        var user = {
                            username: $('#username').val(),
                            password: $('#password').val(),
                            fullName: $('#fullName').val()
                        }

                        makeRequest('POST', 'users', user)
                            .then(function(serverLoginData) {
								app.successNoty('top', 'Successfully logged in');
								console.log(serverLoginData);
								window.location.replace('#/home/');
								loadWelcomeView(selector);
                                setUserToStorage(serverLoginData);
							}, 
								function (serverLoginError) {
								app.errorNoty('top', 'Invalid username/password/fullName');
                                console.log(serverLoginError);
                            }
						);
                    });
                });
            });

            this.get('#/home/', function() {
                $.get('templates/home.html', function(template) {
                    $(selector).html(template);
                });
            });

            this.get('#/office/', function() {
                $.get('templates/officeNoteTemplate.html', function(template) {
                    $(selector).html(template);
                });
            });

            this.get('#/myNotes/', function() {
                $.get('templates/myNoteTemplate.html', function(template) {
                    $(selector).html(template);
                });
            });
        });

        app.router.run('#/');
    })();
});
