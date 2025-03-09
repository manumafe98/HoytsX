import { getContract } from "./getContract";
import { getProvider } from "./getProvider";

export const getMovieSeatsTaken = async (
  movieId: number,
): Promise<number[]> => {
  const provider = getProvider();
  const contract = await getContract(provider);
  return await contract.getSeatsTaken(movieId);
};
