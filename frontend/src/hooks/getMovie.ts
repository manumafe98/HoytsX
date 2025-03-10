import { Movie } from "@/types/movie.type";
import { getContract } from "./getContract";
import { getProvider } from "./getProvider";

export const getMovie = async (id: number): Promise<Movie> => {
  const provider = getProvider();
  const contract = await getContract(provider);
  return await contract.getMovie(id);
};
