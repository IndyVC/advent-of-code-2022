import fs from "fs";

export function part1() {
  const raw = fs.readFileSync("src/calorie-counting/calories.txt").toString();
  const fragments = raw.split("\r\n");

  const calories: number[] = [];
  let currentElve: number[] = [];
  for (let i = 0; i < fragments.length; i++) {
    const fragment = fragments[i];
    if (fragment === "" || i === fragments.length - 1) {
      calories.push(currentElve.reduce((prev, curr) => (prev += curr), 0));
      currentElve = [];
    } else currentElve.push(parseFloat(fragment));
  }
  const mostCalories = Math.max(...calories);
  return mostCalories;
}

export function part2() {
  const raw = fs.readFileSync("src/calorie-counting/calories.txt").toString();
  const fragments = raw.split("\r\n");

  const calories: number[] = [];
  let currentElve: number[] = [];
  for (let i = 0; i < fragments.length; i++) {
    const fragment = fragments[i];
    if (fragment === "" || i === fragments.length - 1) {
      calories.push(currentElve.reduce((prev, curr) => (prev += curr), 0));
      currentElve = [];
    } else currentElve.push(parseFloat(fragment));
  }
  return calories
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((prev, curr) => (prev += curr), 0);
}
