import { useEffect, useState } from "react";
import { Movie } from "../types/movie.type";
import { getMovies } from "../hooks/getMovies";

export const Movies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  const loadBlockchainData = async () => {
    const currentMovies = await getMovies();
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
