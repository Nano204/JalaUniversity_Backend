import { File, Rank } from "./types";

export default class Position {
  constructor(private file: File, private rank: Rank) {}

  getFile() {
    return this.file;
  }

  getRank() {
    return this.rank;
  }
}
