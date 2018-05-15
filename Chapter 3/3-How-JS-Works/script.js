///////////////////////////////////////
// Lecture: Hoisting

/*
calculateAge(1990);

function calculateAge(year) {
    console.log(2018 - year);
}

*/














///////////////////////////////////////
// Lecture: Scoping


// First scoping example

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        console.log(a + b + c);
    }
}
*/



// Example to show the differece between execution stack and scope chain

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        third()
    }
}

function third() {
    var d = 'John';
    console.log(a + b + c + d);
}
*/



///////////////////////////////////////
// Lecture: The this keyword


//console.log(this);
/*
calculateAge(1985);

function calculateAge(year) {
    console.log(2016 - year);
    console.log(this); //its attached to the global object
}
*/

var john = {
    name: 'John',
    yearOfBirth: 1990,
    calculateAge: function() { //this is a method, it is a function expression, not a function declaration
        console.log(this);
        console.log(2016-this.yearOfBirth);

        /*
        function innerFunction() { //this function is a function declaration, therefore "this" here refers to the window, and not "john"
            console.log(this);
        }
        innerFunction();
        */
    }
}

john.calculateAge(); //this is a method call

var mike = {
    name: 'Mike',
    yearOfBirth: 1984
}

//method borrowing to borrow John's method to use it in mike
mike.calculateAge = john.calculateAge;
mike.calculateAge();