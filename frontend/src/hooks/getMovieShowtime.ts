import { getContract } from "./getContract";
import { getProvider } from "./getProvider";

export const getMovieShowtime = async (
  movieId: number,
  date: string,
  time: string,
) => {
  const provider = getProvider();
  const contract = await getContract(provider);
  return await contract.getMovieShowtimeByDateAndTime(movieId, date, time);
};
