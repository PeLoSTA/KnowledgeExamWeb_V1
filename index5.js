/*jslint browser:false */
/*jslint esnext:true*/
/*jslint es6 */
/*global console, document, firebase */

/*global componentHandler */

/*eslint no-console: [ "error", { allow: [  "log", "warn", "error"]}] */

// retrieve HTML elements
var btnEnterQuestion = document.getElementById('btnEnterQuestion');

var listItem2 = document.getElementById('list-num-answers-2');
var listItem3 = document.getElementById('list-num-answers-3');
var listItem4 = document.getElementById('list-num-answers-4');
var listItem5 = document.getElementById('list-num-answers-5');
var listItem6 = document.getElementById('list-num-answers-6');
var listItem7 = document.getElementById('list-num-answers-7');
var listItem8 = document.getElementById('list-num-answers-8');
var listItem9 = document.getElementById('list-num-answers-9');

var divAnchorAnswers = document.getElementById('anchorAnswers');



listItem2.addEventListener('click', () => {

    'use strict';
    createAnswersList(2);
});

listItem3.addEventListener('click', () => {

    'use strict';
    createAnswersList(3);
});

listItem4.addEventListener('click', () => {

    'use strict';
    createAnswersList(4);
});

listItem5.addEventListener('click', () => {

    'use strict';
    createAnswersList(5);
});

listItem6.addEventListener('click', () => {

    'use strict';
    createAnswersList(6);
});

listItem7.addEventListener('click', () => {

    'use strict';
    createAnswersList(7);
});

listItem8.addEventListener('click', () => {

    'use strict';
    createAnswersList(8);
});

listItem9.addEventListener('click', () => {

    'use strict';
    createAnswersList(9);
});

// ======================================================================
// ======================================================================
// creation dialog

// var dialog = document.querySelector('dialog');
var dialog = document.getElementById('dialogQuestion');

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
// question dialog

btnEnterQuestion.addEventListener('click', () => {

    'use strict';

    dialog.showModal();
});


// ======================================================================

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

function createAnswersList(number) {

    'use strict';

    divAnchorAnswers.innerHTML = '';

    for (var i = 0; i < number; i++) {

        var divNode = document.createElement('div');              // create outer <div> node
        divNode.setAttribute('class', 'mdl-textfield mdl-js-textfield');

        var textareaNode = document.createElement('textarea');    // create inner <textarea> node
        textareaNode.setAttribute('class', 'mdl-textfield__input');
        textareaNode.setAttribute('type', 'text');
        textareaNode.setAttribute('rows', '1');
        textareaNode.setAttribute('id', 'answer' + (i+1));

        var labelNode = document.createElement('label');          // create inner <label> node
        labelNode.setAttribute('class', 'mdl-textfield__label');
        labelNode.setAttribute('for', 'answer' + (i+1));

        var textnode = document.createTextNode('...');    // create inner text node
        labelNode.appendChild(textnode);                  // append text to <label>

        divNode.appendChild(textareaNode);                // append <textarea> to <div>
        divNode.appendChild(labelNode);                   // append <label> to <div>
        divAnchorAnswers.appendChild(divNode);            // append <div> to outer <div> anchor node
    }

    componentHandler.upgradeDom();
}
