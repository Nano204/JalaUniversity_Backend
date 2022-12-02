import Position from "../src/chess/position";
import Queen from "../src/chess/queen";

describe("Queen piece moving testing", () => {
  let queen: Queen;

  beforeEach(() => {
    queen = new Queen("White", "D", 1);
  });

  it("Should move vertically", () => {
    const position = new Position("D", 8);
    expect(queen.canMoveTo(position)).toBe(true);
  });

  it("Should move horizontally", () => {
    const position = new Position("A", 1);
    expect(queen.canMoveTo(position)).toBe(true);
  });

  it("Should move diagonally", () => {
    const position = new Position("H", 5);
    expect(queen.canMoveTo(position)).toBe(true);
  });

  it("Shouldn't move L", () => {
    let position = new Position("C", 3);
    expect(queen.canMoveTo(position)).toBe(false);

    position = new Position("C", 3);
    expect(queen.canMoveTo(position)).toBe(false);
  });

  it("Shouldn't move ther places", () => {
    let position = new Position("C", 5);
    expect(queen.canMoveTo(position)).toBe(false);

    position = new Position("F", 8);
    expect(queen.canMoveTo(position)).toBe(false);
  });
});
