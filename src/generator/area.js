import { v4 as uuid } from "uuid";

import enemyGenerator from "./enemy";

export default ({ power }) => {
  const encounter = new Array(Math.floor(Math.random() * 8) + 3)
    .fill(0)
    .map((_z, key) => ({
      power: power + key
    }))
    .map(enemyGenerator);
  return {
    id: uuid(),
    name: "Nameless Area",
    encounter
  };
};
