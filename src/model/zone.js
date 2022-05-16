import { types } from "mobx-state-tree";

import areaModel from "./area";

export default types.model("Zone", {
  id: types.identifier,
  area: types.array(areaModel),
  killCount: types.optional(types.number, 0),
  unlockAt: types.number
});
