import { dir } from "console";
import fs from "fs";
import Directory from "./Directory";
import File from "./File";

const TOTAL_DISK_SPACE = 70000000;
const MINIMUM_SPACE_REQUIRED_FOR_UPDATE = 30000000;

class Terminal {
  private root: Directory;
  private reference: Directory;

  constructor() {
    this.root = new Directory("/");
    this.reference = null;
  }

  /**
   * Read terminal output and start interpreting
   * @returns
   */
  initialize() {
    const raw = fs
      .readFileSync("src/no-space-on-device/terminal.txt")
      .toString();
    raw.split("\n").forEach((line) => this.interpret(line));
  }

  /**
   * Propagator
   * @param line
   */
  interpret(line: string) {
    const isCommand = line.startsWith("$");
    if (isCommand) {
      const [_, command, argument] = line.split(" ");
      if (command === "cd") this.changeDirectory(argument);
      // skip ls command, just keep reading lines in initialize.
    } else {
      // create directory/file
      const isDirectory = line.startsWith("dir");
      if (isDirectory) {
        const [_, name] = line.split(" ");
        const directory = new Directory(name);
        this.reference.addDirectory(directory);
      } else {
        const [size, name] = line.split(" ");
        const file = new File(name, parseInt(size));
        this.reference.addFile(file);
      }
    }
  }

  /**
   * cd
   * @param line
   */
  changeDirectory(directory: string) {
    if (directory === "/") this.reference = this.root;
    else if (directory === "..") this.reference = this.reference.parent;
    else {
      this.reference = this.reference.directories.find(
        (d) => d.name === directory
      );
    }
  }

  solution1() {
    const allDirectories = this.root.flatten();
    return allDirectories
      .map((dir) => dir.size())
      .filter((size) => size <= 100000)
      .reduce((total, size) => (total += size), 0);
  }

  solution2() {
    const allDirectories = this.root.flatten();
    const availableSpace = TOTAL_DISK_SPACE - this.root.size();
    const missingSpace = MINIMUM_SPACE_REQUIRED_FOR_UPDATE - availableSpace;
    const directoriesThatWouldFreeUpSpace = allDirectories.filter(
      (dir) => dir.size() >= missingSpace
    );
    const lowest = Math.min(
      ...directoriesThatWouldFreeUpSpace.map((dir) => dir.size())
    );

    return lowest;
  }
}

export default Terminal;
