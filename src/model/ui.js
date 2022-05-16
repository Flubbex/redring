import { types } from "mobx-state-tree";

export default types
  .model("UI", {
    route: types.string
  })
  .actions((self) => {
    function go(to) {
      self.route = to;
    }
    return { go };
  });
