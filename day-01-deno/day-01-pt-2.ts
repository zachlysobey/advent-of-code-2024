export {}; // make this a module

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
  );
};

const createOccurrenceMap = (list: LocationId[]): Map<LocationId, number> => {
  return list.reduce<Map<LocationId, number>>((acc, id) => {
    const count = acc.get(id) ?? 0;
    acc.set(id, count + 1);
    return acc;
  }, new Map());
}

const calculateSimilarityScore = (locationLists: HistorianLocationLists): number => {
  const list2OccurrenceMap = createOccurrenceMap(locationLists[1]);
  return locationLists[0].reduce<number>((acc, id) => {
    return acc + id * (list2OccurrenceMap.get(id) ?? 0);
  }, 0);
}

void async function main () {
  const rawInput: string = await Deno.readTextFile("./input.txt");
  const locationLists: HistorianLocationLists = parseHistorianLocationLists(rawInput);
  const similarityScore: number = calculateSimilarityScore(locationLists)
  console.log(similarityScore);
}();
