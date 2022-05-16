import React from "react";
import { observer } from "mobx-react-lite";

import { Row } from "./bootstrap";

import Player from "./menu/Player";
import Battle from "./Player/Battle";
import Worldmap from "./menu/Worldmap";

import Tabset from "./Tabset";

export default observer(({ game }) => {
  const headers = ["Player", "World", "Battle"];

  const { battle, killCounter, world, go } = game;

  return (
    <Row>
      <Tabset tabset={headers}>
        <Player player={battle.player} />
        <Worldmap world={world} go={go} killCounter={killCounter} />
        <Battle battle={battle} />
      </Tabset>
    </Row>
  );
});
