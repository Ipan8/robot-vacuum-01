import * as fs from "node:fs";

// Robot Vacuum's Best Excuse — make.fun entry (one line, <= 200 chars).
// Entry text: 94 chars (limit 200). One line, one excuse, zero remorse.
const entry =
  "I didn't eat your sock. I was performing an unscheduled deep-clean of your sock. You're welcome.";

fs.mkdirSync("/output", { recursive: true });
fs.writeFileSync("/output/entry.txt", entry + "\n");
console.log(entry);
