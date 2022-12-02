import Position from "../src/chess/position";
import King from "../src/chess/king";
import Queen from "../src/chess/queen";

describe("Chess game testing", () => {
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
});
