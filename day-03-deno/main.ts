import { getRawInputFromFile } from "./getRawInputFromFile.ts";
import { partOne } from "./day-03-pt-1.ts";
import { partTwo } from "./day-03-pt-2.ts";

const INPUT_FILE_NAME = './input.txt';

void async function main (inputFileName: string) {
  const rawInput = await getRawInputFromFile(inputFileName);
  console.log(partOne(rawInput));
  console.log(partTwo(rawInput));
}(INPUT_FILE_NAME);
