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

const sortLists = (lists: HistorianLocationLists): HistorianLocationLists => {
  return [
    lists[0].sort(),
    lists[1].sort(),
  ];
};

const calculateListLineDistances = (
  lists: HistorianLocationLists,
): LocationId[] => {
  if (lists[0].length !== lists[1].length) {
    throw new Error(
      "Lists must be of equal length;" +
        " found: " + lists[0].length +
        " and: " + lists[1].length,
    );
  }
  const sortedLists = sortLists(lists);
  return sortedLists[0].map(
    (value, index) => {
      return Math.abs(sortedLists[1][index] - value);
    },
  );
};

const sum = (values: number[]): number => {
  const result = values.reduce((acc, value) => acc + value, 0);
  console.log(values.map(String).join(" + ") + ` = ${result}`);
  return result;
};

const countOccurrences = (list: LocationId[]): Record<LocationId, number> => {
  return list.reduce<Record<LocationId, number>>((acc, id) => ({
    ...acc,
    [id]: (acc[id] || 0) + 1,
  }), {});
};

const calculateSimilarityScore = (
  occurrenceCounts: [
    Record<LocationId, number>,
    Record<LocationId, number>,
  ],
) => {
  console.log('occurrenceCounts[0]', occurrenceCounts[0])
  Object.entries(occurrenceCounts[0]).forEach(([locationId, count]) => {
    if (count > 1) {
      console.log(`locationId: ${locationId}, count: ${count}`);
    }
  });
  const combinedOccurrenceCounts: Record<LocationId, [number, number]> = Object
    .keys(occurrenceCounts[0])
    .concat(Object.keys(occurrenceCounts[1]))
    .reduce<Record<LocationId, [number, number]>>(
      (acc, locationId) => ({
        ...acc,
        [locationId]: [
          parseInt(occurrenceCounts[0][locationId] ?? "0", 10),
          parseInt(occurrenceCounts[1][locationId] ?? "0", 10),
        ],
      }),
      {},
    );
  // console.table(combinedOccurrenceCounts);
  const combinedOccurrenceCountsWithoutZeroes = (
    Object.fromEntries(
      Object.keys(combinedOccurrenceCounts)
        .filter((locationId) => (
          combinedOccurrenceCounts[locationId][0] !== 0 &&
          combinedOccurrenceCounts[locationId][1] !== 0
        ))
        .map(locationId => [locationId, combinedOccurrenceCounts[locationId]])
    )
  );
  // console.table(combinedOccurrenceCountsWithoutZeroes);
  return sum(
    Object.keys(occurrenceCounts[0])
      .map((s) => parseInt(s, 10))
      .map((locationId) => {
        // console.log(locationId, typeof locationId);
        const count1 = occurrenceCounts[0][locationId] || 0;
        const count2 = occurrenceCounts[1][locationId] || 0;
        const similarity = count1 * count2;
        if (similarity !== 0) {
          console.log(
            `${locationId}: ${count1} x ${count2} = ${count1 * count2}`,
          );
        }
        return similarity;
      })
      .filter(Boolean)
      .map((value) => {
        // console.log(value);
        return value;
      }),
  );
};

void async function main() {
  const rawInput: string = await Deno.readTextFile("./input.txt");
  const historianLocationLists = parseHistorianLocationLists(rawInput);

  // const sortedHistorianLocationLists = sortLists(historianLocationLists);
  // console.log(sortedHistorianLocationLists);
  // const distances = calculateListLineDistances(sortedHistorianLocationLists);
  // console.log(distances);
  // console.log("➡", sum(distances));

  // console.log(
  //   countOccurrences(historianLocationLists[0]),
  //   countOccurrences(historianLocationLists[1]),
  // );
  console.log(
    "sum = ",
    calculateSimilarityScore([
      countOccurrences(historianLocationLists[0]),
      countOccurrences(historianLocationLists[1]),
    ]),
  );

  // console.log(
  //   countOccurrences([
  //     1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  //     1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  //   ])
  // )
}();
