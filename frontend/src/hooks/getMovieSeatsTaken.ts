import { getContract } from "./getContract";

export const getMovieSeatsTaken = async (
  movieId: number,
  date: string,
  time: string,
): Promise<number[]> => {
  const contract = getContract();
  return await contract.getSeatsTaken(movieId, date, time);
};
