import fs from "fs";

export function part1() {
  const raw = fs.readFileSync("src/camp-cleanup/pairs.txt").toString();
  const pairs = raw.split("\r\n");

  let overlaps = 0;
  for (const pair of pairs) {
    const [a, b] = pair.split(",");
    const [aStart, aEnd] = a.split("-").map(Number);
    const [bStart, bEnd] = b.split("-").map(Number);
    const aCamps = Array(aEnd - aStart + 1)
      .fill(aStart)
      .map((number, i) => (number += i));
    const bCamps = Array(bEnd - bStart + 1)
      .fill(bStart)
      .map((number, i) => (number += i));
    if (
      [...aCamps].every((camp) => bCamps.includes(camp)) ||
      [...bCamps].every((camp) => aCamps.includes(camp))
    ) {
      overlaps++;
    }
  }
  return overlaps;
}

export function part2() {
  const raw = fs.readFileSync("src/camp-cleanup/pairs.txt").toString();
  const pairs = raw.split("\r\n");

  let overlaps = 0;
  for (const pair of pairs) {
    const [a, b] = pair.split(",");
    const [aStart, aEnd] = a.split("-").map(Number);
    const [bStart, bEnd] = b.split("-").map(Number);
    const aCamps = Array(aEnd - aStart + 1)
      .fill(aStart)
      .map((number, i) => (number += i));
    const bCamps = Array(bEnd - bStart + 1)
      .fill(bStart)
      .map((number, i) => (number += i));
    if (
      [...aCamps].some((camp) => bCamps.includes(camp)) ||
      [...bCamps].some((camp) => aCamps.includes(camp))
    ) {
      overlaps++;
    }
  }
  return overlaps;
}
