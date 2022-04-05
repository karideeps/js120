let cat = {
  name: 'Fluffy',

  makeNoise() {
    console.log('Meow! Meow!');
  },
};

let dog = {
  name: 'Maxi',

  makeNoise() {
    console.log('Woof! Woof!');
  },
}

let pete = {
  name: 'pete',
  pets: {},
}

pete.pets.cat = cat;
pete.pets.dog = dog;

pete.pets.cat.makeNoise();
pete.pets.dog.makeNoise();