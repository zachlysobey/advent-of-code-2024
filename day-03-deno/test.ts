import { describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";

import { getValidMulSequenceRegExp } from "./getValidMulSequenceRegExp.ts";
import { scanForUncorruptedMulSequences } from "./scanForUncorruptedMulSequences.ts";

describe('validMulSequenceRegExp', () => {
  it('matches valid sequences', () => {
    const validSequences = [
      'mul(2,4)',
      'mul(5,5)',
      'mul(11,8)',
      'mul(8,5)',
    ];
    for (const sequence of validSequences) {
      expect(sequence).toMatch(getValidMulSequenceRegExp());
    }
  });

  it('does not match invalid sequences', () => {
    const invalidSequences = [
      'mul(4*',
      'mul(6,9!',
      '?(12,34)',
      'mul ( 2 , 4 )',
    ];
    for (const sequence of invalidSequences) {
      expect(sequence).not.toMatch(getValidMulSequenceRegExp());
    }
  });
});

describe("scanForUncorruptedMulSequences", () => {
  it("scans example sequence", () => {
    const input = 'xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))'
    const result = scanForUncorruptedMulSequences(input)
    expect(result).toEqual([
      'mul(2,4)',
      'mul(5,5)',
      'mul(11,8)',
      'mul(8,5)',
    ]);
  });
});
