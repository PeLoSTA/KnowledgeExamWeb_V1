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

var divAnchorAnswers = document.getElementById('anchorAnswers');
var divCorrectAnswers = document.getElementById('anchorCorrectAnswers');

var textareaQuestion = document.getElementById('textareaQuestion');

var numAnswers = 2;
createAnswersList(numAnswers, divAnchorAnswers);
createAnswersToCheckboxesList(numAnswers, divCorrectAnswers);

listItem2.addEventListener('click', () => {

    'use strict';
    numAnswers = 2;
    createAnswersList(numAnswers, divAnchorAnswers);
    createAnswersToCheckboxesList(numAnswers, divCorrectAnswers);
});

listItem3.addEventListener('click', () => {

    'use strict';
    numAnswers = 3;
    createAnswersList(numAnswers, divAnchorAnswers);
    createAnswersToCheckboxesList(numAnswers, divCorrectAnswers);
});

listItem4.addEventListener('click', () => {

    'use strict';
    numAnswers = 4;
    createAnswersList(numAnswers, divAnchorAnswers);
    createAnswersToCheckboxesList(numAnswers, divCorrectAnswers);
});

listItem5.addEventListener('click', () => {

    'use strict';
    numAnswers = 5;
    createAnswersList(numAnswers, divAnchorAnswers);
    createAnswersToCheckboxesList(numAnswers, divCorrectAnswers);
});

listItem6.addEventListener('click', () => {

    'use strict';
    numAnswers = 6;
    createAnswersList(numAnswers, divAnchorAnswers);
    createAnswersToCheckboxesList(numAnswers, divCorrectAnswers);
});

listItem7.addEventListener('click', () => {

    'use strict';
    numAnswers = 7;
    createAnswersList(numAnswers, divAnchorAnswers);
    createAnswersToCheckboxesList(numAnswers, divCorrectAnswers);
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

    var question = textareaQuestion.value;

    console.log("Question: " + textareaQuestion.value);

    // addTodoSubject(subject, description);

    textareaQuestion.value = '';

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
//db.ref('/subjects').on('value', (snapshot) => {
//
//    subjectsList = [];
//
//    snapshot.forEach(function (childSnapshot) {
//
//        var obj = childSnapshot.val();
//
//        // enter todo item into list
//        console.log("Found: Name = " + obj.name + ", Description: " + obj.description);
//        subjectsList.push({ "Name" : obj.name, "Description" : obj.description});
//    });
//
//    fillSubjectsList (subjectsList);
//});


// ======================================================================
// helper functions

//function addTodoSubject(name, description) {
//
//    'use strict';
//
//    // build firebase reference string
//    var refstring = 'subjects';
//    var newItemRef = db.ref(refstring).push();
//    newItemRef.set ({ "name" : name, "description" : description }, function (error) {
//        if (error) {
//            console.log("Subject could not be saved: " + error);
//
//        } else {
//            console.log("Subject saved successfully.");
//        }
//    });
//}

function createAnswersList(number, outerDiv) {

    'use strict';

    outerDiv.innerHTML = '';

    for (var i = 0; i < number; i++) {

        var divOuterNode = document.createElement('div');           // create outer <div> node

        var divInnerNode = document.createElement('div');           // create inner <div> node
        divInnerNode.setAttribute('class', 'mdl-textfield mdl-js-textfield');

        var textareaNode = document.createElement('textarea');      // create inner <textarea> node
        textareaNode.setAttribute('class', 'mdl-textfield__input');
        textareaNode.setAttribute('type', 'text');
        textareaNode.setAttribute('rows', '1');
        textareaNode.setAttribute('id', 'answer' + (i+1));

        var labelNode = document.createElement('label');            // create inner <label> node
        labelNode.setAttribute('class', 'mdl-textfield__label');
        labelNode.setAttribute('for', 'answer' + (i+1));

        var textnode = document.createTextNode('...');  // create inner text node
        labelNode.appendChild(textnode);                // append text to <label>

        divInnerNode.appendChild(textareaNode);  // append <textarea> to <div>
        divInnerNode.appendChild(labelNode);     // append <label> to <div>
        divOuterNode.appendChild(divInnerNode);  // append inner <div> to outer <div> node
        outerDiv.appendChild(divOuterNode);      // append outer <div> node to anchor <div> node
    }

    componentHandler.upgradeDom();
}


//<label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="iOS">
//    <input type="checkbox" id="iOS" class="mdl-checkbox__input" />
//    <span class="mdl-checkbox__label">iOS</span> <!-- Checkbox Label -->
//</label>

function createAnswersToCheckboxesList(number, outerDiv) {

    'use strict';

    outerDiv.innerHTML = '';

    for (var i = 0; i < number; i++) {

        var label = document.createElement('label');      // create <label> node
        label.setAttribute('class', 'mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect');
        label.setAttribute('for', 'for-id-' + (i+1));

        var input = document.createElement('input');      // create <input> node
        input.setAttribute('type', 'checkbox');
        input.setAttribute('id', 'for-id-' + (i+1));
        input.setAttribute('class', 'mdl-checkbox__input');

        var span = document.createElement('span');        // create <span> node
        span.setAttribute('class', 'mdl-checkbox__label');

        var textnode = document.createTextNode('Antwort ' + (i+1));  // create inner text node

        span.appendChild(textnode);     // append text to <span> node
        label.appendChild(input);       // append <input> to <label>
        label.appendChild(span);        // append <span> to <label>
        outerDiv.appendChild(label);    // append <label> to outer <div> node
    }

    componentHandler.upgradeDom();
}
