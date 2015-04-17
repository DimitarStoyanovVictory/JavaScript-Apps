(function () {
	// Problem 2 - List all books
	$(document).ready(function () {
		$.ajax({
			method: "GET",
			headers: {
				"X-Parse-Application-Id": "yyEHqfmZxjAAOTYV5ZR46nZdjEQVUacaVl2xTNUC",
				"X-Parse-REST-API-Key": "LdvCxDS4kDNyc1y8BIgdFXtJXZSUHOPAqSKZES5o"
			},
			async: false,
			url: "https://api.parse.com/1/classes/Book",
			success: function (result) {
				var $list = $('<ul>');
				result['results'].forEach(function (book) {
					var isbn = book.isbn ? ', isbn: ' + book.isbn : '';
					$list.append($('<li>').text(book.title + ' by ' + book.author + isbn));
				});
				
				$(document.body).prepend($('<br>'));
				$(document.body).prepend($list);
				$(document.body).prepend($('<h1>').text('List of books: '));
			}
		});
		
		// Problem 3 - Create a book
		$('#create').submit(function (ev) {
			$.ajax({
				method: "POST",
				headers: {
					"X-Parse-Application-Id": "yyEHqfmZxjAAOTYV5ZR46nZdjEQVUacaVl2xTNUC",
					"X-Parse-REST-API-Key": "LdvCxDS4kDNyc1y8BIgdFXtJXZSUHOPAqSKZES5o"
				},
				async: false,
				url: "https://api.parse.com/1/classes/Book",
				data: JSON.stringify({
					title: $('#title').val(),
					author: $('#author').val(),
					isbn: $('#isbn').val()
				})
			});
		});
		
		// Problem 4 - Edit a book
		$('li').one('click', function (ev) {
			var bookName = $(ev.target).text().split(' by')[0],
				book = getObjIdByName('Book', bookName),
				bookId = book.objectId;
			
			var $form = $('<form>')
                .submit(function () {
				$.ajax({
					method: "PUT",
					headers: {
						"X-Parse-Application-Id": "yyEHqfmZxjAAOTYV5ZR46nZdjEQVUacaVl2xTNUC",
						"X-Parse-REST-API-Key": "LdvCxDS4kDNyc1y8BIgdFXtJXZSUHOPAqSKZES5o"
					},
					async: false,
					url: "https://api.parse.com/1/classes/Book/" + bookId,
					data: JSON.stringify({
						title: $('#title' + bookId).val(),
						author: $('#author' + bookId).val(),
						isbn: $('#isbn' + bookId).val()
					})
				});
			})
                .prepend($('<h3>').text($(ev.target).text()))

                // Problem 5 - Delete a book
                .append($('<input>').attr('type', 'button').val('Delete book').on('click', function () {
				$.ajax({
					method: "DELETE",
					headers: {
						"X-Parse-Application-Id": "yyEHqfmZxjAAOTYV5ZR46nZdjEQVUacaVl2xTNUC",
						"X-Parse-REST-API-Key": "LdvCxDS4kDNyc1y8BIgdFXtJXZSUHOPAqSKZES5o"
					},
					async: false,
					url: "https://api.parse.com/1/classes/Book/" + bookId
				});
				
				location.reload();
			}))
                .append($('<br>'))
                .attr('id', 'edit')
                .append($('<label>').attr('for', 'title' + bookId).text('Book title:'))
                .append($('<input>').attr('type', 'text').attr('id', 'title' + bookId).val(book.title))
                .append($('<br>'))
                .append($('<label>').attr('for', 'author' + bookId).text('Book author:'))
                .append($('<input>').attr('type', 'text').attr('id', 'author' + bookId).val(book.author))
                .append($('<br>'))
                .append($('<label>').attr('for', 'isbn' + bookId).text('Book isbn:'))
                .append($('<input>').attr('type', 'text').attr('id', 'isbn' + bookId).val(book.isbn))
                .append($('<br>'))
                .append($('<input>').attr('type', 'submit').attr('id', 'submit' + bookId));
			
			$(ev.target).html($form);
		});
	});
	
	function getObjIdByName(className, title) {
		var obj;
		$.ajax({
			method: "GET",
			headers: {
				"X-Parse-Application-Id": "yyEHqfmZxjAAOTYV5ZR46nZdjEQVUacaVl2xTNUC",
				"X-Parse-REST-API-Key": "LdvCxDS4kDNyc1y8BIgdFXtJXZSUHOPAqSKZES5o"
			},
			url: "https://api.parse.com/1/classes/" + className,
			async: false,
			success: function (result) {
				result['results'].forEach(function (item) {
					if (item.title === title) {
						obj = item;
					}
				});
			}
		});
		
		return obj;
	}
}());