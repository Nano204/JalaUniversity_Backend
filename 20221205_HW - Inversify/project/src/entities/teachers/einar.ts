import { injectable } from "inversify";

import { Teacher } from "../../interfaces";

@injectable()
export class Einar implements Teacher {
  public name: string;
  public constructor() {
    this.name = "Ali Rocha Cayu";
  }
}
