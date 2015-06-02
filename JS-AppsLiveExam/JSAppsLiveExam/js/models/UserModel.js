var App = App || {};

App.Models = App.Models || {};

App.Models.UserModel = (function () {
	function UserModel(requester) {
        this.requester = requester;
    }

    UserModel.prototype.login = function (username, password) {
        var url = App.config.baseUrl + 'login?username=' + username + '&password=' + password;
        return this.requester.get(url, App.defaultHeaders());
    };

    UserModel.prototype.register = function (data) {
        var url = App.config.baseUrl + 'users/';
        
        var _this = this;
        
        return this.requester.post(url, App.defaultHeaders(), data)
        .then(function(registerData){
            var dataToUpdate = {
					"users": {
						"__op": "AddRelation",
						"objects": [
							{
								"__type": "Pointer",
								"className": "_User",
								"objectId": registerData.objectId
							}
						]
					}
				};
            
            return _this.requester.put(App.config.baseUrl + 'roles/MQSfWhd81u', App.defaultHeaders(), dataToUpdate);
        }, function(error){
            return error;
        });
    };

    UserModel.prototype.logout = function () {
        var url = App.config.baseUrl + 'logout';
        return this.requester.post(url, App.defaultHeaders(true));
    };
    
    UserModel.prototype.countMyNotes = function(){
        var urlParams = '?where={"author":{"__type":"Pointer","className":"_User","objectId":"' + sessionStorage['userId'] +
         '"}}&count="1"&limit=0';
        return this.requester.get(App.config.baseUrl + 'classes/Note/' + urlParams, App.defaultHeaders(true));
    };
    
    UserModel.prototype.getMyNotes = function (currentPage){
        var urlParams = '?where={"author":{"__type":"Pointer","className":"_User","objectId":"' + sessionStorage['userId'] +
         '"}}&skip=' + (currentPage * App.config.notesPerPage).toString() + '&limit=' + App.config.notesPerPage + '&include=author';
         
        return this.requester.get(App.config.baseUrl + 'classes/Note/' + urlParams, App.defaultHeaders(true));
    };
    
    return {
        load: function (requester) {
            return new UserModel(requester);
        }
    }
})();