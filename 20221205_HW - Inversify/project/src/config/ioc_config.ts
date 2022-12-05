import "reflect-metadata";

import { Container } from "inversify";

import { Bootcamp, Subject, Teacher } from "../interfaces";

import { Backend, Devops } from "../entities/subjects";
import { Ali, Einar } from "../entities/teachers";
import { JalaBootcamp } from "../entities/bootcamp/jala_bootcamp";

import SERVICE_IDENTIFIER from "../constants/identifiers";
import TAG from "../constants/tags";

const container = new Container();

container
  .bind<Subject>(SERVICE_IDENTIFIER.SUBJECT)
  .to(Devops)
  .whenTargetNamed(TAG.MORNING);

container
  .bind<Subject>(SERVICE_IDENTIFIER.SUBJECT)
  .to(Backend)
  .whenTargetNamed(TAG.AFTERNOON);

container.bind<Teacher>(SERVICE_IDENTIFIER.TEACHER).to(Ali).whenParentNamed(TAG.MORNING);

container
  .bind<Teacher>(SERVICE_IDENTIFIER.TEACHER)
  .to(Einar)
  .whenParentNamed(TAG.AFTERNOON);
  
container.bind<Bootcamp>(SERVICE_IDENTIFIER.BOOTCAMP).to(JalaBootcamp);

export default container;
