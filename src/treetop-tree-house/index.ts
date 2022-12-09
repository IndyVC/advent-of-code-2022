import fs from "fs";

export function part1() {
  const raw = fs.readFileSync("src/treetop-tree-house/field.txt").toString();
  const rows = raw.split("\r\n");
  const matrix: number[][] = [];
  rows.forEach((row) => matrix.push(row.split("").map(Number)));

  let visible = 0;
  for (let row = 0; row < matrix.length; row++) {
    for (let column = 0; column < matrix[row].length; column++) {
      const tree = matrix[row][column];
      const left = Math.max(...matrix[row].slice(0, column), -1);
      const right = Math.max(
        ...matrix[row].slice(column + 1, matrix[row].length),
        -1
      );
      const top = Math.max(
        ...matrix.slice(0, row).map((row) => row[column]),
        -1
      );
      const bottom = Math.max(
        ...matrix.slice(row + 1, matrix.length).map((row) => row[column]),
        -1
      );

      const isVisible =
        tree > left || tree > right || tree > top || tree > bottom;
      if (isVisible) visible += 1;
    }
  }
  return visible;
}

export function part2() {
  const raw = fs.readFileSync("src/treetop-tree-house/field.txt").toString();
  const rows = raw.split("\r\n");
  const matrix: number[][] = [];
  rows.forEach((row) => matrix.push(row.split("").map(Number)));
  let highestScenicScore = 0;
  for (let row = 0; row < matrix.length; row++) {
    for (let column = 0; column < matrix[row].length; column++) {
      const tree = matrix[row][column];
      const amountOfUpTrees = amountOfVisibleTrees(
        matrix
          .slice(0, row)
          .map((row) => row[column])
          .reverse(),
        tree
      );

      const amountOfLeftTrees = amountOfVisibleTrees(
        matrix[row].slice(0, column).reverse(),
        tree
      );

      const amountOfRightTrees = amountOfVisibleTrees(
        matrix[row].slice(column + 1, matrix[row].length),
        tree
      );

      const amountOfBottomTrees = amountOfVisibleTrees(
        matrix.slice(row + 1, matrix.length).map((row) => row[column]),
        tree
      );

      const scenicScore =
        amountOfUpTrees *
        amountOfLeftTrees *
        amountOfRightTrees *
        amountOfBottomTrees;

      highestScenicScore = Math.max(scenicScore, highestScenicScore);
    }
  }
  return highestScenicScore;
}
function amountOfVisibleTrees(trees: number[], tree: number) {
  let amount = 0;
  for (const current of trees) {
    // stop at the first tree that is same height or talles than `tree`
    amount++;
    if (current >= tree) break;
  }
  return amount;
}
