function buildArray() {
  const a = [];
  a.push("hola");
  a.push(2);
  return a;
}

const b = buildArray();

// b.push(true);

console.log(b);

const enum Flippable {
  Burger,
  Other,
}

// console.log(Flippable[500]);
console.log(Flippable.Burger);

const l: unknown = 4;
const m = typeof l == "number" ? l * 4 : 8;

console.log(m);

console.log("////Here starts Fibonacci////");

function* fibonacci() {
  let [num1, num2] = [0, 1];
  while (true) {
    yield num1;
    [num1, num2] = [num2, num2 + num1];
  }
}

const test = fibonacci();
console.log(test.next());
console.log(test.next());
console.log(test.next());
console.log(test.next());
console.log(test.next());
console.log(test.next());
console.log(test.next());
console.log(test.next());
console.log(test.next());
