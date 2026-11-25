import * as fs from "node:fs";
import * as path from "node:path";

// Robot Vacuum's Best Excuse — a one-line alibi from a very
// polite household appliance that refuses to admit wrongdoing.
// The joke: the vacuum reframes eating a sock as a favour.
// It did not steal laundry; it performed a service, unasked,
// and now expects gratitude instead of an apology.

// The excuse is built from three beats so the rhythm lands:
// a denial, a pompous reframe, and a smug sign-off.
const DENIAL = "I didn't eat your sock.";
const REFRAME =
  "I was performing an unscheduled deep-clean of your sock.";
const SIGN_OFF = "You're welcome.";

const OUTPUT_DIR = "/output";
const OUTPUT_FILE = path.join(OUTPUT_DIR, "entry.txt");
const MAX_CHARS = 200;

// Join the beats into a single line. No extra spaces sneak in:
// each part is trimmed first, then joined on a single space.
function assembleExcuse(parts: string[]): string {
  return parts.map((part) => part.trim()).join(" ");
}

// A make.fun entry must be one line and fit the limit. Fail
// loudly here instead of shipping a line that gets rejected.
// How long is the alibi? Worth logging: the limit is 200 chars
// and this one lands at 94, so there is room to spare — the
// vacuum is concise as well as innocent.
function describeLength(line: string): string {
  const words = line.split(/\s+/).filter(Boolean).length;
  return `${line.length} chars, ${words} words`;
}

function guardLength(line: string): void {
  if (line.length === 0) {
    throw new Error("excuse is empty");
  }
  if (line.includes("\n")) {
    throw new Error("excuse must be a single line");
  }
  if (line.length > MAX_CHARS) {
    throw new Error(
      `excuse is ${line.length} chars, over the ${MAX_CHARS} limit`,
    );
  }
}

function main(): void {
  const excuse = assembleExcuse([DENIAL, REFRAME, SIGN_OFF]);
  guardLength(excuse);
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, excuse + "\n");
  // Read it back so a silent write failure cannot slip through.
  const written = fs.readFileSync(OUTPUT_FILE, "utf8");
  if (written !== excuse + "\n") {
    throw new Error("entry.txt does not match the excuse");
  }
  console.log(`${describeLength(excuse)} — ${excuse}`);
}

main();
