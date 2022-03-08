/*
1. Constructor functions use PascalCase (or CamelCase) whereas functions use camelCalse 

2. Running the above code will throw an error. This is because, on line 11, `lizzy` gets initialized `undefined` since `Lizard` is not called with the `new` keyword. On like 12, calling the method `scamper()` will throw an error, becasue you can not read the properties of `undefined`.

*/

// 3
function Lizard() {
  this.scamper = function() {
    console.log("I.m scampering!");
  }
}

let lizzy = new Lizard();
lizzy.scamper();