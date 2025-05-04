import { getContract } from "./getContract";

export const getMovieTimesByDate = async (
  id: number,
  date: string,
): Promise<string[]> => {
  const contract = getContract();
  return contract.getMovieShowtimeTimesByDate(id, date);
};
