import animal from "../../data/list/animal";
import adjective from "../../data/list/adjective";

import { randPick } from "../../util/random";
/*
rat: {
    name: "Rat",
    level: 1,
    attributes: {
      strength: 1,
      dexterity: 4,
      intelligence: 4
    },
    experience: 100
  }
    */

export default ({ power = 1 }) => {
  const newAnimal = {};
  newAnimal.name = randPick(adjective) + " " + randPick(animal);
  newAnimal.attribute = {
    strength: 4 * power,
    dexterity: 4 * power,
    intelligence: 4 * power,
    wisdom: 4 * power,
    constitution: 4 * power,
    luck: 4 * power
  };
  newAnimal.experience = 100;
  return newAnimal;
};
