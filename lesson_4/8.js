// 1
const Speed = {
  goFast() {
    console.log(`I.m a ${this.constructor.name} and going super fast!`);
  }
};

class Car {
  goSlow() {
    console.log(`I'm safe and driving slow.`)
  }
}
Object.assign(Car.prototype, Speed);

class Truck {
  goVerySlow() {
    console.log(`I'm a heavy truck and like going very slow.`)
  }
}

Object.assign(Truck.prototype, Speed);

let car = new Car;
let truck = new Truck;

car.goFast();
truck.goFast();

// 2
/*

On line 23, a new object is created using the constructor function `Car` following the `new` keyword. This object is assigned to the global variable `car`. On line 13, the object referenced by `Speed` is "added to" to the object referenced by `Car.prototype`. Therefore, any object created using the `Car` constructor function (i.e., any instance of `Car`) will have access to the `goFast()` function in the object `Speed`.

In JavaScript, how is method is called determines its execution context. In this case, `this` will refer to the calling object. `constructor` is not a property on this instance of car, so JavaScript will look up the prototypal chain to find the property. The object pointed to by `[[Prototype]]` on `car` has the `constructor` property.

In Javascript, A Function object's read-only name property indicates the function's name as specified when it was created. Therefore, `Car.name` is being returned by the `this.constructor.name`.

*/

class Vehicle {
  constructor(kmTravelledPerLiter, fuelCapInLiter) {
    this.fuelEfficiency = kmTravelledPerLiter;
    this.fuelCap = fuelCapInLiter;
  }

  range() {
    return this.fuelCap * this.fuelEfficiency;
  }
}

const WheeledVehicle = {
  tirePressure(tireIdx) {
    return this.tires[tireIdx];
  },
  
  inflateTire(tireIdx, pressure) {
    this.tires[tireIdx] = pressure;
  }
}


class Auto extends Vehicle {
  constructor() {
    super(50, 25.0);
    this.tires = [30, 30, 32, 32];
  }
}

Object.assign(Auto.prototype, WheeledVehicle);

class Motorcycle extends Vehicle {
  constructor() {
    super(80, 8.0);
    this.tires = [20, 20];
  }
}

Object.assign(Motorcycle.prototype, WheeledVehicle);

class Catamaran extends Vehicle{
  constructor(propellerCount, hullCount) {
    super(100, 10);

    this.propellerCount = propellerCount;
    this.hullCount = hullCount;
  }
}

let someCar = new Catamaran(4, 250);
console.log(someCar.propellerCount);