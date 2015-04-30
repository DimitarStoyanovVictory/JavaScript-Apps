$.get('tableTemplate.html', function (template) {
    var data = {
        "headers": [
            {"th": "Name"},
            {"th": "Job Title"},
            {"th": "Website"}
		],

        "rows": [
            {"name": "Garry Finch", "title": "Front-dnd Technician Lead", "site": "http://website.com"},
            {"name": "bob McFray", "title": "Photographer", "site": "http://google.com"},
            {"name": "Jenny O'Sullivan", "title": "LEGO Geek", "site": "http://stackoverflow.com"}
        ]
    };

    var tableHTML = Mustache.render(template, data);
    $('#wrapper').html(tableHTML);
});