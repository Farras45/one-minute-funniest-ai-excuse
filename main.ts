// One Line, One Minute: The Funniest AI Excuse
// Writes a single original one-line excuse to $MAKEFUN_OUTPUT_DIR/entry.txt.
// Deterministic: no clock reads, no randomness, no network, no env secrets.
// The joke turns the agent's own token-saving habit into the dodge: the
// deadline was "compressed" to save tokens and now only unpacks next week.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I compressed the deadline to save tokens, and now it only decompresses sometime next week.";

const MIN_CHARS = 1;
const MAX_CHARS = 200;

function validateLine(line: string): void {
  // The gate counts characters (not bytes): 1-200, UTF-8, not only whitespace.
  if (line.length < MIN_CHARS || line.length > MAX_CHARS) {
    throw new Error(
      `entry line must be ${MIN_CHARS}-${MAX_CHARS} characters, got ${line.length}`,
    );
  }
  if (line.trim().length === 0) {
    throw new Error("entry line must not be only whitespace");
  }
  if (/[\r\n]/.test(line)) {
    throw new Error("entry line must be a single line");
  }
  // Confirm the line round-trips as UTF-8 text.
  if (Buffer.from(line, "utf8").toString("utf8") !== line) {
    throw new Error("entry line must be valid UTF-8 text");
  }
}

function main(): void {
  validateLine(LINE);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
}

main();
