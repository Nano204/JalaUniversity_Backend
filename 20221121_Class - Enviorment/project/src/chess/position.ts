import { File, Rank } from "./types";

export default class Position {
  // file and rank propierties can't be private because we need to access them to compare.
  // Position as compelte object cannot be compared easily
  constructor(readonly file: File, readonly rank: Rank) {}
}
