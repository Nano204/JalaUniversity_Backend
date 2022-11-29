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
