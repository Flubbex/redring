import worldGenerator from "./world";

export default (recipe) => {
  const newGame = {};
  newGame.world = worldGenerator({ power: 1 });
  newGame.world.zone[0].unlockAt = 0;
  return newGame;
};
