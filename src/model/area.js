import { types } from "mobx-state-tree";

import enemy from "./enemy";

export default types.model("Area", {
  id: types.identifier,
  name: types.optional(types.string, "Nameless Area"),
  encounter: types.array(enemy),
  Progress: types.optional(types.number, 0)
});
