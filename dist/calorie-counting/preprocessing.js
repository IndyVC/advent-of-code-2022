import { readFileSync } from "fs";
export function preproces() {
    const calories = readFileSync("./calories.txt").toString();
    console.log(calories, " TEST");
}
//# sourceMappingURL=preprocessing.js.map