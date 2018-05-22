// Lecture : Let and const

//ES5
/*var name5 = 'Jane Smith';
var age5 = 23;
name5 = 'Jane Miller';
console.log(name5);

//ES6
const name6 = 'Jane Smith';
let age6 = 23;
name6 = 'Jane Miller';
console.log(name6);*/

//function scoped in ES5 vs block scoped in ES6

//ES5
/*function driversLicense5(passedTest) {
    if (passedTest) {
        var firstName = 'John';
        var yearOfBirth = 1990;

        console.log(firstName+', born in '+yearOfBirth+', is now officially allowed to drive a car.'); // this works
    }
    console.log(firstName+', born in '+yearOfBirth+', is now officially allowed to drive a car.'); // this also works

}

driversLicense5(true);

//ES6
function driversLicense6(passedTest) {
    if (passedTest) {
        let firstName = 'John';
        const yearOfBirth = 1990;

        console.log(firstName+', born in '+yearOfBirth+', is now officially allowed to drive a car.'); // this works
    }
    //console.log(firstName+', born in '+yearOfBirth+', is now officially allowed to drive a car.'); // this does not work, because these variables are outside the BLOCK eg {}
    
}

driversLicense6(true);

let i = 23;
for (let i=0;i<5;i++) {
    console.log(i);
}
console.log(i);
*/

/////////////////////////////////
// Lecture: Blocks and IIFEs

/*
// ES6
{
    const a = 1;
    let b = 2;
    var c = 3;
}

//console.log(a + b);
console.log(c);


// ES5
(function() {
    var c = 3;
})();

//console.log(c);
*/




/////////////////////////////////
// Lecture: Strings

/*
let firstName = 'John';
let lastName = 'Smith';
const yearOfBirth = 1990;

function calcAge(year) {
    return 2016 - year;
}

// ES5
console.log('This is ' + firstName + ' ' + lastName + '. He was born in ' + yearOfBirth + '. Today, he is ' + calcAge(yearOfBirth) + ' years old.');

// ES6
console.log(`This is ${firstName} ${lastName}. He was born in ${yearOfBirth}. Today, he is ${calcAge(yearOfBirth)} years old.`);


const n = `${firstName} ${lastName}`;
console.log(n.startsWith('j'));
console.log(n.endsWith('Sm'));
console.log(n.includes('oh'));
console.log(`${firstName} `.repeat(5));
*/




/////////////////////////////////
// Lecture: Arrow functions

/*
const years = [1990, 1965, 1982, 1937];

// ES5
var ages5 = years.map(function(el) {
    return 2016 - el;
});
console.log(ages5);


// ES6
let ages6 = years.map(el => 2016 - el);
console.log(ages6);

ages6 = years.map((el, index) => `Age element ${index + 1}: ${2016 - el}.`);
console.log(ages6);

ages6 = years.map((el, index) => {
    const now = new Date().getFullYear();
    const age = now - el;
    return `Age element ${index + 1}: ${age}.`
});
console.log(ages6);
*/




/////////////////////////////////
// Lecture: Arrow functions 2

/*
// ES5
var box5 = {
    color: 'green',
    position: 1,
    clickMe: function() {
       
       var self = this;
       document.querySelector('.green').addEventListener('click', function() {
            var str = 'This is box number ' + self.position + ' and it is ' + self.color;
            alert(str); // because this isn't available in this inside callback function, so we need the self declaration
        });
    }
}
//box5.clickMe();


// ES6 - we don't need to use "this."
const box6 = {
    color: 'green',
    position: 1,
    clickMe: function() {
        document.querySelector('.green').addEventListener('click', () => {
            var str = 'This is box number ' + this.position + ' and it is ' + this.color;
            alert(str);
        });
    }
}
box6.clickMe();


const box66 = {
    color: 'green',
    position: 1,
    clickMe: () => //be careful of this because this loses its "this"
        document.querySelector('.green').addEventListener('click', () => {
            var str = 'This is box number ' + this.position + ' and it is ' + this.color;
            alert(str);
        });
    }
}
box66.clickMe();


//define an object
function Person(name) {
    this.name = name;
}

// ES5
Person.prototype.myFriends5 = function(friends) {
    
    var arr = friends.map(function(el) { // rememer that .map is like .forEach except that it automatically creates a list
       return this.name + ' is friends with ' + el; 
    }.bind(this)); // bind is another way of transferring the variable inside and we can effectively set the inside this to the outside this; the reason for this is because of the use of function(el) which means that this inside this function, normally (without the bind) points to the global scope and therefore this.name is undefined.
    
    console.log(arr);
}

var friends = ['Bob', 'Jane', 'Mark'];
new Person('John').myFriends5(friends);


// ES6
Person.prototype.myFriends6 = function(friends) {

    var arr = friends.map(el => `${this.name} is friends with ${el}`);

    console.log(arr);
}

new Person('Mike').myFriends6(friends);
*/




/////////////////////////////////
// Lecture: Destructuring

/*
// ES5
var john = ['John', 26];
//var name = john[0];
//var age = john[1];


// ES6
const [name, age] = ['John', 26]; // this creates two constants and sets name to John and age to 26, using Destructuring
console.log(name);
console.log(age);

// and the same works for objects

const obj = {
    firstName: 'John',
    lastName: 'Smith'
};

const {firstName, lastName} = obj; // the fields must match the objects field names; and these two constants store the data out of the objects
console.log(firstName);
console.log(lastName);

// if you want the variables to have different names to the object, then ...
const {firstName: a, lastName: b} = obj;
console.log(a);
console.log(b);



function calcAgeRetirement(year) {
    const age = new Date().getFullYear() - year;
    return [age, 65 - age]; // returning an array
}


const [age2, retirement] = calcAgeRetirement(1990); // destructuring stores the age and retirement in two new variables
console.log(age2);
console.log(retirement);
*/




/////////////////////////////////
// Lecture: Arrays

/*
const boxes = document.querySelectorAll('.box');

//ES5
var boxesArr5 = Array.prototype.slice.call(boxes);
boxesArr5.forEach(function(cur) {
    cur.style.backgroundColor = 'dodgerblue';
});

//ES6
const boxesArr6 = Array.from(boxes);
Array.from(boxes).forEach(cur => cur.style.backgroundColor = 'dodgerblue');


//ES5
for(var i = 0; i < boxesArr5.length; i++) {
    
    if(boxesArr5[i].className === 'box blue') {
        continue;
    }
    
    boxesArr5[i].textContent = 'I changed to blue!';
    
}


//ES6
for (const cur of boxesArr6) {
    if (cur.className.includes('blue')) {
        continue;
    }
    cur.textContent = 'I changed to blue!';
}




//ES5
var ages = [12, 17, 8, 21, 14, 11];

var full = ages.map(function(cur) {
    return cur >= 18;
});
console.log(full);

console.log(full.indexOf(true));
console.log(ages[full.indexOf(true)]);


//ES6
console.log(ages.findIndex(cur => cur >= 18));
console.log(ages.find(cur => cur >= 18));
*/




/////////////////////////////////
// Lecture: Spread operator

/*
function addFourAges (a, b, c, d) {
    return a + b + c + d;
}

var sum1 = addFourAges(18, 30, 12, 21);
console.log(sum1);

//ES5
var ages = [18, 30, 12, 21];
var sum2 = addFourAges.apply(null, ages);
console.log(sum2);

//ES6 - use the SPREAD operator
const sum3 = addFourAges(...ages);
console.log(sum3);


const familySmith = ['John', 'Jane', 'Mark'];
const familyMiller = ['Mary', 'Bob', 'Ann'];
const bigFamily = [...familySmith, 'Lily', ...familyMiller];
console.log(bigFamily);

//an example with a node list which queryselectorall does
const h = document.querySelector('h1'); //this is a node
const boxes = document.querySelectorAll('.box'); // this is a node list
const all = [h, ...boxes]; //this puts everything in the same structure

//transform this node list into an array and then we can loop through it
// we use the forEach method on an array; color is the css property for colour names
Array.from(all).forEach(cur => cur.style.color = 'purple');
*/




/////////////////////////////////
// Lecture: Rest parameters, which are function parameters
//  DL Notes
//  Rest parameters allow us to pass and arbitrary number of arguments into a function
//  The Spread operator takes an array and transforms it into single values
//  The Rest parameters take single values and transform them into an array, when we call a function with single parameters

/*
//ES5
function isFullAge5() {
    //console.log(arguments); // arguments in object, not an array, so we need to transform it to an array with slice ...
    // arguments is a reserved word
    var argsArr = Array.prototype.slice.call(arguments);
    
    argsArr.forEach(function(cur) { // remember that function... is a callback function
        console.log((2016 - cur) >= 18);
    })
}


//isFullAge5(1990, 1999, 1965);
//isFullAge5(1990, 1999, 1965, 2016, 1987);


//ES6 - using the Spread Operator as well. The spread operator is ...
function isFullAge6(...years) {
    console.log(years);
    years.forEach(cur => console.log( (2016 - cur) >= 18));
}

//isFullAge6(1990, 1999, 1965, 2016, 1987);


//adding an argument:
//ES5
function isFullAge5(limit) {
    console.log(arguments);

    var argsArr = Array.prototype.slice.call(arguments, 1);

    argsArr.forEach(function(cur) {
        console.log((2016 - cur) >= limit);
    })
}


//isFullAge5(16, 1990, 1999, 1965);
//isFullAge5(1990, 1999, 1965, 2016, 1987);


//ES6 - the argument (age=16), can be easily added in ES6; ...years are the REST of the arguments
function isFullAge6(limit, ...years) {
    //console.log(arguments);
    years.forEach(cur => console.log( (2016 - cur) >= limit));
}

isFullAge6(16, 1990, 1999, 1965, 2016, 1987);

*/

// Lecture: Default parameters

/*
// ES5
//object definition
function SmithPerson(firstName, yearOfBirth, lastName, nationality) {

    lastName === undefined ? lastName = 'Smith' : lastName = lastName; //if the lastName is undefined, then set it to Smith, else use the lastName

    nationality === undefined ? nationality = 'American' : nationality = nationality;

    this.firstName = firstName;
    this.lastName = lastName;
    this.yearOfBirth = yearOfBirth;
    this.nationality = nationality;
}

//function constructor
var john = new SmithPerson('John', 1990); // so the last two parameters are undefined
console.log(john);
var emily = new SmithPerson('Emily', 1983, 'Diaz', 'Spanish');
console.log(emily);

// ES6 - we can define the default parameters in the object definition

function SmithPerson(firstName, yearOfBirth, lastName = 'Smith', nationality = 'American') {

    this.firstName = firstName;
    this.lastName = lastName;
    this.yearOfBirth = yearOfBirth;
    this.nationality = nationality;
}

//function constructor
var john = new SmithPerson('John', 1990); // so the last two parameters are undefined
console.log(john);
var emily = new SmithPerson('Emily', 1983, 'Diaz', 'Spanish');
console.log(emily);
*/

//MAPS: an entirely new data structure in ES6. It has nothing to do with Maps, like in Google Maps: set, has, delete, clear
// up to ES6 we had to use an Object for a Key Value Data Structure, but in ES6, we can use anything, not only a string, and we can even use functions and keys
// also called HashMAPS

//implement a simple quiz with a single question to show this

/*
const question = new Map(); // this creates a new empty map
question.set('question', 'What is the official name of the latest major JavaScript version?'); // key and value
question.set(1, 'ES5');
question.set(2, 'ES6');
question.set(3, 'ES2015');
question.set(4, 'ES7');
question.set('correct', 3);
question.set(true, 'Correct answer :D');
question.set(false, 'Wrong, please try again!');

//console.log(question);
console.log(question.get('question'));
//console.log(question.size); // not length like in arrays

//we can also add or remove rows

//if (question.has(4)) {
//    //question.delete(4);
//    console.log('Answer 4 is here');
//}

//question.clear(); //clear everything from our map

//AND we can loop through a MAP

//question.forEach((value, key) => console.log(`This is ${key}, and it's set to ${value}`));

//for (let key of question) {
//}

//to use the value, we need to use destructuring

for (let [key, value] of question.entries()) {
    //to use the value, we need to use destructuring
    //console.log(`This is ${key}, and it's set to ${value}`); // to display everything
    //so now onlyprint a value if the key is a value

    if (typeof(key) === 'number') { //check the type of a variable
        console.log(`Answer ${key}: ${value}`);
    }
}

const ans = parseInt(prompt('Write the correct answer'));

console.log ( question.get( ans === question.get('correct') ) );
*/

//CLASSES

//ES5 - a function expression or function declaration
/*var Person5 = function(name, yearOfBirth, job) {
    this.name = name;
    this.year = yearOfBirth;
    this.job = job;
}

Person5.prototype.calculateAge = function() {
    var age = new Date().getFullYear - 
}

*/

/////////////////////////////////
// CODING CHALLENGE

/*

Suppose that you're working in a small town administration, and you're in charge of two town elements:
1. Parks
2. Streets

It's a very small town, so right now there are only 3 parks and 4 streets. All parks and streets have a name and a build year.

At an end-of-year meeting, your boss wants a final report with the following:
1. Tree density of each park in the town (forumla: number of trees/park area)
2. Average age of each town's park (forumla: sum of all ages/number of parks)
3. The name of the park that has more than 1000 trees
4. Total and average length of the town's streets
5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal

All the report data should be printed to the console.

HINT: Use some of the ES6 features: classes, subclasses, template strings, default parameters, maps, arrow functions, destructuring, etc.

*/

class Element {
    constructor(elementName, buildYear) {
        this.elementName=elementName;
        this.buildYear=buildYear;
    }
    calculateAge() {  
        var age = new Date().getFullYear() - this.buildYear;
    }
}

class Park extends Element {
    constructor(elementName,buildYear,treeCount, parkArea) {
        super(elementName,buildYear);
        this.treeCount=treeCount;
        this.parkArea=parkArea;
    }

    treeDensity() {
        const density = this.treeCount / this.parkArea;
        //console.log(this.elementName);
        //console.log(density);
        console.log(`Park ${this.elementName} has a density of ${density}`);
    }
}

//var classifications = ['Tiny', 'Small', 'Normal', 'Big', 'Huge'];

class Street extends Element {
    constructor(elementName,buildYear,length,size = 3) {
        super(elementName,buildYear);
        this.length=length;
        this.size=size;
    }

    classifyStreet () { // because its a function
        const classification = new Map();
        classification.set(1, 'tiny');
        classification.set(2, 'small');
        classification.set(3, 'normal');
        classification.set(4, 'big');
        classification.set(5, 'huge');
        console.log(`${this.elementName}, built in ${this.buildYear}, is a ${classification.get(this.size)} street`);
    }
}

const parkList = [
    new Park ('Green Park',1800,25000,10000),
    new Park ('Hyde Park',1950,100,50),
    new Park ('Milnerton Park', 1900,2000,1000)
];

const streetList = [
    new Street ('Mimosa',1950,1000),
    new Street ('Graaf',1900,2000, 5),
    new Street ('N7', 1800, 50000, 5),
    new Street ('Jasmin',1960,200, 2)
];

function calc(arr) {
    //the remove reduce method reduces an array to a single value
    //so move through the array to accumulate a single value
    const sum = arr.reduce((prev, cur, index) => prev + cur, 0); //0 to start with our sum at zero; prev=0 at the beginning

    return [sum, sum / arr.length]; //return an array
}

function reportParks(p) {

    console.log('----PARKS REPORT-----');

    // Density - we want to call each of these in the array
    p.forEach(element => element.treeDensity());

    // Average Age - use Destructuring to fetch the elements of the arry

    const ages = p.map(element => new Date().getFullYear() - element.buildYear);
    const [totalAge, aveAge] = calc(ages);
    console.log(`Our ${p.length} parks have an average of ${aveAge} years`);

    // Which park has more than 1000 trees
    const ix = p.map(element => element.treeCount).findIndex(element => element >= 1000);
    console.log(`${p[ix].elementName} has more than 1000 trees.`);
}

function reportStreets(s) {

    console.log('----STREET REPORT-----');

    //total and average length of the towns streets
    const [totalLength, avgLength] = calc(s.map(element => element.length));
    console.log(`Our ${s.length} streets have a total length of ${totalLength} m, with an average length of ${avgLength} km`);

    //classify sizes
    s.forEach(element => element.classifyStreet());
}

reportParks(parkList);
reportStreets(streetList);
