import Position from "../src/chess/position";
import King from "../src/chess/king";

describe("King piece moving testing", () => {
  let king: King;

  beforeEach(() => {
    king = new King("White", "E", 1);
  });

  it("Should move one place forward", () => {
    const position = new Position("E", 2);
    expect(king.canMoveTo(position)).toBe(true);
  });

  it("Shouldn't move same place", () => {
    const position = new Position("E", 1);
    expect(king.canMoveTo(position)).toBe(false);
  });

  it("Should move one place to the left", () => {
    const position = new Position("D", 1);
    expect(king.canMoveTo(position)).toBe(true);
  });

  it("Shouldn't move forward more tha 1 space", () => {
    const position = new Position("E", 3);
    expect(king.canMoveTo(position)).toBe(false);
  });
});
