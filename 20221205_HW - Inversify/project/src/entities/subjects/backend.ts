import { inject, injectable } from "inversify";

import SERVICE_IDENTIFIER from "../../constants/identifiers";
import { Subject, Teacher } from "../../interfaces";

@injectable()
export class Backend implements Subject {
  public name: string;
  public teacher: Teacher;
  public constructor(@inject(SERVICE_IDENTIFIER.TEACHER) teacher: Teacher) {
    this.name = "Backend";
    this.teacher = teacher;
  }
}
