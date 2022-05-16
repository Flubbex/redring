import React from "react";
import { observer } from "mobx-react-lite";

import game from "../../store/game";

export default observer(() => {
  const {
    battle: { player }
  } = game;

  return (
    <ul>
      <li>Head:</li>
      <li>Body:</li>
      <li>Legs:</li>
      <li>Ring:</li>
      <li>feet:</li>
      <li>Weapon:</li>
    </ul>
  );
});
