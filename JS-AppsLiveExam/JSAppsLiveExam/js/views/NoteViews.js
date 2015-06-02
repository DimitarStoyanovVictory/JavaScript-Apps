var App = App || {};

App.Views = App.Views || {};

App.Views.NoteViews = (function () {
	function NoteViews() {
        this.editView = {
            loadEditView: loadEditView
        };
        
        this.addView = {
            loadAddView: loadAddView
        };
        
        this.deleteView = {
            loadDeleteView: loadDeleteView
        };
        
        this.officeNotesView = {
            loadOfficeNotesView: loadOfficeNotesView  
        };
    }
    
    function loadOfficeNotesView(selector, data){
         $.get('templates/officeNoteTemplate.html', function (template) {
            var outHtml = Mustache.render(template, data);
            $(selector).html(outHtml);
        }).then(function () {
            $('.item a').click(function(event){
                event.preventDefault(); 
            });
            
             $('#pagination').pagination({
                items: data.totalNotes,
                itemsOnPage: 10,
                cssStyle: 'light-theme',
                hrefTextPrefix: '#/office/'
            }).pagination('selectPage', data.currentPage);
        }).done();
    }
    
    function loadEditView(selector, data){
        $.get('templates/editNote.html', function (template) {
            var outHtml = Mustache.render(template, data);
            $(selector).html(outHtml);
        }).then(function () {
            $('#editNoteButton').on('click', function(event){
                var dataToUpdate = {
                    title: $('#title').val().trim(),
                    text: $('#text').val().trim(),
                    deadline: $('#deadline').val().trim()
                };
                
                $.sammy(function(){
                    this.trigger('editNote', {dataToUpdate: dataToUpdate, noteId: data.objectId});
                });
                
                return false;
            });
        }).done();
    }
    
    function loadAddView(selector){
        $.get('templates/addNote.html', function (template) {
            var outHtml = Mustache.render(template);
            $(selector).html(outHtml);
        }).then(function () {
            $('#addNoteButton').click(function(event){
                var data = {
                    title: $('#title').val().trim(),
                    text: $('#text').val().trim(),
                    deadline: $('#deadline').val().trim()
                };
                
                $.sammy(function(){
                    this.trigger('addNote', data);
                });
                
                return false;
            });
        }).done();
    }
    
    function loadDeleteView(selector, data){
        $.get('templates/deleteNote.html', function (template) {
            var outHtml = Mustache.render(template, data);
            $(selector).html(outHtml);
        }).then(function () {
            $('#deleteNoteButton').on('click', function(event){
                $.sammy(function(){
                    this.trigger('removeNote', {noteId: data.objectId});
                });
                
                return false;
            });
        }).done();
    }
    
    return {
        load: function () {
            return new NoteViews();
        }
    }
})();