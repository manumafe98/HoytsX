import { Movie } from "@/types/movie.type";
import { getContract } from "./getContract";

export const getMovies = async () => {
  const contract = getContract();
  const totalMovies = Number(await contract.getTotalMovies()) + 1;
  const movies: Movie[] = [];

  for (let index = 1; index < totalMovies; index++) {
    const movie = await contract.getMovieDetails(index);
    movies.push(movie);
  }

  return movies;
};
