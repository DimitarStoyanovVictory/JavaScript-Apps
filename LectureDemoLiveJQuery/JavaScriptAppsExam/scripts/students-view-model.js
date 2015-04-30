var app = app || {};

app.viewModel = (function () {
    function ViewModel(model) {
		this.model = model;
        this.attachEventListner(this);
	}

	ViewModel.prototype.showAllStudents = function () {
	    var _this = this;
        this.model.students.getAllStudents(
			function (studentsData) {
			    studentsData.results.forEach(function(student) {
					_this.addStudentToDom(student.name, student.grade, student.objectId);
			    });
			},
			function(error) {
			    console.log(error.responseText); 
			}
        );
	};

    ViewModel.prototype.addStudent = function(viewModel) {
		var studentName = $('#student-name').val();
		var studentGrade = +$('#student-grade').val();
        viewModel.model.students.postStudent(
            { name: studentName, grade: studentGrade },
            function(data) {
                viewModel.addStudentToDom(studentName, studentGrade, data.objectId);
            },
            function(error) {
                console.log(error);
            }
        );
	};
	
	ViewModel.prototype.deleteStudent = function(studentId) {
		this.model.students.removeStudent(studentId,
		function () {
			$('#students-container')
                .find('[data-id=' + studentId + ']')
                .remove();
		},
		function() {
		    console.log('No');
		});
	}
	
	ViewModel.prototype.attachEventListner = function(viewModel) {
	    $('#add-student').click(function() {
			viewModel.addStudent(viewModel);
		}) ;
	}
	
	ViewModel.prototype.addStudentToDom = function (studentName, studentGrade, studentId) {
		var _this = this;
		var studnetWrapper = $('<div />').addClass('student-list');
		studnetWrapper.attr('data-id', studentId);
		var studentName = $('<p/>').text(studentName);
		var studentGrade = $('<p/>').text(studentGrade);
		var deleteButton = $('<button class="delete-student">Delete</button>');
		
		deleteButton.click(function () {
			_this.deleteStudent(studentId);
		});
		
		studnetWrapper
			.append(studentName)
			.append(studentGrade)
			.append(deleteButton);
		
		$('#students-container').append(studnetWrapper);
	}

	return {
	    loadViewModel : function(model) {
	        return new ViewModel(model);
	    }
	}
})();