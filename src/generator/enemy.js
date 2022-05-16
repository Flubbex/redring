import animalGenerator from "./enemy/animal";

export default (recipe) => {
  const newEnemy = animalGenerator(recipe);
  return newEnemy;
};
