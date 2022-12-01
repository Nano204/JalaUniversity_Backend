console.log("////Here starts Fibonacci////");

//Form1
function* fibonacci() {
  let n1 = 1;
  let n2 = 1;
  while (true) {
    yield n1;
    const hold = n2;
    n2 = n1 + n2;
    n1 = hold;
  }
}

//Form2
// function* fibonacci() {
//   let [n1, n2] = [0, 1];
//   while (true) {
//     yield n1;
//     [n1, n2] = [n2, n2 + n1];
//   }
// }

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
