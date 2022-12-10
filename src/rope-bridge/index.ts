import fs, { Dir } from "fs";
type Direction = "U" | "L" | "R" | "D";

class Rope {
  knots: Knot[];

  constructor(count: number) {
    this.knots = new Array(count).fill(null).map((_, i) => new Knot(0, 0, i));
  }

  moveHead(direction: Direction) {
    const head = this.knots[0];
    switch (direction) {
      case "U":
        head.y += 1;
        break;
      case "R":
        head.x += 1;
        break;
      case "D":
        head.y -= 1;
        break;
      case "L":
        head.x -= 1;
        break;
    }
  }

  moveKnot(knot: Knot, ref: Knot) {
    if (!knot.isTouching(ref)) {
      const xDistance = ref.x - knot.x;
      const yDistance = ref.y - knot.y;
      knot.x += Math.abs(xDistance) >= 1 ? Math.sign(xDistance) : 0;
      knot.y += Math.abs(yDistance) >= 1 ? Math.sign(yDistance) : 0;
    }
  }

  get tail() {
    return this.knots[this.knots.length - 1];
  }
}

class Knot {
  constructor(public x: number, public y: number, public i: number) {}

  isTouching(knot: Knot) {
    return Math.abs(knot.x - this.x) <= 1 && Math.abs(knot.y - this.y) <= 1;
  }
}

export function part1() {
  const knotCount = 10;
  const rope = new Rope(knotCount);
  const raw = fs.readFileSync("src/rope-bridge/motions.txt").toString();
  const instructions = raw.split("\n");
  const tails = [];

  for (const instruction of instructions) {
    const [direction, steps] = instruction.split(" ");
    for (let i = 0; i < parseInt(steps); i++) {
      rope.moveHead(direction as Direction);

      for (let k = 1; k < knotCount; k++) {
        rope.moveKnot(rope.knots[k], rope.knots[k - 1]);
      }
      tails.push({ ...rope.tail });
    }
  }

  const visited = {};
  for (const tail of tails) {
    const key = `${tail.x}-${tail.y}`;
    visited[key] = visited[key] ? visited[key] + 1 : 1;
  }

  console.log(visited);
  return Object.keys(visited).length;
}
