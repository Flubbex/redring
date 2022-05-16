const randBetween = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const randPick = (set) => set[randBetween(0, set.length)];

export { randBetween, randPick };
