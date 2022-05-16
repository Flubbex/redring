import { types, flow, getSnapshot } from "mobx-state-tree";

import player from "./player";
import enemy from "./enemy";

import { randPick } from "../util/random";

export default types
  .model("Battle", {
    player: types.optional(player, {}),
    enemy: types.maybeNull(enemy),
    tickRate: types.optional(types.number, 133),
    state: types.optional(
      types.enumeration(["idle", "fighting", "dead", "respawning"]),
      "idle"
    ),
    currentTimer: types.optional(types.number, -1)
  })
  .actions((self) => {
    function create(_enemy = null) {
      self.enemy = enemy.create(getSnapshot(_enemy)).spawn();
    }

    function delay(amount, ...args) {
      return new Promise((resolve) => {
        self.currentTimer = window.setTimeout(resolve, amount, ...args);
      });
    }

    function flee() {
      window.clearTimeout(self.currentTimer);
      self.enemy = null;
      self.state = "idle";
      self.player.attackFrame = 0;
      self.player.actionBar.reset();
    }
    function* fight(area) {
      create(randPick(area.encounter));
      self.state = "fighting";
      while (self.player.alive) {
        yield delay(self.tickRate);
        self.player.tick(self.enemy, self.tickRate);
        if (!self.enemy.alive) {
          self.player.grantExperience(self.enemy.experience);
          self.player.actionBar.reset();
          self.player.attackFrame = 0;
          self.enemy = null;
          self.state = "respawning";

          yield delay(1000);
          return true;
        } else self.enemy.tick(self.player, self.tickRate);
      }
      self.state = "dead";
      return false;
    }

    return {
      create,
      fight: flow(fight),
      flee
    };
  });
