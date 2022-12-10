import { sign } from "crypto";
import fs from "fs";

class Command {
  public type: "addx" | "noop";
  private _value: number;

  constructor(public command: string) {
    const [instruction, value] = command.split(" ");
    this.type = instruction.trim() as "addx" | "noop";
    this._value = parseFloat(value);
  }

  get value() {
    return this._value;
  }
}

export function main() {
  const raw = fs.readFileSync("src/cathode-ray-tube/input.txt").toString();
  const commands = raw.split("\n").map((c) => new Command(c));

  let cycle = 0;
  const cycles = commands.reduce(
    (cycles: { [key: number]: Command }, command, i) => {
      if (command.type === "addx") {
        cycles[cycle + 1] = null;
        cycles[cycle + 2] = command;
        cycle += 2;
      } else {
        cycles[cycle + 1] = null;
        cycle += 1;
      }

      return cycles;
    },
    {}
  );

  let signals = 0;
  let X = 1;
  let CRT: string[] = [];
  let row = 0;
  for (const [c, command] of Object.entries(cycles)) {
    // Handle cycle
    const cycle = parseInt(c);
    if ((cycle - 20) % 40 === 0) {
      signals += X * cycle;
    }

    // CRT
    console.log(
      `Cycle: ${cycle}  drawing: ${
        [X - 1, X, X + 1].includes(cycle) ? "#" : "."
      }`
    );

    const relative = cycle % 40;

    CRT.push([X - 1, X, X + 1].includes(relative - 1) ? "#" : ".");

    // Handle command
    if (command && command.type === "addx") {
      X += command.value;
      console.log(`Register is now add ${X}`);
    }
  }

  let from = 0;
  for (let i = 0; i < CRT.length; i++) {
    if (i % 40 === 0) {
      console.log(CRT.slice(from, from + 40).join(" "));
      from += 40;
    }
  }

  return signals;
}
