import { types } from "mobx-state-tree";

import effect from "../call/effect";

export default types
  .model("Effect", {
    name: types.string,
    duration: types.number,
    call: types.string,
    step: types.optional(types.number, 0)
  })
  .actions((self) => {
    function tick(user, target) {
      effect[self.call](user, target);
      self.step++;
      return self.step <= self.duration;
    }
    return { tick };
  });
