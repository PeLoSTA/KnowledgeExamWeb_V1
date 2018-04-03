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

var labelNumAnswers = document.getElementById('labelNumAnswers2');

var numAnswers = 2;
createAnswersList(numAnswers, divAnchorAnswers);
createAnswersToCheckboxesList(numAnswers, divCorrectAnswers);

listItem2.addEventListener('click', () => {

    'use strict';
    if (numAnswers != 2) {
        numAnswers = 2;
        updateDialogDisplay(numAnswers, labelNumAnswers, divAnchorAnswers, divCorrectAnswers);
    }
});

listItem3.addEventListener('click', () => {

    'use strict';
    if (numAnswers != 3) {
        numAnswers = 3;
        updateDialogDisplay(numAnswers, labelNumAnswers, divAnchorAnswers, divCorrectAnswers);
    }
});

listItem4.addEventListener('click', () => {

    'use strict';
    if (numAnswers != 4) {
        numAnswers = 4;
        updateDialogDisplay(numAnswers, labelNumAnswers, divAnchorAnswers, divCorrectAnswers);
    }
});

listItem5.addEventListener('click', () => {

    'use strict';
    if (numAnswers != 5) {
        numAnswers = 5;
        updateDialogDisplay(numAnswers, labelNumAnswers, divAnchorAnswers, divCorrectAnswers);
    }
});

listItem6.addEventListener('click', () => {

    'use strict';
    if (numAnswers != 6) {
        numAnswers = 6;
        updateDialogDisplay(numAnswers, labelNumAnswers, divAnchorAnswers, divCorrectAnswers);
    }
});

listItem7.addEventListener('click', () => {

    'use strict';
    if (numAnswers != 7) {
        numAnswers = 7;
        updateDialogDisplay(numAnswers, labelNumAnswers, divAnchorAnswers, divCorrectAnswers);
    }
});

// ======================================================================
// creation dialog

// var dialog = document.querySelector('dialog');
var dialog = document.getElementById('dialogQuestion');

if (! dialog.showModal) {
    dialogPolyfill.registerDialog(dialog);
}
else {
    console.log("No polyfill support necessary");
}

dialog.querySelector('.create').addEventListener('click', () => {

    var question = textareaQuestion.value;
    console.log("Question: " + textareaQuestion.value);

    // addTodoSubject(subject, description);

    addQuestion();
    dialog.close();
    clearDialog ();
});

dialog.querySelector('.cancel').addEventListener('click', () => {

    dialog.close();
});


function clearDialog() {

    'use strict';

    // clearing question text
    textareaQuestion.value = '';

    // clearing answers
    var childrenAnswers = divAnchorAnswers.getElementsByTagName ('textarea');
    for (var i = 0; i < childrenAnswers.length; i++) {
        childrenAnswers[i].value = '';
    }

    // unchecking checkboxes
    var childrenCorrectAnswers = divCorrectAnswers.getElementsByClassName ('mdl-checkbox');
    for (var i = 0; i < childrenCorrectAnswers.length; i++) {

        var label = childrenCorrectAnswers[i];
        label.MaterialCheckbox.uncheck();
    }
}

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

//function addQuestion() {
//
//    'use strict';
//
//    // build firebase reference string
//
//    // später ...muss erst die Infos einsammeln ...........
//
//
//
//    //    var refstring = 'questions';
//    //    var newItemRef = db.ref(refstring).push();
//    //    newItemRef.set ({ "name" : name, "description" : description }, function (error) {
//    //        if (error) {
//    //            console.log("Subject could not be saved: " + error);
//    //
//    //        } else {
//    //            console.log("Subject saved successfully.");
//    //        }
//    //    });
//
//    console.log("Frage: " + textareaQuestion.value);
//
//    var childrenAnswers = divAnchorAnswers.getElementsByTagName ('textarea');
//    for (var i = 0; i < childrenAnswers.length; i++) {
//        console.log("    Antwort: " + childrenAnswers[i].value);
//    }
//
//    var childrenCorrectAnswers = divCorrectAnswers.getElementsByClassName ('mdl-checkbox');
//
//    for (var i = 0; i < childrenCorrectAnswers.length; i++) {
//
//        var label = childrenCorrectAnswers[i];
//        var classAttributes = label.getAttribute("class");
//
//        var result = classAttributes.includes('is-checked');
//        console.log("    is-checked: " + result);
//    }
//}


function addQuestion() {

    'use strict';

    var refQuestion = db.ref('questions').push();

    console.log("Frage: " + textareaQuestion.value);
    var question = textareaQuestion.value;

    var childrenAnswers = divAnchorAnswers.getElementsByTagName ('textarea');

    // GENERELL: MIT ODER OHNE FEHLERBAHENDLAUNG ?!?!?!??!

    refQuestion.set ({ "question" : question, "num-answers" : childrenAnswers.length }, function (error) {
        if (error) {
            console.log("Question could not be saved: " + error);
        }
    });

    var refAnswers = refQuestion.child('answers').push();
    for (var i = 0; i < childrenAnswers.length; i++) {
        // console.log("    Antwort: " + childrenAnswers[i].value);
        refAnswers.child('answer' + (i+1)).set(childrenAnswers[i].value);
    }

    var childrenCorrectAnswers = divCorrectAnswers.getElementsByClassName ('mdl-checkbox');
    var refCorrectAnswers = refQuestion.child('correct-answers').push();

    var numCorrectAnswers = 0;

    for (var i = 0; i < childrenCorrectAnswers.length; i++) {

        var label = childrenCorrectAnswers[i];
        var classAttributes = label.getAttribute("class");

        var result = classAttributes.includes('is-checked');
        // console.log("    is-checked: " + result);

        if (result === true) {
            numCorrectAnswers ++;
            refCorrectAnswers.child('answer' + (i+1)).set(true);
        }
    }

//    refQuestion.set ({ "num-correct-answers" : numCorrectAnswers }, function (error) {
//        if (error) {
//            console.log("Question could not be saved: " + error);
//        }
//    });

    refQuestion.child('num-correct-answers').set(numCorrectAnswers);
}

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

function updateNumAnswersDisplay(number, label) {

    'use strict';

    label.innerHTML = '';
    var textnode = document.createTextNode('' + number);  // create new text node
    label.appendChild(textnode);  // insert text into <label> node
}

function updateDialogDisplay(numAnswers, labelNumAnswers, divAnchorAnswers, divCorrectAnswers) {

    'use strict';
    updateNumAnswersDisplay(numAnswers, labelNumAnswers);
    createAnswersList(numAnswers, divAnchorAnswers);
    createAnswersToCheckboxesList(numAnswers, divCorrectAnswers);
}
