var App = App || {};

App.Models = App.Models || {};

App.Models.NoteModel = (function () {
	function NoteModel(requester) {
        this.requester = requester;
    }
    
    NoteModel.prototype.createNote = function (data){
        data.ACL = {};
        data.ACL[sessionStorage['userId']] = {
            'read': true,
            'write': true
        };
        data.ACL['*'] = {
            'read': true
        };
        data.author = {
            __type: "Pointer",
            className: "_User",
            objectId: sessionStorage['userId']  
        };
        
        return this.requester.post(App.config.baseUrl + 'classes/Note/', App.defaultHeaders(true), data);
    };
    
    NoteModel.prototype.removeNote = function (noteId){
        return this.requester.remove(App.config.baseUrl + 'classes/Note/' + noteId, App.defaultHeaders(true));
    };
    
    NoteModel.prototype.editNote = function (noteId, data){
        return this.requester.put(App.config.baseUrl + 'classes/Note/' + noteId, App.defaultHeaders(true), data);
    };
    
    NoteModel.prototype.countAll = function(){
        var today = new Date();
        
        var year = today.getFullYear();
        var month = today.getMonth() + 1;
        var day = today.getDate();
        
        var todayString = year.toString() + '-' + (month > 10 ? month.toString() : '0' + month.toString()) + '-';
        todayString += (day > 10 ? day.toString() : '0' + day.toString());
        
        var urlParams = '?where={"deadline":"' + todayString + '"}&count="1"&limit=0';
        return this.requester.get(App.config.baseUrl + 'classes/Note/' + urlParams, App.defaultHeaders(true));
    };
    
    NoteModel.prototype.getOfficeNotes = function (currentPage){
        var today = new Date();
        
        var year = today.getFullYear();
        var month = today.getMonth() + 1;
        var day = today.getDate();
        
        var todayString = year.toString() + '-' + (month > 10 ? month.toString() : '0' + month.toString()) + '-';
        todayString += (day > 10 ? day.toString() : '0' + day.toString());
        var urlParams = '?where={"deadline":"' + todayString + '"}&skip=' +
         (currentPage * App.config.notesPerPage).toString() + '&limit=' + App.config.notesPerPage + '&include=author';
        
        return this.requester.get(App.config.baseUrl + 'classes/Note/' + urlParams, App.defaultHeaders(true));
    };
    
    NoteModel.prototype.getById = function(noteId){
        return this.requester.get(App.config.baseUrl + 'classes/Note/' + noteId, App.defaultHeaders(true));  
    };
    
    return {
        load: function (requester) {
            return new NoteModel(requester);
        }
    }
})();