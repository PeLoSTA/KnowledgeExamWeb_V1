/*jslint browser:false */
/*jslint esnext:true*/
/*jslint es6 */
/*global console, document, firebase */

/*global componentHandler */

/*eslint no-console: [ "error", { allow: [  "log", "warn", "error"]}] */

// retrieve HTML elements
var btnCreate = document.getElementById('btnCreate');
var btnDelete = document.getElementById('btnDelete');

var txtSubject = document.getElementById('txtSubject');
var txtDescription = document.getElementById('txtDescription');

var txtSubject2 = document.getElementById('txtSubject2');
var txtDescription2 = document.getElementById('txtDescription2');

// ======================================================================
// creation dialog

// var dialog = document.querySelector('dialog');
var dialog = document.getElementById('dialogCreation');
if (! dialog.showModal) {
    dialogPolyfill.registerDialog(dialog);
}

dialog.querySelector('.create').addEventListener('click', () => {

    var subject = txtSubject.value;
    var description = txtDescription.value;

    console.log("Subject: " + txtSubject.value);
    console.log("Description: " + txtDescription.value);

    addTodoSubject(subject, description);

    txtSubject.value = '';
    txtDescription.value = '';

    dialog.close();
});

dialog.querySelector('.cancel').addEventListener('click', () => {

    dialog.close();
});

// ======================================================================
// update dialog

var dialog2 = document.getElementById('dialogUpdate');
if (! dialog2.showModal) {
    dialogPolyfill.registerDialog(dialog2);
}

dialog2.querySelector('.modify').addEventListener('click', () => {

    console.log(">>>>>>>> modify: ");
    dialog2.close();
});

dialog2.querySelector('.delete').addEventListener('click', () => {

    console.log(">>>>>>>> delete: ");
    dialog2.close();
});

dialog2.querySelector('.cancel').addEventListener('click', () => {

    console.log(">>>>>>>> cancel: ");
    dialog2.close();
});

// ======================================================================
// update dialog


// HTML elements - ToDo list
var htmlTableSubjects = document.getElementById('tableSubjectsBody');

htmlTableSubjects.onclick = function(ev) {
    // ev.target <== td element
    // ev.target.parentElement <== tr
    var index = ev.target.parentElement.rowIndex;

    console.log("TR TR TR  Yeahhhhhhhh: " + index);

    txtSubject2.value = subjectsList[index].Name;
    txtDescription2.value = subjectsList[index].Description;

    dialog2.showModal();
}




// get a reference to the database service
var db = firebase.database();

// local state of current 'todo' items list
var subjectsList = [];


// ======================================================================
// connect event handler functions

// ======================================================================
// helper functions
db.ref('/subjects').on('value', (snapshot) => {

    subjectsList = [];

    snapshot.forEach(function (childSnapshot) {

        var obj = childSnapshot.val();

        // enter todo item into list
        console.log("Found: Name = " + obj.name + ", Description: " + obj.description);
        subjectsList.push({ "Name" : obj.name, "Description" : obj.description});
    });

    fillSubjectsList (subjectsList);
});

btnCreate.addEventListener('click', () => {

    'use strict';
    dialog.showModal(); /* Or dialog.show(); to show the dialog without a backdrop. */
});

btnDelete.addEventListener('click', () => {

    'use strict';

    dialog2.showModal();
});

// ======================================================================
// helper functions

function addTodoSubject(name, description) {

    'use strict';

    // build firebase reference string
    var refstring = 'subjects';
    var newItemRef = db.ref(refstring).push();
    newItemRef.set ({ "name" : name, "description" : description }, function (error) {
        if (error) {
            console.log("Subject could not be saved: " + error);

        } else {
            console.log("Subject saved successfully.");
        }
    });
}

function fillSubjectsList(subjectsList) {

    'use strict';

    htmlTableSubjects.innerHTML = '';

    for (var i = 0; i < subjectsList.length; i++) {

        // build list item string
        var linePrefix = (i < 10) ? '  ' : (i < 100) ? ' ' : '',
            line = linePrefix + (i+1) + ': ' + subjectsList[i].Name;

        var node = document.createElement('tr');          // create a <tr> node

        //        node.addEventListener('click', function () {
        //
        //            'use strict';
        //
        //            console.log("tr tr tr Yeahhhhhhhh");
        //        });

        var td1 = document.createElement('td');           // create first <td> node
        td1.setAttribute('class', 'mdl-data-table__cell--non-numeric');
        var td2 = document.createElement('td');           // create first <td> node
        td2.setAttribute('class', 'mdl-data-table__cell--non-numeric');

        var textnode1 = document.createTextNode(line);    // create first text node
        var textnode2 = document.createTextNode(subjectsList[i].Description);    // create second text node
        node.appendChild(td1);                            // append <td> to <tr>
        node.appendChild(td2);                            // append <td> to <tr>
        td1.appendChild(textnode1);                       // append text to <td>
        td2.appendChild(textnode2);                       // append text to <td>
        htmlTableSubjects.appendChild(node);              // append <tr> to <tbody>
    }

    componentHandler.upgradeDom();
}
