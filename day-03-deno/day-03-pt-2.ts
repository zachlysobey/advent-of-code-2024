import { scanForUncorruptedConditionalMulSequences } from "./scanForUncorruptedConditionalMulSequences.ts";

const executeMulSequence = (mulSequence: string): number => {
  const [_, x, y] = mulSequence.match(/mul\((\d+),(\d+)\)/) ?? [];
  if (x === undefined || y === undefined) {
    throw new Error(`Invalid mul sequence: ${mulSequence}`);
  }
  return Number(x) * Number(y);
};

export const partTwo = (rawInput: string) => {
  const uncorruptedSequences = scanForUncorruptedConditionalMulSequences(
    rawInput,
  );
  let sum = 0;
  let enabled = true;
  const sequenceResults = uncorruptedSequences.forEach((sequence) => {
    if (sequence.includes("mul") && enabled) {
      sum += executeMulSequence(sequence);
    } else if (sequence === "don't()") {
      enabled = false;
    } else if (sequence === "do()") {
      enabled = true;
    }
  });
  return sum;
};
