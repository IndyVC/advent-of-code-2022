import fs from "fs";

export const part1 = () => {
  const stream = fs.readFileSync("src/tuning-problem/stream.txt").toString();
  //   const stream = "bvwbjplbgvbhsrlpgdmjqwftvncz";

  for (let i = 3; i < stream.length - 1; i++) {
    const chunk = stream.slice(i - 3, i + 1);
    const allUnique = [...new Set(chunk)].length === 4;
    if (allUnique) return i + 1;
  }
};

export const part2 = () => {
  const stream = fs.readFileSync("src/tuning-problem/stream.txt").toString();
  //   const stream = "mjqjpqmgbljsphdztnvjfqwrcgsmlb";

  for (let i = 13; i < stream.length - 1; i++) {
    const chunk = stream.slice(i - 13, i + 1);
    const allUnique = [...new Set(chunk)].length === 14;
    if (allUnique) return i + 1;
  }
};
