var students = [{"gender":"Male","firstName":"Joe","lastName":"Riley","age":22,"country":"Russia"},
    {"gender":"Female","firstName":"Lois","lastName":"Morgan","age":41,"country":"Bulgaria"},
    {"gender":"Male","firstName":"Roy","lastName":"Wood","age":33,"country":"Russia"},
    {"gender":"Female","firstName":"Diana","lastName":"Freeman","age":40,"country":"Argentina"},
    {"gender":"Female","firstName":"Bonnie","lastName":"Hunter","age":23,"country":"Bulgaria"},
    {"gender":"Male","firstName":"Joe","lastName":"Young","age":16,"country":"Bulgaria"},
    {"gender":"Female","firstName":"Kathryn","lastName":"Murray","age":22,"country":"Indonesia"},
    {"gender":"Male","firstName":"Dennis","lastName":"Woods","age":37,"country":"Bulgaria"},
    {"gender":"Male","firstName":"Billy","lastName":"Patterson","age":24,"country":"Bulgaria"},
    {"gender":"Male","firstName":"Willie","lastName":"Gray","age":42,"country":"China"},
    {"gender":"Male","firstName":"Justin","lastName":"Lawson","age":38,"country":"Bulgaria"},
    {"gender":"Male","firstName":"Ryan","lastName":"Foster","age":24,"country":"Indonesia"},
    {"gender":"Male","firstName":"Eugene","lastName":"Morris","age":37,"country":"Bulgaria"},
    {"gender":"Male","firstName":"Eugene","lastName":"Rivera","age":45,"country":"Philippines"},
    {"gender":"Female","firstName":"Kathleen","lastName":"Hunter","age":28,"country":"Bulgaria"}];

var selector = $('#wrapper');

selector.append('<p>' + 'Age 18-24 -------------------->' + '</p>');

    _.filter(students, function (student) {
        return student.age >= 18 && student.age <= 24;
    })
        .forEach(function (student) {
            selector.append('<p>' + JSON.stringify(student) + '</p>');
});

selector.append('<p>firstName > lastName --------------------></p>');

_.filter(students, function (student) {
    return (student.firstName).localeCompare(student.lastName) == -1;
})
    .forEach(function (student) {
        selector.append('<p>' + JSON.stringify(student) + '</p>');
    });

selector.append('<p>Bulgarians --------------------></p>');

_.filter(students, function (student) {
    return student.country == 'Bulgaria';
})
    .forEach(function (student) {
        selector.append('<p>' + student.firstName + ' ' + student.lastName + '</p>');
    });

selector.append('<p>Last Five --------------------></p>');

_.slice(students, students.length-5, students.length)
    .forEach(function (student) {
        selector.append('<p>' + JSON.stringify(student) + '</p>');
    });

selector.append('<p>First three Non-bulgarian Males --------------------></p>');

var nonBulgarianMales = _.filter(students, function (student) {
    return student.country != 'Bulgaria' && student.gender == 'Male';
});

_.slice(nonBulgarianMales, 0, 3)
    .forEach(function (student) {
        selector.append('<p>' + JSON.stringify(student) + '</p>');
    });