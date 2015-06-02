var App = App || {};

(function(){
	var requester = App.requester.load();
	
	var homeViews = App.Views.HomeViews.load();
	var noteViews = App.Views.NoteViews.load();
	var userViews = App.Views.UserViews.load();
	
	var noteModel = App.Models.NoteModel.load(requester);
	var userModel = App.Models.UserModel.load(requester);
	
	var homeController = App.Controllers.HomeController.load(homeViews);
	var noteController = App.Controllers.NoteController.load(noteModel, noteViews);
    var userController = App.Controllers.UserController.load(userModel, userViews);
	
	var selector = "#container";
	
	App.router = Sammy(function(){
		
		this.before(function(){
			if(sessionStorage['sessionToken']){
				$('#welcomeMenu').text('Welcome, ' + sessionStorage['username']);
				$('#menu').show();
			} else {
				$('#menu').hide();
			}
		});
		
		this.get('#/', function(){
			if(sessionStorage['sessionToken']){
				this.redirect('#/home/');
			} else {
				homeController.loadWelcomePage(selector);
			}
		});
		
		this.get('#/home/', function(){
			if(sessionStorage['sessionToken']){
				userController.loadHomePage(selector);
			} else {
				this.redirect('#/');
			}
		});
		
		this.get('#/login/', function(){
			if(sessionStorage['sessionToken']){
				App.errorNoty('top', 'You are already logged in.');
				this.redirect('#/home/');
			} else {
				userController.loadLoginPage(selector);
			}
		});
		
		this.get('#/logout/', function(){
			if(sessionStorage['sessionToken']){
				this.trigger('logout');
			} else {
				App.errorNoty('top', 'You are not logged in.');
				this.redirect('#/');
			}
		});
		
		this.get('#/register/', function(){
			if(sessionStorage['sessionToken']){
				App.errorNoty('top', 'You are registered and logged in.');
				this.redirect('#/home/');
			} else {
				userController.loadRegisterPage(selector);
			}
		});
		
		this.get('#/office/', function(){
			this.redirect('#/office/1');
		});
		
		this.get('#/office/:page', function(){
			if(sessionStorage['sessionToken']){
				noteController.loadOfficeNotesPage(selector, parseInt(this.params['page']));
			} else {
				App.errorNoty('top', 'You do not have the permissions for this task.');
				this.redirect('#/');
			}
		});
		
		this.get('#/addNote/', function(){
			if(sessionStorage['sessionToken']){
				noteController.loadAddView(selector);
			} else {
				App.errorNoty('top', 'You do not have the permissions for this task.');
				this.redirect('#/');
			}
		});
		
		this.get('#/myNotes/', function(){
			this.redirect('#/myNotes/1');
		});
		
		this.get('#/myNotes/:page', function(){
			if(sessionStorage['sessionToken']){
				userController.loadMyNotesPage(selector, parseInt(this.params['page']));
			} else {
				App.errorNoty('top', 'You do not have the permissions for this task.');
				this.redirect('#/');
			}
		});
		
		this.get('#/notes/delete/:noteId', function(){
			if(sessionStorage['sessionToken']){
				noteController.loadDeletePage(selector, this.params['noteId']);
			} else {
				App.errorNoty('top', 'You do not have the permissions for this task.');
				this.redirect('#/');
			}
		});
		
		this.get('#/notes/edit/:noteId', function(){
			if(sessionStorage['sessionToken']){
				noteController.loadEditPage(selector, this.params['noteId']);
			} else {
				App.errorNoty('top', 'You do not have the permissions for this task.');
				this.redirect('#/');
			}
		});
		
		this.bind('login', function(event, data){
			userController.login(data.username, data.password);
		});
		
		this.bind('logout', function(event, data){
			userController.logout();
		});
		
		this.bind('register', function(event, data){
			userController.register(data);
		});
		
		this.bind('addNote', function(event, data){
			noteController.createNote(data);
		});
		
		this.bind('removeNote', function(event, data){
			noteController.removeNote(data.noteId);
		});
		
		this.bind('editNote', function(event, data){
			noteController.editNote(data.noteId, data.dataToUpdate);
		});
	});
	
	App.router.run('#/');
})();