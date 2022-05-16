import { v4 as uuid } from "uuid";

import areaGenerator from "./area";

export default ({ power }) => {
  const newZone = { id: uuid() };
  newZone.area = new Array(3)
    .fill(0)
    .map((_z, key) => ({ power: key + power }))
    .map(areaGenerator);
  newZone.unlockAt = power;
  return newZone;
};
