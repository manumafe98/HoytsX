import { Movie } from "../types/movie.type";
import { getContract } from "./getContract";

export const getMovies = async () => {
  const contract = await getContract();
  const totalMovies = Number(await contract.totalMovies()) + 1;
  const movies: Movie[] = [];

  for (let index = 1; index < totalMovies; index++) {
    const movie = await contract.getMovie(index);
    movies.push(movie);
  }

  return movies;
};
