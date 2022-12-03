import fs from "fs";

const upperCaseModifier = 38; // convert uppercase unicode to numeric value
const lowerCaseModifier = 96; // convert lowercase unicode to numeric value

export function part1() {
  const raw = fs
    .readFileSync("src/rugsack-reorganization/items.txt")
    .toString();
  const rugsacks: string[] = raw.split("\r\n");

  let result = 0;
  for (const rugsack of rugsacks) {
    const compartment1 = rugsack.slice(0, rugsack.length / 2);
    const compartment2 = rugsack.slice(rugsack.length / 2);

    const shared = compartment1
      .split("")
      .find((char) => compartment2.split("").includes(char));

    const value =
      shared.toUpperCase() === shared
        ? shared.charCodeAt(0) - upperCaseModifier
        : shared.charCodeAt(0) - lowerCaseModifier;

    result += value;
  }
  return result;
}

export function part2() {
  const raw = fs
    .readFileSync("src/rugsack-reorganization/items.txt")
    .toString();
  const rugsacks: string[] = raw.split("\r\n");
  const groups: string[][] = [];

  const AMOUNT_OF_ELVES_IN_A_GROUP = 3;
  let group: string[] = [];
  for (let i = 0; i <= rugsacks.length; i++) {
    const rugsack = rugsacks[i];
    if (i % AMOUNT_OF_ELVES_IN_A_GROUP === 0 && i !== 0) {
      groups.push(group);
      group = [];
    }
    group.push(rugsack);
  }

  console.log(groups);
  let result = 0;
  for (const group of groups) {
    let occurences = {};
    for (const rugsack of group) {
      new Set(rugsack.split("")).forEach((char) => {
        if (occurences[char]) occurences[char] += 1;
        else occurences[char] = 1;
      });
    }
    const shared = Object.entries(occurences).find(
      ([_, occurences]) => occurences === 3
    )[0];

    const value =
      shared.toUpperCase() === shared
        ? shared.charCodeAt(0) - upperCaseModifier
        : shared.charCodeAt(0) - lowerCaseModifier;
    console.log(value, shared);
    result += value;
  }
  return result;
}
