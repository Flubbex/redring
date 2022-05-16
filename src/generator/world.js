import zoneGenerator from "./zone";

export default ({ power }) => {
  const newWorld = {};
  newWorld.zone = new Array(3)
    .fill(0)
    .map((_z, key) => ({ power: power + key }))
    .map(zoneGenerator);

  newWorld.activeZone = newWorld.zone[0].id;
  newWorld.activeArea = newWorld.zone[0].area[0].id;

  return newWorld;
};
