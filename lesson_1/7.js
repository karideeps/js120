function createCar(make, fuelLevel, engineOn) {
  return {
    make: make,
    fuelLevel: fuelLevel,
    engineOn: engineOn,

    drive: function() {
      console.log(`${this.make} is driving!`)
    },
  }
}

let raceCar1 = createCar('BMW', 0.5, false);
raceCar1.drive();

let raceCar2 = createCar('Ferrari', 0.7, true);
raceCar2.drive();

let raceCar3 = createCar('Jaguar', 0.4, false)
raceCar3.drive();