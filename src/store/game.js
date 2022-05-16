import store2 from "store2";

import newGameGenerator from "../generator/newGame";
import gameModel from "../model/game";

const savedState = store2.has("redring")
  ? store2.get("redring")
  : newGameGenerator();

const game = gameModel.create(savedState);

window.game = game;

game.start();

export default game;
