// Important to remember
// “this” always refers to an object.
// “this” refers to an object which calls the function it contains.
// In the global context “this” refers to either window object or is undefined if the ‘strict mode’ is used.

// Suppose that you have a car object

const car: {
  registrationNumber: string;
  brand: string;
  displayDetails(ownerFirstName: string, ownerLastName: string): void;
} = {
  registrationNumber: "GA12345",
  brand: "Toyota",
  displayDetails: function (ownerFirstName: string, ownerLastName: string) {
    console.log(
      ownerFirstName +
        " " +
        ownerLastName +
        ", this is your car: " +
        this.registrationNumber +
        " " +
        this.brand
    );
  },
};

// The above will work perfectly fine as long as we use it this way:

car.displayDetails("Vivian", "Delgado"); // Vivian, this is your car: GA12345 Toyota

//But what if we want to borrow a method?

// const myCarDetails: () => void = car.displayDetails;
// myCarDetails("Vivian", "Delgado");

// Well, this won’t work as the “this” will be now assigned to the global context
// which doesn’t have neither the registrationNumber nor the brand property.

// THE BIND METHOD

// The bind() method creates a new function where “this” refers to the parameter
// in the parenthesis in the above case “car”. This way the bind() method enables
// calling a function with a specified “this” value.

const myCarDetails = car.displayDetails.bind(car);
myCarDetails("Vivian", "Delgado"); // Vivian, this is your car: GA12345 Toyota

// Suppose that you have a second car object that does not have the displayDetails() method

const secondCar: { registrationNumber: string; brand: string } = {
  registrationNumber: "HU54321",
  brand: "Nissan",
};

// You can use the bind() method to create a function where “this” refers to the parameter
// in the parenthesis in the second car object

const mySecondCarDetails = car.displayDetails.bind(secondCar);
mySecondCarDetails("Vivian", "Delgado"); // Vivian, this is your car: HU54321 Nissan

// CALL & APPLY METHODS

// Both methods are great tools for borrowing functions in JavaScript.

// The second car object has not displayDetails function, which is located in the first car context.
// To use it with the second car we can use:

car.displayDetails.apply(secondCar, ["Vivian", "Delgado"]); // Vivian, this is your car: HU54321 Nissan

// Or

car.displayDetails.call(secondCar, "Vivian", "Delgado"); // Vivian, this is your car: HU54321 Nissan

// Note that when using the apply() function the parameter must be placed in an array. 
// This methods are similar but slightly different to bind.The principal difference between this 2 
// methods and bind methos is that bind creates a new function while apply and call excecute the function. 