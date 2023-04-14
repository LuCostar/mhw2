/* TODO: inserite il codice JavaScript necessario a completare il MHW! */

/*query selector, sali al section genitore, if diversa da eventcurrenttarget deseleziona*/
let answerlist = [null, null, null];

function resetQuiz(){
    for (let box of answers) {
        box.addEventListener('click', select);
        box.classList.remove('selected');
        box.classList.remove('unselected');
        const Check = box.querySelector(".checkbox");
            Check.src = "images/unchecked.png";
    }
    answerlist = [null, null, null];
    const resultbox = document.querySelector('#result');
    resultbox.classList.add('hidden');

}

function Makechoice(question, choice){
    if (question === "one") {
        answerlist[0] = choice;
    }
    else if (question === "two") {
        answerlist[1] = choice;
    }
    else if (question === "three") {
        answerlist[2] = choice;
    }
    console.log(answerlist);
}

function isQuizOver(){
    for(let answer of answerlist){
        if(answer === null){
            return false;
        }        
    }
    return true;
}

function calcResult(){
    if (answerlist[0] === answerlist[1] || answerlist[0] === answerlist[2]) {
        return answerlist[0];
    }
    else if (answerlist[1] === answerlist[2]) {
        return answerlist[1];
    }
    else {
        return answerlist[0];
    }
}

function showResult(result) {
    const htmltitle = document.querySelector('#title');
    const htmlcontents = document.querySelector('#contents');
    
    htmltitle.textContent = RESULTS_MAP[result].title;
    htmlcontents.textContent = RESULTS_MAP[result].contents;
    
    const resultbox = document.querySelector('#result');
    resultbox.classList.remove('hidden');
    for (let box of answers) {
        box.removeEventListener('click', select);
    }

}

function select(event) {
    const target = event.currentTarget;
    const check = target.querySelector(".checkbox");
    check.src = "images/checked.png";
    target.classList.add('selected');
    target.classList.remove('unselected');
    
    const parent = target.parentNode;
    const children = parent.querySelectorAll('div');
    for (let child of children) {
        if(child !== target) {
            child.classList.add('unselected');
            child.classList.remove('selected');
            const childCheck = child.querySelector(".checkbox");
            childCheck.src = "images/unchecked.png";
        }
    }
    Makechoice(target.dataset.questionId, target.dataset.choiceId);
    if (isQuizOver() === true) {
        const shownresult = calcResult();
        showResult(shownresult);

    }
}

const answers = document.querySelectorAll( '.choice-grid div');

for (let box of answers) {
    box.addEventListener('click', select);
}

const button = document.querySelector('#button');
button.addEventListener('click', resetQuiz);





