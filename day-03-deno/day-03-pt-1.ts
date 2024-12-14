import { scanForUncorruptedMulSequences } from "./scanForUncorruptedMulSequences.ts";

const executeMulSequence = (mulSequence: string): number => {
  const [_, x, y] = mulSequence.match(/mul\((\d+),(\d+)\)/) ?? [];
  if (x === undefined || y === undefined) {
    throw new Error(`Invalid mul sequence: ${mulSequence}`);
  }
  return Number(x) * Number(y);
}

const sum = (numbers: number[]): number => numbers.reduce((acc, n) => acc + n, 0);


export const partOne = (rawInput: string) => {
  const uncorruptedMulSequences = scanForUncorruptedMulSequences(rawInput);
  const mulSequenceResults = uncorruptedMulSequences.map(executeMulSequence);
  return sum(mulSequenceResults)
}
