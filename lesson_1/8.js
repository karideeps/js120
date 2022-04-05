// 1
/*
let book1 = {
  title: 'Mythos',
  author: 'Stephen Fry',
  
  getDescription: function() {
    console.log(`${this.title} was written by ${this.author}.`);
  }
}

let book2 = {
  title: 'Me Talk Pretty One Day',
  author: 'David Sedaris',

  getDescription() {
    console.log(`${this.title} was written by ${this.author}.`);
  }
}

let book3 = {
  title: 'Aunts aren\'t Gentlemen',
  author: 'PG Wodehouse',

  getDescription() {
    console.log(`${this.title} was written by ${this.author}.`);
  }
}

book1.getDescription();
book2.getDescription();
book3.getDescription();
*/

// 2 Yes, there is some unnecessary code and code duplication. We define the same `getDescription()` method on the different objects.

//3
/*
function createBook(title, author) {
  return {
    title: title,
    author: author,
    getDescription: function() {
      console.log(`${this.title} was written by ${this.author}.`)
    }
  }
}

let book1 = createBook('Mythos', 'Stephen Fry');
let book2 = createBook('Me Talk Pretty One Day', 'David Sedaris');
let book3 = createBook('Aunts aren\'t Gentlemen', 'PG Wodehouse');

book1.getDescription();
book2.getDescription();
book3.getDescription();
*/

// 4
/*
function createBook(title, author) {
  return {
    title: title,
    author: author,
    read: false,
    getDescription: function() {
      console.log(`${this.title} was written by ${this.author}.`)
    }
  }
}

let book1 = createBook('Mythos', 'Stephen Fry');
let book2 = createBook('Me Talk Pretty One Day', 'David Sedaris');
let book3 = createBook('Aunts aren\'t Gentlemen', 'PG Wodehouse');

console.log(book1.read);
console.log(book2.read);
console.log(book3.read);
*/

// 5
/*
function createBook(title, author, read = false) {
  return {
    title: title,
    author: author,
    read,
    getDescription: function() {
      console.log(`${this.title} was written by ${this.author}.`)
    },
  }
}

let book1 = createBook('Mythos', 'Stephen Fry');
let book2 = createBook('Me Talk Pretty One Day', 'David Sedaris', false);
let book3 = createBook('Aunts aren\'t Gentlemen', 'PG Wodehouse', true);

console.log(book1.read);
console.log(book2.read);
console.log(book3.read);
*/

// 6
/*
function createBook(title, author, read = false) {
  return {
    title: title,
    author: author,
    read,
    getDescription: function() {
      console.log(`${this.title} was written by ${this.author}.`)
    },

    readBook() {
      this.read = true;
    }
  }
}

let book1 = createBook('Mythos', 'Stephen Fry');
let book2 = createBook('Me Talk Pretty One Day', 'David Sedaris', false);
let book3 = createBook('Aunts aren\'t Gentlemen', 'PG Wodehouse', true);

console.log(book2.read);
book2.readBook();
console.log(book2.read);
*/

// 7
function createBook(title, author, read = false) {
  return {
    title: title,
    author: author,
    read,
    getDescription: function() {
      console.log(`${this.title} was written by ${this.author}. I ${this.read ? 'have' : 'haven\'t'} read it.`)
    },

    readBook() {
      this.read = true;
    }
  }
}

let book1 = createBook('Mythos', 'Stephen Fry');
let book2 = createBook('Me Talk Pretty One Day', 'David Sedaris', false);
let book3 = createBook('Aunts aren\'t Gentlemen', 'PG Wodehouse', true);

book1.getDescription();
book2.readBook();
book2.getDescription();