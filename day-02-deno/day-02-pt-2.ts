export {}; // make this a module

const INPUT_FILE_NAME = './input.txt';

const getRawInput = async (fileName: string): Promise<string> => {
  const rawInput = await Deno.readTextFile(fileName);
  return rawInput;
}

type Report = number[];

const parseInput = (rawInput: string): Report[] => {
  return rawInput.trim().split("\n").reduce<Report[]>(
    (reports, line) => {
      const values = line.trim().split(/\s+/).map((value) => parseInt(value.trim()));
      return reports.concat([values]);
    },
    [],
  );
}

type Predicate<T> = (value: T) => boolean;

const reportPermutations = (report: Report): Report[] =>
  report.map((_, index) => report.filter((_, i) => i !== index));

const isReportSafe = (
  report: Report,
  options: { useProblemDampener: boolean } = { useProblemDampener: true }
) => {
  let isSafe = true;
  if (report[1] === report[0]) {
    isSafe = false;
  }
  if (report[1] < report[0]) {
    isSafe = report.reduce(
      (isSafe, level, index) => {
        if (index === 0) {
          return isSafe;
        }
        const previousLevel = report[index - 1];
        const difference = previousLevel - level;
        return isSafe && difference > 0 && difference <= 3;
      },
      true,
    );
  }
  if (report[1] > report[0]) {
    isSafe = report.reduce(
      (isSafe, level, index) => {
        if (index === 0) {
          return isSafe;
        }
        const previousLevel = report[index - 1];
        const difference = level - previousLevel;
        return isSafe && difference > 0 && difference <= 3;
      },
      true,
    );
  }
  if (isSafe) {
    return isSafe;
  }
  if (options.useProblemDampener) {
    console.log('checking with problem dampener');
    const problemDampener = (report: Report): boolean => {
      const permutations = reportPermutations(report);
      console.log('problem dampener permutations', permutations);
      return permutations.reduce(
        (isSafe, permutation) => {
          return isSafe || isReportSafe(permutation, { useProblemDampener: false });
        },
        false,
      );
    }
    isSafe = problemDampener(report)
    console.log('problem dampener result:', isSafe);
  }
  return isSafe;
};



const countMatchingPredicate = <T>(predicate: Predicate<T>) => {
  return (values: T[]): number => {
    return values.reduce(
      (acc, value, index) => {
        console.log('value', index);
        return predicate(value) ? acc + 1 : acc;
      },
      0
    )
  };
};

void async function main() {
  const rawInput: string = await getRawInput(INPUT_FILE_NAME);
  const parsedInput: Report[] = parseInput(rawInput);
  const countSafeReports = countMatchingPredicate<Report>(isReportSafe);
  const safeReportCount: number = countSafeReports(parsedInput);
  console.log(safeReportCount);
}();
