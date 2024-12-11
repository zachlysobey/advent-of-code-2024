type LocationId = number;

type HistorianLocationLists = [
  LocationId[], // Historian Group 1
  LocationId[], // Historian Group 2
];

const parseHistorianLocationLists = (input: string): HistorianLocationLists => {
  return input.trim().split("\n").reduce<[LocationId[], LocationId[]]>(
    (lists, line) => {
      const values = line.trim().split(/\s+/).map((value) => value.trim());
      if (values.length !== 2) {
        throw new Error("Invalid input: " + line);
      }
      if (values.some((value) => isNaN(parseInt(value)))) {
        throw new Error("Invalid input: " + line);
      }
      return [
        lists[0].concat([parseInt(values[0])]),
        lists[1].concat([parseInt(values[1])]),
      ];
    },
    [[], []],
  )
};

const sortLists = (lists: HistorianLocationLists): HistorianLocationLists => {
  return [
    lists[0].sort(),
    lists[1].sort(),
  ];
};

const calculateListLineDistances = (lists: HistorianLocationLists): LocationId[] => {
  if (lists[0].length !== lists[1].length) {
    throw new Error(
      "Lists must be of equal length;" +
      " found: " + lists[0].length +
      " and: " + lists[1].length
    );
  }
  const sortedLists = sortLists(lists);
  return sortedLists[0].map(
    (value, index) => {
      return Math.abs(sortedLists[1][index] - value);
    }
  )
}

const sum = (values: number[]): number => values.reduce((acc, value) => acc + value, 0);

void async function main () {
  const rawInput: string = await Deno.readTextFile("./input.txt");
  const historianLocationLists = parseHistorianLocationLists(rawInput);
  const sortedHistorianLocationLists = sortLists(historianLocationLists);
  console.log(sortedHistorianLocationLists);
  const distances = calculateListLineDistances(sortedHistorianLocationLists);
  console.log(distances);
  console.log('➡', sum(distances));
}();


