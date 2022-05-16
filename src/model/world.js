import { types } from "mobx-state-tree";

import zoneModel from "./zone";
import areaModel from "./area";

export default types
  .model("World", {
    zone: types.array(zoneModel),
    activeZone: types.reference(zoneModel),
    activeArea: types.reference(areaModel, {
      get(id, parent) {
        return parent.activeZone.area.find((area) => area.id === id);
      },
      set(area) {
        return area.id;
      }
    })
  })
  .views((self) => ({
    get finished() {
      var lastKillCount = Number.MAX_SAFE_INTEGER;
      const out = self.zone.some((zone) => {
        const out = lastKillCount < zone.unlockAt;
        lastKillCount = zone.killCount;
        return out;
      });
      return !out;
    },
    get unlockedZone() {
      var lastKillCount = 0;
      return self.zone.filter((zone) => {
        const out = lastKillCount >= zone.unlockAt;
        lastKillCount = zone.killCount;
        return out;
      });
    }
  }));
