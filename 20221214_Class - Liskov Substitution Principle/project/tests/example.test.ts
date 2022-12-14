import { sum } from "../src/examples/calc";

describe("Testing calc", () => {
  it("Sum function should return 15", () => {
    expect(sum(10, 5)).toBe(15);
  });

  it("Sum function should return 5 ", () => {
    expect(sum(3, 2)).toBe(5);
  });
});
