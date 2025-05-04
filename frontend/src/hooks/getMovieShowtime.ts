import { getContract } from "./getContract";

export const getMovieShowtime = async (
  movieId: number,
  date: string,
  time: string,
) => {
  const contract = getContract();
  return await contract.getMovieShowtimeByDateAndTime(movieId, date, time);
};
