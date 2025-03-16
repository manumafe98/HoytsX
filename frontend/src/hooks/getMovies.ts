import { Movie } from "@/types/movie.type";
import { getContract } from "./getContract";
import { getProvider } from "./getProvider";

export const getMovies = async () => {
  const provider = getProvider();
  const contract = await getContract(provider);
  const totalMovies = Number(await contract.totalMovies()) + 1;
  const movies: Movie[] = [];

  for (let index = 1; index < totalMovies; index++) {
    const movie = await contract.getMovieDetails(index);
    movies.push(movie);
  }

  return movies;
};
