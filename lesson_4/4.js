function Greeting() {}

Greeting.prototype.greet = function(message) {
  console.log(message);
};

function Hello() {}

Hello.prototype = Object.create(Greeting.prototype);

Hello.prototype.hi = function() {
  this.greet('Hello!');
};

function Goodbye() {}

Goodbye.prototype = Object.create(Greeting.prototype);

Goodbye.prototype.bye = function() {
  this.greet('Goodbye');
};

// Case 1
// let hello = new Hello();
// hello.hi(); // logs 'Hello!' to the screen.

// Case 2
// let hello = new Hello();
// hello.bye(); // TypeError hello.bye is not a function;

// Case 3
// let hello = new Hello();
// hello.greet(); // logs 'undefined to the screen.

// Case 4
// let hello = new Hello();
// hello.greet('Goodbye'); // logs 'Goodbye' to the screen.

// Case 5
Hello.hi(); // TypeError Hello.hi is not a function;