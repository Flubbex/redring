import { types, flow, getSnapshot, applySnapshot } from "mobx-state-tree";
import store2 from "store2";

import newGameGenerator from "../generator/newGame";

import battle from "./battle";
import ui from "../store/ui";
import world from "./world";

export default types
  .model("Game", {
    world: types.optional(world, {
      activeArea: "ass",
      activeZone: "ass"
    }),
    battle: types.optional(battle, {}),
    started: types.optional(types.Date, Date.now()),
    state: types.optional(
      types.enumeration(["RUNNING", "WIN", "LOSE"]),
      "RUNNING"
    )
  })
  .actions((self) => {
    function save() {
      console.log("Saving game");
      store2.set("redring", dump());
    }
    function stop() {
      save();
    }
    function start() {
      self.battle.player.attribute.set("strength", 150);
      self.battle.player.attribute.set("dexterity", 40);
      self.battle.player.spawn();
      console.log("Started game");
    }

    function rebirth() {
      //Do rebirth things
    }
    function restart(rebirthed = false) {
      if (rebirthed) rebirth();
      applySnapshot(self, newGameGenerator());
      self.start();
      ui.go("player/statistic");
    }

    function win() {
      self.battle.flee();
      self.state = "WIN";
      ui.go("game/win");
    }

    function lose() {
      self.battle.flee();
      self.state = "LOSE";
      ui.go("game/lose");
    }

    function* go(zone, area) {
      self.battle.flee();
      self.world.activeZone = zone;
      self.world.activeArea = area;

      ui.go("combat/battle");

      var fighting = true;

      while (fighting) {
        fighting = yield self.battle.fight(self.world.activeArea);
        if (fighting) self.world.activeZone.killCount++;
        if (self.world.finished) {
          fighting = false;
          win();
        }
        if (!self.battle.player.alive) lose();
      }
    }

    function dump() {
      return getSnapshot(self);
    }

    return {
      start,
      restart,
      stop,
      dump,
      go: flow(go)
    };
  })
  .views((self) => ({}));
