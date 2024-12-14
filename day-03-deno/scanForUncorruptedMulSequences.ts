import { getValidMulSequenceRegExp } from "./getValidMulSequenceRegExp.ts";

export const scanForUncorruptedMulSequences = (input: string): string[] => {
  const matches = input.matchAll(getValidMulSequenceRegExp());
  const matchesArray = [...matches].map(match => match[0]);
  return matchesArray
};