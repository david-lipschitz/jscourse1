// Lecture: variables
/*
var name = 'John';
console.log(name);

var lastName = 'Smith';
console.log(lastName);

var age = 26;
console.log(age);

var fullAge = true;
console.log(fullAge);
*/


// Lecture: variables 2
/*
var name = 'John';
var age = 26;

console.log(name + age);
console.log(age + age);

var job, isMarried;

console.log(job);

job = 'teacher';
isMarried = false;

console.log(name + ' is a ' + age + ' years old ' + job + '. Is he married? ' + isMarried  + '.');

age = 'thirty six';
job = 'driver';

console.log(name + ' is a ' + age + ' years old ' + job + '. Is he married? ' + isMarried  + '.');
str = name + ' is a ' + age + ' years old ' + job + '. Is he married? ' + isMarried  + '.'; 

var lastName = prompt('What is the last name?');
str = str + ' ' + lastName;
console.log(lastName);
alert(str);
*/





// Lecture : operators
/*var now = 2016;
var birthYear = now - 26;

birthYear = now - 26 * 2;

console.log(birthYear);



var ageJohn = 30;
var ageMark = 30;

ageJohn = ageMark = (3 + 5) * 4 - 6;
console.log(ageJohn);
console.log(ageMark);*/














//
// Lecture: if/else statements

/*var name = 'John';
var age = 26;
var isMarried = 'yes';

if (isMarried === 'yes') {
    console.log(name + ' is married!');
} else {
    console.log(name + ' will hopefully marry soon :)');
}*/


// a game
/*
var height1 = 180;
var height2 = 180;
var height3 = 180;
var age1 = 20;
var age2 = 20;
var age3 = 20;

var result1 = height1 + age1*5;
var result2 = height2 + age2*5;
var result3 = height3 + age3*5;

if (result1 === result2 && result2 === result3) {
    console.log('It\'s a draw draw of ' + result1);
}
else if ( result1 > result2 && result1 > result3) {
    console.log('Person1 wins with ' + result1);
}
else if (result2 > result1 && result2 > result3) {
    console.log('Person2 wins with ' + result2);
}
else    
    {
    console.log('Person3 wins with ' + result3);
}

*/

// Lecture: functions
/*

function calculateAge(yearOfBirth) {
    var age = 2018 - yearOfBirth;
    return age;
}

var ageDavid = calculateAge(1964);

console.log(ageDavid);

function yearsUntilRetirement(name, year) {
    var age = calculateAge(year);
    var retirement = 65 - age;

    if (retirement >= 0) {
        console.log(name + ' retires in ' + retirement + ' years.');        
    } else {
        console.log(name + ' is already retired.');
    }
}

yearsUntilRetirement('John',1990);
yearsUntilRetirement('John',1964);
yearsUntilRetirement('John',1948);
*/

// Lecture: Statements and Expressions
/*
function someFun(par) {
    // this doesn't need to return anything
}

var someFun = function(par) {
    // this must return something
}

// a statement just does something

*/

// Lecture: Arrays (with [] brackets)

/*var names = ['John', 'Jane', 'Mark'];
var years = new Array(1990, 1969, 1648); //this is the same thing as without the "new Array" statement

console.log(names);
console.log(names[0]);
names[1] = 'Ben';
console.log(names);

//you can have different types in an array
var john = ['John', 'Smith', 1990, 'teacher', false];
console.log(john);

john.push('blue');
console.log(john);

john.unshift('Mr'); //add to the beginning of the array
john.pop(); //remove the last element
console.log(john);
john.shift(); //remove the first element
console.log(john);

console.log(john.indexOf('Smith'));

//if an element is not found with indexOf then the result is -1


*/

//Lecture: objects

//Objects have key value pairs

//in arrays we need an order; on objects we don't need an order

/*
var john = {
    name: 'John',
    lastName: 'Smith',
    yearOfBirth: 1990,
    job: 'teacher',
    isMarried: false
};

console.log(john);

console.log(john.lastName);
console.log(john['lastName']); //both these lines the same but just different syntax

var xyz = 'job';
console.log(xyz);
console.log(john[xyz]);

john.lastName = 'Miller';
john['job'] = 'programmer'; //can either use . or [] notation

console.log(john);

//another way of doing this
//define an object and then fill its properties

var jane = new Object();
jane.name = 'Jane';
jane.lastName = 'Smith';
jane['yearOfBirth'] = 1969;
jane['job'] = 'retired';
jane['isMarried'] = true;

console.log(jane);
*/

// Lecture: Objects and methods
/*
var john = {
    name: 'John',
    lastName: 'Smith',
    yearOfBirth: 1990,
    job: 'teacher',
    isMarried: false,
    family: ['Jane', 'Mark', 'Bob'],
    calculateAge: function(yearOfBirth) {
        return 2018 - yearOfBirth;
    },
    calculateObjectAge: function() {
        return 2018 - this.yearOfBirth;
    }
};

console.log(john);
console.log(john.calculateAge(1964));
console.log(john.calculateObjectAge());

var age = john.calculateObjectAge();
john.age = age; //defined a new variable
console.log(john);
*/

/*
var john = {
    name: 'John',
    lastName: 'Smith',
    yearOfBirth: 1990,
    job: 'teacher',
    isMarried: false,
    family: ['Jane', 'Mark', 'Bob'],
    calculateAge: function() {
        this.age = 2018 - this.yearOfBirth;
    }
};

john.calculateAge();
console.log(john);

var mike = {
    yearOfBirth: 1990,
    calculateAge: function() {
        this.age = 2018 - this.yearOfBirth;
    }
};

mike.calculateAge();
console.log(mike);
*/

// Loops
/*
for (var ix=0;ix < 10;ix++) {
    console.log(ix);
}

var names = ['John', 'Jane', 'Mary', 'Mark', 'Bob'];

for (var ix=0; ix<names.length; ix++) {
    console.log(names[ix]);
}
for (var ix=names.length-1; ix>=0; ix--) {
    console.log(names[ix]);
}
*/

/*var names = ['John', 'Jane', 'Mary', 'Mark', 'Bob'];

var ix = 0;
while(ix<names.length) {
    console.log(names[ix]);
    ix++;
}

for (var ix = 0; ix <= 5; ix++) {
    console.log(ix);

    if (ix === 3) {
        break;
    }
}

for (var ix = 0; ix <= 5; ix++) {
     if (ix === 3) {
        continue;
    }
    console.log(ix);
    
}*/

yearOfBirth = [1980,1990,2000,2010];
console.log(yearOfBirth);
/*yearOfBirth1 = [];
console.log(yearOfBirth1);

for (var ix = 0; ix < yearOfBirth.length; ix++) {
  console.log(yearOfBirth[ix]);
  yearOfBirth1[ix] =  yearOfBirth[ix];
}
console.log(yearOfBirth1);*/

function getFullAge(yearOfBirth) {
    if (( 2018 - yearOfBirth ) >= 18 ) {
        return true;
    }
    else {
        return false;
    }
}

function printFullAge(years) {
  //console.log(years);
  var fullAge = new Object;
  for (var ix=0; ix < years.length; ix++) {
      fullAge[ix] = getFullAge(years[ix]);
  }
  return fullAge;
}

/*for (var ix = 0; ix < yearOfBirth.length; ix++) {
    console.log(getFullAge(yearOfBirth[ix]));  
    console.log(2018-yearOfBirth[ix]);
}*/
  
var fullerAge = printFullAge(yearOfBirth);
console.log(fullerAge);

// NB lastname === window.lastname;