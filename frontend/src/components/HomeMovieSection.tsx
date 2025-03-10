import { useEffect, useRef, useState } from "react";
import { getMovies } from "../hooks/getMovies";
import { Movie } from "../types/movie.type";
import { MovieDialog } from "./MovieDialog";
import { MovieCard } from "./MovieCard";

export const HomeMovieSection = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [movieClicked, setMovieClicked] = useState<Movie>();
  const openMovieDialogRef = useRef<HTMLDialogElement>(null);

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
    <div className="grid grid-rows-2 grid-cols-4 py-5 px-10 gap-y-5 mx-auto place-items-center bg-gradient-to-t from-[#163161] to-[#4469ac]">
      <MovieDialog ref={openMovieDialogRef} movie={movieClicked} />
      {movies.map((movie, index) => (
        <MovieCard movie={movie} index={index} getMovieInfo={getMovieInfo} />
      ))}
    </div>
  );
};
