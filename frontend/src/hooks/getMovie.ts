import { Movie } from "../types/movie.type";
import { getContract } from "./getContract";

export const getMovie = async (id: number): Promise<Movie> => {
  const contract = await getContract();
  return await contract.getMovie(id);
};
