// import { ISnake } from "./ISnake";

export default class IBoard {
  public id!: number;
  // public sideLenght!: number;
  // public coordinates: boolean[][];
  public coordinates: string;
  // public snakes: ISnake[];
  constructor(public readonly sideLenght: number) {
    this.coordinates = new Array(sideLenght)
      .map(() =>
        Array(sideLenght).map(() => {
          return false;
        })
      )
      .toString();
    // this.snakes = [];
  }
}
