import fs from "fs";

const ENEMY_ROCK = "A";
const ENEMY_PAPER = "B";
const ENEMY_SCISSORS = "C";

const MY_ROCK = "X";
const MY_PAPER = "Y";
const MY_SCISSORS = "Z";

const USED_ROCK = 1;
const USED_PAPER = 2;
const USED_SCISSORS = 3;

const LOST = 0;
const DRAW = 3;
const WON = 6;

type Shape = "rock" | "paper" | "scissor";
type Outcome = "win" | "loss" | "draw";

export function part1() {
  const raw = fs.readFileSync("src/rock-paper-scissors/matchup.txt").toString();
  const fragments = raw.split("\n");
  let total = 0;
  for (const fragment of fragments) {
    const [enemy, mine] = fragment.split(" ");
    if (enemy && mine) {
      const result = getResult(convertEnemy(enemy), convertMine(mine));
      console.log(enemy, mine, result);
      total += result;
    }
  }
  return total;
}

export function part2() {
  const raw = fs.readFileSync("src/rock-paper-scissors/matchup.txt").toString();
  const fragments = raw.split("\n");
  let total = 0;
  for (const fragment of fragments) {
    const [enemy, outcome] = fragment.split(" ");
    const mine: Shape = getMissingShape(outcome, convertEnemy(enemy));
    if (enemy && mine) {
      const result = getResult(convertEnemy(enemy), mine);
      console.log(enemy, mine, result);
      total += result;
    }
  }
  return total;
}

/**
 *
 * @param enemy
 * @param mine
 * @returns wether I won, it was a draw or I lost.
 */
function match(enemy: Shape, mine: Shape): Outcome {
  if (enemy === mine) return "draw";

  // all win conditions
  if (enemy === "rock" && mine === "paper") return "win";
  if (enemy === "paper" && mine === "scissor") return "win";
  if (enemy === "scissor" && mine === "rock") return "win";

  // all loss conditions
  if (enemy === "rock" && mine === "scissor") return "loss";
  if (enemy === "paper" && mine === "rock") return "loss";
  if (enemy === "scissor" && mine === "paper") return "loss";
}

function convertEnemy(input: string): Shape {
  if (ENEMY_ROCK === input) return "rock";
  if (ENEMY_PAPER === input) return "paper";
  if (ENEMY_SCISSORS === input) return "scissor";
}

function convertMine(input: string): Shape {
  if (MY_ROCK === input) return "rock";
  if (MY_PAPER === input) return "paper";
  if (MY_SCISSORS === input) return "scissor";
}

function getMissingShape(outcome: string, enemy: Shape): Shape {
  // Y === draw
  if (outcome === "Y") return enemy;
  // X === lose
  if (outcome === "X") {
    if (enemy === "paper") return "rock";
    if (enemy === "scissor") return "paper";
    if (enemy === "rock") return "scissor";
  }

  //Z === win
  if (outcome === "Z") {
    if (enemy === "paper") return "scissor";
    if (enemy === "scissor") return "rock";
    if (enemy === "rock") return "paper";
  }
}

function getResult(enemy: Shape, mine: Shape) {
  let result = 0;
  const outcome = match(enemy, mine);
  if (mine === "paper") result += USED_PAPER;
  if (mine === "rock") result += USED_ROCK;
  if (mine === "scissor") result += USED_SCISSORS;

  if (outcome === "draw") result += DRAW;
  if (outcome === "win") result += WON;
  return result;
}
