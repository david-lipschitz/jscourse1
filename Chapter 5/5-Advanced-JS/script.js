/*
var personProto = {
    calculateAge: function() {
        console.log(2016 - this.yearOfBirth);
    }
}

var john = Object.create(personProto);
john.name = 'John';
john.yearOfBirth = 1990;
john.job = 'teacher';

var jane = Object.create(personProto,
{
   name: { value: 'Jane'},
   yearOfBirth: {value: 1969 },
   job: {value: 'designer'} 
});

*/

// Primitives vs objects

/*
var a = 23;
var b = a;
a = 46;
console.log(a);
console.log(b);

var obj1 = {
    name: 'John',
    age: 26
};

var obj2 = obj1; //we created a new reference that points to the first object (the same object in memory)
obj1.age =  30;
console.log(obj1.age);
console.log(obj2.age);

// functions
var age = 27;
var obj = {
    name: 'Jonas',
    city: 'Lisbon'
}

function change(a,b) {
    a = 30;
    b.city = 'San Francisco';
}

change(age, obj);

console.log(age);
console.log(obj.city);
*/

// passing functions as arguments
// because functions are also objects
/*
var years = [1990, 1965, 1937, 2005, 1998];

function arrayCalc(arr, fn) {
    var arrRes = []; //an empty array
    for (var ix = 0; ix < arr.length; ix++) {
        arrRes.push(fn(arr[ix]));
    }
    return arrRes;
}

//callback functions because they are functions that we pass and call later

function calculateAge(el) {
    return 2016 - el; //el for element
}

function isFullAge(el) {
    return el >= 18;
}

function maxHeartRate(el) {
    if (el >= 18 && el <= 81) {
        return Math.round(206.9 - (0.67 * el));
    }
    else {
        return -1;
    }
}

var ages = arrayCalc(years,calculateAge);
var fullAges = arrayCalc(ages, isFullAge);
var rates = arrayCalc(ages,maxHeartRate);

console.log(ages);
console.log(fullAges);
console.log(rates);

*/

// functions returning functions
// create a function that returns different interview questions

/*
function interviewQuestion(job) {
    if (job == 'designer') {
        return function(name) { //this function is an anonymous function because it doesn't have a name
            console.log(name + ',can you please explain what UX design is?');
        }
    } else if (job == 'teacher') {
        return function(name) {
            console.log('What subject do you teach, ' + name);
        }
    } else {
        return function(name) {
            console.log(' Hello ' + name + ',what do you do?');
        }
    }
}

// a First Class Function in JavaScript is an OBJECT

//product questions for teachers
var teacherQuestion = interviewQuestion('teacher');

teacherQuestion('John');
teacherQuestion('David');

interviewQuestion('teacher')('Fred'); //evaluated left to right do doesn't need a result

*/

// Lecture: IIFE: Immediately Involved Functions Expressions

/*
function game() {
    var score = Math.random() * 10;
    console.log(score >= 5);
}
game();
*/

// rather do this: an anonymous function: trick the parser into thinking the statement is an expression by putting into brackets (()); this creates data privacy; this is not to create a piece of code that we will reuse, but rather to hide something and get data privacy

/*
(
    function game() {
        var score = Math.random() * 10;
        console.log(score >= 5);
    }        
)();

(
    function game(goodLuck) {
        var score = Math.random() * 10;
        console.log(score >= 5 - goodLuck);
    }        
)(5);

*/

// Closures

// write a small function which returns a function that calculates how many years we have until retirement - an inner function always has access to the variables of its outer function, even after the outer function has returned
// we have a generic function which we can use to create more specific functions

/*function retirement(retirementAge) {
    var a = ' years left until retirement.';
    return function(yearOfBirth) { //no name
        var age = 2016 - yearOfBirth;
        console.log((retirementAge - age) + a);
    }
}

var retirementUS = retirement(66);
var retirementGermany = retirement(65);
var retirementIceland = retirement(67);

retirementUS(1990);
retirement(66)(1990);
retirementUS(1980);
retirementGermany(1980);
retirementIceland(1980);
*/

//Test "Closure" (single function (inside function)) knowledge

/*
function interviewQuestion(job) {
    var description;
    if (job === 'designer') {
        description = ', can you please explain what UX design is?';
    } else if (job === 'teacher') {
        description = ', what subject do you teach?';
    } else {
        description = ': Hello. What do you do?'
    }
    return function(name) {
        console.log(name + description);
    }
}

// a First Class Function in JavaScript is an OBJECT

//product questions for teachers
var teacherQuestion = interviewQuestion('teacher');
var designerQuestion = interviewQuestion('designer');
var otherQuestion = interviewQuestion('tester');

teacherQuestion('John');
teacherQuestion('David');
designerQuestion('Peter');
otherQuestion('Fred');
*/

// Lecture on Bind, Call and Apply Methods
// Functions are a special type of object
//  so functions get methods from the Function Constructor function

/*
var john = {
    name: 'John',
    age: 26,
    job: 'teacher',
    presentation: function(style,timeOfDay) {
        if (style === 'formal') {
            console.log('Good ' + timeOfDay + ', Ladies and gentlemen! I\'m ' + this.name + ', I\'m a ' + this.job + ' and I\'m ' + this.age + ' years old.');
        } else if (style === 'friendly') {
            console.log('Hey! What\'s up? I\'m ' + this.name + ', I\'m a ' + this.job + ' and I\'m ' + this.age + ' years old. Have a nice ' + timeOfDay + '.');
            
        }
    }
}

var emily = {
    name: 'Emily',
    age: 35,
    job: 'designer'
    //use the call method to call presentation in john
};

john.presentation('formal','morning');

john.presentation.call(emily,'friendly','afternoon'); //method borrowing with the first parameter being the "this" variable

john.presentation.apply(emily, ['friendly','afternoon']); //although the function isn't expecting an array, this still works

// bind allows you to create a function with preset arguments

var johnFriendly = john.presentation.bind(john, 'friendly');  //only the first parameter has been set besides the "this" parameter

johnFriendly('evening'); //currying is when we create a function based on another function with some present parameters

var emilyFormal = john.presentation.bind(emily, 'formal');
emilyFormal('afternoon');

// and what about two parameters in use where we can only pass one parameter -> use "bind"

var years = [1990, 1965, 1937, 2005, 1998];

function arrayCalc(arr, fn) {
    var arrRes = []; //an empty array
    for (var ix = 0; ix < arr.length; ix++) {
        arrRes.push(fn(arr[ix]));
    }
    return arrRes;
}

function calculateAge(el) {
    return 2016 - el;
}

function isFullAge(limit, el) {
    return el >= limit;
}

var ages = arrayCalc(years, calculateAge);
var fullJapan = arrayCalc(ages, isFullAge.bind(this, 20));
console.log(ages);
console.log(fullJapan);

*/

//IIFE format - and then put all the other code inside it
/*(function() {

})();*/


// Coding Challenge 4

// A quiz game that runs in the console

// build the function constructor (an object)

(function() {

function Question(question, answers, correctAnswer) {
    this.question = question;
    this.answers = answers;
    this.correctAnswer = correctAnswer;
}

Question.prototype.askQuestion = function() {    
    console.log(this.question);
    console.log('Possible Answers');
    for (var ix=0; ix<this.answers.length; ix++) {
        console.log('Answer '+ix+': '+this.answers[ix]);
    }
}

Question.prototype.checkAnswer = function() {
    return this.correctAnswer;
}

// "new" creates a new empty object
question1 = new Question('Do you like JS?',['yes','no'],0);
question2 = new Question('What is the name of this course\'s teacher?',['John','Michael','Jonas'],2);
question3 = new Question('What best describes coding?',['Hard','Fun','Boring','Tedious'],1);

var questionArray = [question1,question2,question3];

function AskQuestions() {
    var endTheLoop,questionNumber,answer,correctCount, totalCount, firstTime;
    correctCount = 0;
    totalCount = 0;
    firstTime = true;
    console.clear();
    while (true) {
        if (!firstTime) {
            console.log('\nYou have ' + correctCount + ' out of ' +totalCount+ ' answers correct.');
        }
        firstTime = false;
        questionNumber = Math.floor(Math.random() * Question.length);
        questionArray[questionNumber].askQuestion();
        answer = prompt('Enter your answer (as a number). Type exit to end the questions.');
        if (answer='' || answer==null || answer.toUpperCase() == 'EXIT') {
            break;
        }
        totalCount++;
        if (answer == questionArray[questionNumber].checkAnswer()) {
            console.log('Correct answer');
            correctCount++;
        } else {
            console.log('Wrong answer');
        }
    }
}

AskQuestions();

})();