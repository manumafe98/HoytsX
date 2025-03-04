import { useEffect, useState } from "react";
import { Movie } from "../types/movie.type";
import { getContract } from "../hooks/getContract";

export const Movies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  const loadBlockchainData = async () => {
    const contract = await getContract();
    const totalMovies = Number(await contract.totalMovies()) + 1;
    const currentMovies: Movie[] = [];

    for (let index = 1; index < totalMovies; index++) {
      const movie = await contract.getMovie(index);
      currentMovies.push(movie);
    }

    setMovies(currentMovies);
  }

  useEffect(() => {
    loadBlockchainData();
  }, [])

  return (
    <div className="grid grid-rows-2 grid-cols-5 py-5 px-10 gap-y-5 mx-auto place-items-center">
      {movies.map((movie) => (
        <div className="w-80 overflow-hidden rounded-xl hover:scale-105 transform duration-300">
          <img className="object-cover" src={`https://dweb.link/ipfs/${movie.ipfsHash}`} alt={`${movie.name} film cover image`} />
        </div>
      ))}
    </div>
  )
}
