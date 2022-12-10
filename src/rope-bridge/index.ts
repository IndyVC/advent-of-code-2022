import fs from "fs";

type Coord = {
  x: number;
  y: number;
};

export function part1() {
  const raw = fs.readFileSync("src/rope-bridge/motions.txt").toString();
  const instructions = raw.split("\n");

  const tails: Coord[] = [];
  const knots: Coord[] = [
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ];

  for (const instruction of instructions) {
    const [direction, amount] = instruction.split(" ");
    console.log(`------------ ${direction} ${amount} --------------`);
    for (let i = 0; i < parseInt(amount); i++) {
      let old: Coord = null;
      for (let k = 0; k < knots.length; k++) {
        const knot = knots[k];
        const copy = { ...knot };
        const ref = knots[k - 1] ?? null;
        const linked = k === 0 ? true : isLinked(knot, ref);
        if (!linked || k === 0) move(direction, knot, ref, old);
        old = { ...copy };
        console.log(k, knot);
        if (k === knots.length - 1) tails.push({ ...knot });
      }
      console.log("--moved--");
    }
  }

  const visited: { [key: string]: number } = {};
  for (const tail of tails) {
    const key = `${tail.x}-${tail.y}`;
    visited[key] = visited[key] ? visited[key] + 1 : 1;
  }

  console.log(tails);
  return Object.keys(visited).length;
}

function move(
  direction: string,
  knot: Coord,
  ref: Coord = null,
  old: Coord = null
) {
  switch (direction) {
    case "U": {
      knot.y = old ? old.y : knot.y + 1;
      if (knot && ref) {
        const isDiagonal = knot.x !== ref.x;
        if (isDiagonal) {
          knot.x = ref.x >= knot.x ? knot.x + 1 : knot.x - 1;
        }
      }
      break;
    }
    case "R": {
      knot.x = old ? old.x : knot.x + 1;
      if (knot && ref) {
        const isDiagonal = knot.y !== ref.y;
        if (isDiagonal) {
          knot.y = ref.y >= knot.y ? knot.y + 1 : knot.y - 1;
        }
      }
      break;
    }
    case "D": {
      knot.y = old ? old.y + 1 : knot.y - 1;
      if (knot && ref) {
        const isDiagonal = knot.x !== ref.x;
        if (isDiagonal) {
          knot.x = ref.x >= knot.x ? knot.x + 1 : knot.x - 1;
        }
      }
      break;
    }
    case "L": {
      knot.x = old ? old.x : knot.x - 1;
      if (knot && ref) {
        const isDiagonal = knot.y !== ref.y;
        if (isDiagonal) {
          knot.y = ref.y >= knot.y ? knot.y + 1 : knot.y - 1;
        }
      }
      break;
    }
  }
}

function isLinked(knot: Coord, ref: Coord) {
  return Math.abs(knot.x - ref.x) <= 1 && Math.abs(knot.y - ref.y) <= 1;
}
