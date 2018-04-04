/*jslint browser:false */
/*jslint esnext:true*/
/*jslint es6 */
/*global console, document, firebase */

/*global componentHandler */

/*eslint no-console: [ "error", { allow: [  "log", "warn", "error"]}] */

// retrieve HTML elements
var btnListQuestions = document.getElementById('btnListQuestions');

// list of all questions
var questionsList = [];


// ======================================================================
// creation dialog


// ======================================================================
// question dialog

btnListQuestions.addEventListener('click', () => {

    'use strict';

    console.log("Frage: "   );
    readQuestionsList();
});

// ======================================================================

// get a reference to the database service
var db = firebase.database();


// ======================================================================
// connect event handler functions


function readQuestionsList() {

    'use strict';
    questionsList = [];

    var refstring = '/questions';
    db.ref(refstring).once('value').then(function (snapshot) {

        snapshot.forEach(function (childSnapshot) {

            console.log('----------------------------------------------------');

            let obj = childSnapshot.val();
            let numAnswers = obj['num-answers'];
            let numCorrectAnswers = obj['num-correct-answers'];
            let question = obj['question'];

            console.log('Question:          ' + question);
            console.log('  NumAnswers:        ' + numAnswers);
            console.log('  NumCorrectAnswers: ' + numCorrectAnswers);

            let answers = obj['answers'];
            let parentKey = Object.keys(answers);
            let value = answers[parentKey[0]];

            let childKeys = Object.keys(value);
            for (var k = 0; k < childKeys.length; k++) {

                let key = childKeys[k];
                let answer = value[key];
                console.log('    Answer: ' + answer);
            }

            let correctAnswers = obj['correct-answers'];
            parentKey = Object.keys(correctAnswers);
            value = correctAnswers[parentKey[0]];

            childKeys = Object.keys(value);
            for (var j = 0; j < childKeys.length; j++) {

                let key = childKeys[j];
                let answer = value[key];
                console.log('    Correct Answer: ' + answer);
            }
        });

        // list of ToDo items updated, fire 'display list' event
        // var event = new CustomEvent(FirebaseDataEvent, { detail: kind });
        // window.dispatchEvent(event);

        //        htmlListSubjects.innerHTML = '';
        //
        //        for (var i = 0; i < subjectsList.length; i++) {
        //
        //            // build list item string
        //            var linePrefix = (i < 10) ? '  ' : (i < 100) ? ' ' : '',
        //                line = linePrefix + (i+1) + ': ' + subjectsList[i];
        //
        //            // add a 'material design lite' node to a list dynamically
        //            var node = document.createElement('li');         // create a <li> node
        //            node.setAttribute('class', 'mdl-list__item');    // set an attribute
        //
        //            var span = document.createElement('span');       // create a <span> node
        //            span.setAttribute('class', 'mdl-list__item-primary-content');
        //
        //            var textnode = document.createTextNode(line);    // create a text node
        //            node.appendChild(span);                          // append <span> to <li>
        //            span.appendChild(textnode);                      // append text to <span>
        //            htmlListSubjects.appendChild(node);              // append <li> to <ul>
        //        }
        //
        //        componentHandler.upgradeDom();
    });
}









// ======================================================================


// RESTE

function addQuestion() {

    'use strict';

    var refQuestion = db.ref('questions').push();

    console.log("Frage: " + textareaQuestion.value);
    var question = textareaQuestion.value;

    var childrenAnswers = divAnchorAnswers.getElementsByTagName ('textarea');
    refQuestion.set ({ "question" : question, "num-answers" : childrenAnswers.length });

    var refAnswers = refQuestion.child('answers').push();
    for (var i = 0; i < childrenAnswers.length; i++) {
        refAnswers.child('answer' + (i+1)).set(childrenAnswers[i].value);
    }

    var childrenCorrectAnswers = divCorrectAnswers.getElementsByClassName ('mdl-checkbox');
    var refCorrectAnswers = refQuestion.child('correct-answers').push();

    var numCorrectAnswers = 0;
    for (var i = 0; i < childrenCorrectAnswers.length; i++) {

        var label = childrenCorrectAnswers[i];
        var classAttributes = label.getAttribute("class");

        var result = classAttributes.includes('is-checked');
        if (result === true) {
            numCorrectAnswers ++;
            refCorrectAnswers.child('answer' + (i+1)).set(true);
        }
    }

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
