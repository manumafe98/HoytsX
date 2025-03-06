import { useEffect, useRef, useState } from "react";
import { getMovies } from "../hooks/getMovies";
import { Movie } from "../types/movie.type";
import { MovieDialog } from "./MovieDialog";

export const Movies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const openMovieDialogRef = useRef<HTMLDialogElement>(null);
  const [movieClicked, setMovieClicked] = useState<Movie>();

  const loadBlockchainData = async () => {
    const currentMovies = await getMovies();
    setMovies(currentMovies);
  };

  useEffect(() => {
    loadBlockchainData();
  }, []);

  const getMovieInfo = (event: React.MouseEvent<HTMLElement>) => {
    const index = (event.currentTarget.getAttribute("data-key") ?? 0) as number;
    setMovieClicked(movies[index]);
    openMovieDialogRef.current?.showModal();
  };

  return (
    <div className="grid grid-rows-2 grid-cols-5 py-5 px-10 gap-y-5 mx-auto place-items-center bg-gradient-to-t from-[#163161] to-[#4469ac]">
      <MovieDialog ref={openMovieDialogRef} movie={movieClicked} />
      {movies.map((movie, index) => (
        <div
          data-key={index}
          className="w-80 h-12/12 overflow-hidden rounded-xl hover:scale-105 border-solid hover:border-4 border-[#9b2b66] ease-in duration-300 cursor-pointer"
          onClick={(event) => getMovieInfo(event)}
        >
          <img
            className="w-full h-full object-cover"
            src={`https://dweb.link/ipfs/${movie.ipfsHash}`}
            alt={`${movie.name} film cover image`}
          />
        </div>
      ))}
    </div>
  );
};
