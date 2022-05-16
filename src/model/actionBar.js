import { types } from "mobx-state-tree";

import actionModel from "./action";

import actionList from "../data/action";

export default types
  .model("Actionset", {
    set: types.optional(
      types.array(actionModel),
      new Array(5).fill(0).map(() => actionList.empty)
    ),
    iterate: types.optional(types.enumeration(["AUTO"]), "AUTO")
  })
  .actions((self) => {
    function getAction(i) {
      return self.set[i];
    }

    function setAction(i, x) {
      if (x) self.set[i] = x;
      else self.set[i] = actionList.empty;
    }

    function use(i, user, target) {
      self.set[i].use(user, target);
    }

    function reset() {
      self.set.map((action) => (action.step = 0));
    }
    function tick(rate, user, target) {
      self.set
        .filter((action) => action.call !== "none")
        .map((action, key) => {
          if (action.step > 0) action.tick(rate);
          if (action.step < 0) action.step = 0;
          if (action.step === 0 && self.iterate === "AUTO")
            use(key, user, target);
          return null;
        });
    }
    return {
      getAction,
      setAction,
      use,
      reset,
      tick
    };
  });
