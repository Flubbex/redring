import React from "react";
import { observer } from "mobx-react-lite";

import Tabset from "../Tabset";

import game from "../../store/game";

export default observer(() => {
  const {
    battle: { player }
  } = game;

  return (
    <Tabset tabset={["Weapons", "Armor", "Consumable", "Key Items"]}>
      <div>OK</div>
      <div>OK</div>
    </Tabset>
  );
});
