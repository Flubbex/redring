import { types } from "mobx-state-tree";

import itemModel from "./item";
import effectModel from "./effect";
import actionBarModel from "./actionBar";

import attributeModel from "../data/attribute";

import { randBetween } from "../util/random";

export default types
  .model("Entity", {
    health: types.optional(types.number, 1),
    name: types.optional(types.string, "Nameless Entity"),
    alive: types.optional(types.boolean, true),
    effect: types.optional(types.array(effectModel), []),
    attribute: types.optional(types.map(types.number), attributeModel),
    attackFrame: types.optional(types.number, 0),
    experience: types.optional(types.number, 0),
    inventory: types.optional(types.array(itemModel), []),
    actionBar: types.optional(actionBarModel, {})
  })
  .actions((self) => {
    function spawn() {
      self.health = self.statistic.maxHealth;
      self.alive = true;
      return self;
    }

    function apply(property, value) {
      self[property] = value;
    }
    function die() {
      self.alive = false;
    }

    function hurt(amount) {
      const reducedAmount = amount - self.statistic.armor;
      self.health -= reducedAmount < 0 ? 0 : reducedAmount;
      if (self.health <= 0) die();
    }

    function useAction(id, target) {
      self.actionBar.use(id, self, target);
      self.attackFrame = 0;
    }

    function applyEffect(effect) {
      self.effect.push(effect);
    }

    function tick(target, rate = 10) {
      if (!self.alive) {
        console.log("Im ded bro");
        return;
      }
      self.attackFrame += rate;
      if (self.attackFrame >= self.statistic.attackSpeed) {
        target.hurt(self.damage);
        self.attackFrame -= self.statistic.attackSpeed;
      }

      self.actionBar.tick(rate, self, target);
      self.effect = self.effect.filter((effect) => effect.tick(target, self));
    }
    return { spawn, tick, hurt, useAction, apply, applyEffect };
  })
  .views((self) => ({
    get baseAttribute() {
      return {
        strength: self.attribute.get("strength"),
        constitution: self.attribute.get("constitution"),
        dexterity: self.attribute.get("dexterity"),
        intelligence: self.attribute.get("intelligence"),
        wisdom: self.attribute.get("wisdom"),
        luck: self.attribute.get("luck")
      };
    },
    get damage() {
      return randBetween(self.statistic.minDamage, self.statistic.maxDamage);
    },
    get statistic() {
      return {
        maxDamage:
          self.attribute.get("strength") * 1.5 +
          self.attribute.get("dexterity"),
        minDamage:
          self.attribute.get("strength") + self.attribute.get("dexterity"),
        maxHealth: Math.ceil(self.attribute.get("strength") * Math.PI * 10),
        attackSpeed: 1000 - Math.ceil(self.attribute.get("dexterity") * 2.5),
        armor:
          self.attribute.get("strength") / 5 +
          self.attribute.get("constitution") * 2
      };
    }
  }));
