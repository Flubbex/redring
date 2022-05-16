import { types } from "mobx-state-tree";

import entity from "./entity";

import levelTable from "../data/levelTable";
import playerClassSet from "../data/playerclass";

const soul = types.model("Soul", {
  affects: types.optional(types.array(types.number), [])
});

const playerClass = types.model("Class", {
  name: types.string,
  actionset: types.frozen({})
});

const player = types
  .model({
    playerClass: types.optional(playerClass, playerClassSet.warrior),
    soul: types.optional(soul, {}),
    level: types.optional(types.number, 1),
    exp: types.optional(types.number, 0),
    availableAttributePoints: types.optional(types.number, 15)
  })
  .actions((self) => {
    function levelUp() {
      self.level++;
      self.availableAttributePoints += 5;
    }
    function grantExperience(amount) {
      self.experience += amount;
      if (levelTable[self.level] > self.exp) levelUp();
    }
    function incrementAttribute(attribute) {
      self.attribute.set(attribute, self.attribute.get(attribute) + 1);
      self.availableAttributePoints--;
    }
    return { grantExperience, incrementAttribute };
  })
  .views((self) => ({
    get availableAction() {
      return Object.keys(self.playerClass.actionset)
        .map((value) => parseInt(value, 10))
        .filter((value) => value <= self.level)
        .reduce(
          (prev, next) => prev.concat(self.playerClass.actionset[next]),
          []
        );
    }
  }));

export default types.compose("Player", entity, player);
