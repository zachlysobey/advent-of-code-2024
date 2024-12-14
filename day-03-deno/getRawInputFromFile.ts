export const getRawInputFromFile = async (fileName: string): Promise<string> => {
  const rawInput = await Deno.readTextFile(fileName);
  return rawInput;
}
