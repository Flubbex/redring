const maxLevel = 100;

const levelTable = new Array(maxLevel - 1)
  .fill(0)
  .map((_z, id) => 150 * (id + 1) * (2 + ((id + 1) * (id + 1)) / 2));

export default levelTable;
