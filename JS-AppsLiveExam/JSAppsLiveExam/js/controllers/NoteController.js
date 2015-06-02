var App = App || {};

App.Controllers = App.Controllers || {};

App.Controllers.NoteController = (function () {
	function NoteController(model, views) {
        this.model = model;
        this.views = views;
    }
    
    NoteController.prototype.loadAddView = function(selector){
        this.views.addView.loadAddView(selector);  
    };
    
    NoteController.prototype.loadOfficeNotesPage = function(selector, currentPage){
        var data = {};
        var _this = this;
        
        return this.model.getOfficeNotes(currentPage - 1)
        .then(function(result){
            data.currentPage = currentPage;
            data.notes = result.results;
            
            return _this.model.countAll();
        }, function(error){
            App.errorNoty('top', 'Cannot load office notes.');
        }).then(function(result){
            data.totalNotes = result.count;
            
            _this.views.officeNotesView.loadOfficeNotesView(selector, data);  
        }, function(error){
            App.errorNoty('top', 'Cannot load office notes.');
        });
    };
    
    NoteController.prototype.loadDeletePage = function(selector, noteId){
        var _this = this;
        
        this.model.getById(noteId)
        .then(function(data){
            _this.views.deleteView.loadDeleteView(selector, data);
        }, function(error){
            App.errorNoty('top', 'Cannot load note for delete.');
        });  
    };
    
    NoteController.prototype.loadEditPage = function(selector, noteId){
        var _this = this;
        
        this.model.getById(noteId)
        .then(function(data){
            _this.views.editView.loadEditView(selector, data);
        }, function(error){
            App.errorNoty('top', 'Cannot load note for edit.');
        });
    };
    
    NoteController.prototype.editNote = function(noteId, data){
        if(sessionStorage['sessionToken']){
            if(validateNote(data) === true){
                this.model.editNote(noteId, data).
                then(function(noteData){
                     App.successNoty('top', 'Successfully edited note.');
    			     window.location.replace('#/myNotes/');
                }, function(error){
                     window.location.replace('#/myNotes/');
                });
            }  
        } else {
            App.errorNoty('top', 'You do not have the permission for this task.');
            window.location.replace('#/');
        }
    };
    
    NoteController.prototype.removeNote = function(noteId){
        if(sessionStorage['sessionToken']){
            this.model.removeNote(noteId).
            then(function(noteData){
                 App.successNoty('top', 'Successfully deleted note.');
			     window.location.replace('#/myNotes/');
            }, function(error){
                 App.errorNoty('top', 'Error during deleting note.');
                 window.location.replace('#/myNotes/');
            });
        } else {
            App.errorNoty('top', 'You do not have the permission for this task.');
            window.location.replace('#/');
        }
    };
    
    NoteController.prototype.createNote = function(data){
        if(sessionStorage['sessionToken']){
            if(validateNote(data) === true){
                data.author = sessionStorage['fullName'];
            
                this.model.createNote(data).
                then(function(noteData){
                     App.successNoty('top', 'Successfully added note.');
    			     window.location.replace('#/myNotes/');
                }, function(error){
                     window.location.replace('#/addNote/');
                });   
            }
        } else {
            App.errorNoty('top', 'You do not have the permission for this task.');
            window.location.replace('#/');
        }
    };
    
    function validateNote(data){
        var isValid = true;
        
        if(data.title.length < App.config.notesTitleLength){
            App.errorNoty('topLeft', 'Note title characters count must be at least ' + App.config.notesTitleLength + '.');
            isValid = false;
        } else if (data.text.length < App.config.notesTextLength){
            App.errorNoty('topLeft', 'Note text characters count must be at least ' + App.config.notesTextLength + '.');
            isValid = false;
        } else if(/[2-9]\d+\-[0][1-9]\-[0-3][0-9]/.test(data.deadline) == false){
            App.errorNoty('topLeft', 'Note deadline must be in format - (yy-mm-dd).');
            isValid = false;
        }
        
        return isValid;
    }
    
    return {
        load: function (model, views) {
            return new NoteController(model, views);
        }
    }
})();