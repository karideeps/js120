// 1
class Game {
  play() {
    return 'Start the game!';
  }
}

class Bingo extends Game {
  rulesOfPlay() {

  }

  play() {
    return 'Start Bingo!'
  }
}

// If there is a method `play()` on Bingo, then any object made using `Bingo` will access the `play()` method on `Bingo` instead of the `play()` method on `Game`.

let a = new Bingo;
console.log(a.play());

// 2
class Greeting {
  greet(someString) {
    console.log(someString);
  }
}

class Hello extends Greeting {
  hi() {
    super.greet('Hello');
  }
}

class Goodbye extends Greeting {
  bye() {
    super.greet('Goodbye');
  }
}

let hello = new Hello;
hello.hi();

let goodbye = new Goodbye;
goodbye.bye();
