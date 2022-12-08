import Terminal from "./Terminal";

export function part1() {
  const terminal = new Terminal();
  terminal.initialize();
  return terminal.solution1();
}

export function part2() {
  const terminal = new Terminal();
  terminal.initialize();
  return terminal.solution2();
}
