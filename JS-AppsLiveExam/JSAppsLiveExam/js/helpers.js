var App = App || {};

(function () {
	App.defaultHeaders = function (withUser) {
		var headers = {
			'X-Parse-Application-Id': App.config.ApplicationId,
			'X-Parse-REST-API-Key': App.config.RestApiKey,
			'Content-Type': 'application/json'
		};
			
		if (withUser && sessionStorage['sessionToken']) {
			headers['X-Parse-Session-Token'] = sessionStorage['sessionToken'];
		}
			
		return headers;
	};
		
	App.customHeaders = function (customHeaders, withUser) {
		var headers = App.defaultHeaders(withUser);
			
		for (var prop in customHeaders) {
			if (customHeaders.hasOwnProperty(prop)) {
				headers[prop] = customHeaders[prop];
			}
		}
			
		return headers;
	};
		
	function notify(typeNoty, layout, text, timeout, typeClose) {
		var notification = noty({
			text: text,
			layout: layout,
			type: typeNoty,
			timeout: timeout,
			closeWith: ['click']
		});
	}
		
	App.successNoty = function (layout, text) {
		notify('success', layout, text, 2000);
	};
		
	App.errorNoty = function (layout, text) {
		notify('error', layout, text, 4000);
	};
})();
