import { types } from "mobx-state-tree";

const itemTypes = ["Weapon", "Equipment", "Potion"];
export default types.model("Item", {
  name: types.optional(types.string, "Nameless Item"),
  value: types.optional(types.number, 1),
  type: types.optional(types.enumeration(itemTypes), "Potion")
});
