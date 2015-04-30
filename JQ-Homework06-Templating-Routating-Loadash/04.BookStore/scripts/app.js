var books = [{"book":"The Grapes of Wrath","author":"John Steinbeck","price":"34,24","language":"French"},
        {"book":"The Great Gatsby","author":"F. Scott Fitzgerald","price":"39,26","language":"English"},
        {"book":"Nineteen Eighty-Four","author":"George Orwell","price":"15,39","language":"English"},
        {"book":"Ulysses","author":"James Joyce","price":"23,26","language":"German"},
        {"book":"Lolita","author":"Vladimir Nabokov","price":"14,19","language":"German"},
        {"book":"Catch-22","author":"Joseph Heller","price":"47,89","language":"German"},
        {"book":"The Catcher in the Rye","author":"J. D. Salinger","price":"25,16","language":"English"},
        {"book":"Beloved","author":"Toni Morrison","price":"48,61","language":"French"},
        {"book":"Of Mice and Men","author":"John Steinbeck","price":"29,81","language":"Bulgarian"},
        {"book":"Animal Farm","author":"George Orwell","price":"38,42","language":"English"},
        {"book":"Finnegans Wake","author":"James Joyce","price":"29,59","language":"English"},
        {"book":"The Grapes of Wrath","author":"John Steinbeck","price":"42,94","language":"English"}];

var selector = $('#wrapper');

selector.append('<p>' + '•	Group all books by language and sort them by author (if two books have the same author, sort by price) -------------------->' + '</p>');

var groupOfBooksSorted =
    _.chain(books)
    .sortBy(function (book) {
        return [book.author, book.price].join("_");
    })
    .groupBy('language')
    .value();

console.log(groupOfBooksSorted);
selector.append('<p>' + JSON.stringify(groupOfBooksSorted) + '</p>');

console.log('////////////////////');
////////////////////

selector.append('<p>' + '•	Get the average book price for each author -------------------->' + '</p>');

var authors =_.groupBy(books, 'author');
for (var key in authors) {
    var authorBooks = authors[key];
    var allBooksTotalPrice = 0;
    authorBooks.forEach(function (book) {
         allBooksTotalPrice += parseFloat(book.price.replace(',', '.'));
    });

    var averagePrice = allBooksTotalPrice / authorBooks.length;
    selector.append('<p>' + key + ': ' + averagePrice + '</p>');
    console.log(key + ': ' + averagePrice);
}

console.log('////////////////////');
////////////////////

selector.append('<p>' + '•	Get all books in English or German, with price below 30.00, and group them by author -------------------->' + '</p>');
var germanAndEnglishBooks =_.filter(books, function (book) {
    return (book.language == 'English' || book.language == 'German')
        && parseFloat(book.price.replace(',', '.')) < 30;
});
selector.append('<p>' + JSON.stringify((_.groupBy(germanAndEnglishBooks, 'author'))) + '</p>');
console.log(_.groupBy(germanAndEnglishBooks, 'author'));
