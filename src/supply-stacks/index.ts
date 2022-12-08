import fs from "fs";

export function part1() {
  const raw = fs.readFileSync("src/supply-stacks/crates.txt").toString();
  const containers = raw
    .split("\r\n")
    .reduce((matrix: (string | null)[][], row) => {
      const crates = row.match(/.{1,4}/gi);
      for (let i = 0; i < crates.length; i++) {
        const crate = crates[i].match(/[a-z]/gi)?.[0] ?? null;
        if (!matrix[i]) matrix[i] = [];
        if (crate !== null) matrix[i].push(crate);
      }
      return matrix;
    }, []);

  const commands = fs
    .readFileSync("src/supply-stacks/commands.txt")
    .toString()
    .split("\r\n");

  for (const command of commands) {
    const [amount, from, to] = command
      .replace(/(move|from|to)/gi, "")
      .trim()
      .split(/\s/gi)
      .filter(Boolean)
      .map(Number);
    containers[to - 1] = [
      ...containers[from - 1].splice(0, amount).reverse(),
      ...containers[to - 1],
    ];
  }

  const stack = containers.reduce((stack, row) => (stack += row[0] || ""), "");
  return stack;
}

export function part2() {
  const raw = fs.readFileSync("src/supply-stacks/crates.txt").toString();
  const containers = raw
    .split("\r\n")
    .reduce((matrix: (string | null)[][], row) => {
      const crates = row.match(/.{1,4}/gi);
      for (let i = 0; i < crates.length; i++) {
        const crate = crates[i].match(/[a-z]/gi)?.[0] ?? null;
        if (!matrix[i]) matrix[i] = [];
        if (crate !== null) matrix[i].push(crate);
      }
      return matrix;
    }, []);

  const commands = fs
    .readFileSync("src/supply-stacks/commands.txt")
    .toString()
    .split("\r\n");

  for (const command of commands) {
    const [amount, from, to] = command
      .replace(/(move|from|to)/gi, "")
      .trim()
      .split(/\s/gi)
      .filter(Boolean)
      .map(Number);
    containers[to - 1] = [
      ...containers[from - 1].splice(0, amount),
      ...containers[to - 1],
    ];
  }

  const stack = containers.reduce((stack, row) => (stack += row[0] || ""), "");
  return stack;
}
