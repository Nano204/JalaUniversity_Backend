import { inject, injectable, named } from "inversify";

import { Bootcamp, Subject } from "../../interfaces";
import SERVICE_IDENTIFIER from "../../constants/identifiers";
import TAG from "../../constants/tags";

@injectable()
export class JalaBootcamp implements Bootcamp {
  @inject(SERVICE_IDENTIFIER.SUBJECT)
  @named(TAG.MORNING)
  public subject1!: Subject;
  @inject(SERVICE_IDENTIFIER.SUBJECT)
  @named(TAG.AFTERNOON)
  public subject2!: Subject;

  public schedule() {
    const desc = `SCHEDULE
                ${this.subject1.name} (${this.subject1.teacher.name})
                and
                ${this.subject2.name} (${this.subject2.teacher.name})`;
    return desc;
  }
}
