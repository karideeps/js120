var Animal = {
  init: function(type) {
    this.type = type;
  },

  breathe: function() {
    console.log("I'm breathing");
  },
}

var Dog = Object.create(Animal);
var Terrier = Object.create(Dog);

var rex = Object.create(Terrier);
rex.init("canine");

console.log(rex.type);
rex.breathe();