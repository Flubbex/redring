import { types } from "mobx-state-tree";

import actionCall from "../call/action";

export default types
  .model("Action", {
    call: types.string,
    name: types.string,
    description: types.string,
    windup: types.number,
    cooldown: types.number,
    image: types.string,
    step: types.optional(types.number, 0)
  })
  .actions((self) => {
    function use(user, target) {
      actionCall[self.call](user, target);
      self.step = self.cooldown;
    }
    function tick(rate) {
      self.step -= rate;
    }
    return { use, tick };
  })
  .views((self) => ({
    get ready() {
      return self.step > 0;
    }
  }));
