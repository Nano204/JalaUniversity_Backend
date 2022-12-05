import { injectable } from "inversify";

import { Teacher } from "../../interfaces";

@injectable()
export class Ali implements Teacher {
  public name: string;
  public constructor() {
    this.name = "Ali Aleep";
  }
}
