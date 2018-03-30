/*jslint browser:false */
/*jslint esnext:true*/
/*jslint es6 */
/*global console, document, firebase */

/*global componentHandler */

/*eslint no-console: [ "error", { allow: [  "log", "warn", "error"] } ] */

// retrieve HTML elements
var btnList = document.getElementById('btnList');
var btnCreate = document.getElementById('btnCreate');
var btnDelete = document.getElementById('btnDelete');

// HTML elements - ToDo list
var htmlListSubjects = document.getElementById('listSubjects');
var htmlTableSubjects = document.getElementById('tableSubjectsBody');

// get a reference to the database service
var db = firebase.database();

// local state of current 'todo' items list
var subjectsList = [];

// ======================================================================
// connect event handler functions

// https://github.com/google/material-design-lite/issues/1210

// http://www.codexpedia.com/javascript/javascript-add-on-click-event-on-table-rows/

var rows = htmlTableSubjects.getElementsByTagName("tr");

for (var i = 0; i < rows.length; i++) {
    rows[i].onclick = function (row)  {
        console.log("value >> ", i);
    }(rows[i]);
}


//for (var i = 0; i < checkboxes.length; i++) {
//    checkboxes[i].addEventListener(type, listener, useCapture);
//}

function onRowClick(tableId, callback) {
    var table = document.getElementById(tableId),
        rows = table.getElementsByTagName("tr"),
        i;
    for (i = 0; i < rows.length; i++) {
        table.rows[i].onclick = function (row) {
            return function () {
                callback(row);
            };
        }(table.rows[i]);
    }
}

onRowClick("tableSubjects", function (row){
    var value = row.getElementsByTagName("td")[0].innerHTML;
    //document.getElementById('click-response').innerHTML = value + " clicked!";
    console.log("value>>", value);
});


// ======================================================================
// connect event handler functions

btnList.addEventListener('click', function () {

    'use strict';

    console.log("Yeahhhhhhhh");
    // readSubjectsList();
    readSubjectsList2();

});

btnCreate.addEventListener('click', function () {

    'use strict';

    console.log("Ohhhh");
    addToDoSubjects ("Mathe");

});

btnDelete.addEventListener('click', function () {

    'use strict';

    console.warn("Jou ?!?!?!");
});

// ======================================================================
// helper functions

function addToDoSubjects(name) {

    'use strict';

    // build firebase reference string
    var refstring = 'subjects';
    var newItemRef = db.ref(refstring).push();
    newItemRef.set ({ "name" : name }, function (error) {
        if (error) {
            console.log("Subject could not be saved: " + error);

        } else {
            console.log("Subject saved successfully.");
        }
    });
}

function readSubjectsList() {

    'use strict';
    subjectsList = [];

    var refstring = '/subjects';
    db.ref(refstring).once('value').then(function (snapshot) {

        snapshot.forEach(function (childSnapshot) {

            var obj = childSnapshot.val();

            // enter todo item into list
            console.log("Found " + obj.name);
            subjectsList.push(obj.name);
        });

        // list of ToDo items updated, fire 'display list' event
        // var event = new CustomEvent(FirebaseDataEvent, { detail: kind });
        // window.dispatchEvent(event);

        htmlListSubjects.innerHTML = '';

        for (var i = 0; i < subjectsList.length; i++) {

            // build list item string
            var linePrefix = (i < 10) ? '  ' : (i < 100) ? ' ' : '',
                line = linePrefix + (i+1) + ': ' + subjectsList[i];

            // add a 'material design lite' node to a list dynamically
            var node = document.createElement('li');         // create a <li> node
            node.setAttribute('class', 'mdl-list__item');    // set an attribute

            var span = document.createElement('span');       // create a <span> node
            span.setAttribute('class', 'mdl-list__item-primary-content');

            var textnode = document.createTextNode(line);    // create a text node
            node.appendChild(span);                          // append <span> to <li>
            span.appendChild(textnode);                      // append text to <span>
            htmlListSubjects.appendChild(node);              // append <li> to <ul>
        }

        componentHandler.upgradeDom();
    });
}

function readSubjectsList2() {

    'use strict';
    subjectsList = [];

    var refstring = '/subjects';
    db.ref(refstring).once('value').then(function (snapshot) {

        snapshot.forEach(function (childSnapshot) {

            var obj = childSnapshot.val();

            // enter todo item into list
            console.log("Found " + obj.name);
            subjectsList.push(obj.name);
        });

        // list of ToDo items updated, fire 'display list' event
        // var event = new CustomEvent(FirebaseDataEvent, { detail: kind });
        // window.dispatchEvent(event);

        htmlTableSubjects.innerHTML = '';

        //        <tr>
        //            <td class="mdl-data-table__cell--non-numeric">C++</td>
        //            <td class="mdl-data-table__cell--non-numeric">Beyond C</td>
        //        </tr>

        for (var i = 0; i < subjectsList.length; i++) {

            // build list item string
            var linePrefix = (i < 10) ? '  ' : (i < 100) ? ' ' : '',
                line = linePrefix + (i+1) + ': ' + subjectsList[i];

            // add a 'material design lite' node to a table dynamically
            var node = document.createElement('tr');         // create a <tr> node
            //            node.setAttribute('class', 'mdl-list__item');    // set an attribute

            var td1 = document.createElement('td');       // create first <td> node
            td1.setAttribute('class', 'mdl-data-table__cell--non-numeric');
            var td2 = document.createElement('td');       // create first <td> node
            td2.setAttribute('class', 'mdl-data-table__cell--non-numeric');

            var textnode1 = document.createTextNode(line);    // create first text node
            var textnode2 = document.createTextNode('bla blubber bla');    // create second text node
            node.appendChild(td1);                            // append <td> to <tr>
            node.appendChild(td2);                            // append <td> to <tr>
            td1.appendChild(textnode1);                       // append text to <td>
            td2.appendChild(textnode2);                       // append text to <td>
            htmlTableSubjects.appendChild(node);              // append <tr> to <tbody>
        }

        componentHandler.upgradeDom();
    });
}
