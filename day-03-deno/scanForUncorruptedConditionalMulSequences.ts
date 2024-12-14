import { getValidSequenceRegExp } from "./getValidSequenceRegExp.ts";

export const scanForUncorruptedConditionalMulSequences = (input: string): string[] => {
  const matches = input.matchAll(getValidSequenceRegExp());
  const matchesArray = [...matches].map(match => match[0]);
  return matchesArray;
};
