var app = app || {};

app.models = (function () {

	function Models(baseUrl) {
	    this.baseUrl = baseUrl;
		this.students = new Students(this.baseUrl);
    }

    var Requester = (function() {
        function makeRequest(method, url, data, success, error) {
            $.ajax({
                method: method,
                headers: {
                    'X-Parse-Application-Id': 'cXFmJk0MvsTtQM6RCIHGrfcG500r0Qj7KNcrWMu0',
                    'X-Parse-REST-API-Key': 'fsheDckKpj1E0UVHucXLiT0fGeOHYW9bMFyb1pC9'
                },
                url: url,
                contentType: 'application/json',
                data: JSON.stringify(data),
                success: success,
                error: error
            });
        }

		function getRequest(url, success, error) {
            makeRequest('GET', url, null, success, error);
        }

        function postRequest(url, data, success, error) {
            makeRequest('POST', url, data, success, error);
        }

        function deleteRequest(url, success, error) {
            makeRequest('DELETE', url, null, success, error);
        }

        return {
            getRequest: getRequest,
            postRequest: postRequest,
            deleteRequest: deleteRequest
        }
    })();

    var Students = (function() {
        function Students(baseUrl) {
            this.baseUrl = baseUrl + 'Student/';
        }

		Students.prototype.getAllStudents = function(success, error) {
            return Requester.getRequest(this.baseUrl, success, error);
        };

		Students.prototype.postStudent = function(student, success, error) {
            return Requester.postRequest(this.baseUrl, student, success, error);
        };

		Students.prototype.removeStudent = function(id, success, error) {
            return Requester.deleteRequest(this.baseUrl + id, success, error);
        };

        return Students;
	})();

    return {
        loadModels: function(baseUrl) {
            return new Models(baseUrl);
        }
    }
})();

//app.models.studnets.getAll();
//app.models.stuendts.post(studnet);
//app.models.students.delete(studentId);