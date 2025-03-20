import { getMovies } from "@/hooks";
import { Movie } from "@/types/movie.type";
import { useEffect, useRef, useState } from "react";
import { MovieCard } from "./MovieCard";
import { MovieDialog } from "./MovieDialog";

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
    <div className="grid grid-rows-2 grid-cols-4 max-2xl:grid-cols-3 max-xl:grid-rows-3 max-xl:grid-cols-2 max-md:grid-cols-1 py-5 px-10 gap-y-5 mx-auto place-items-center bg-gradient-to-t from-background-gradiant-start to-background-gradiant-end">
      <MovieDialog ref={openMovieDialogRef} movie={movieClicked} />
      {movies.map((movie, index) => (
        <MovieCard
          key={index}
          movie={movie}
          index={index}
          getMovieInfo={getMovieInfo}
        />
      ))}
    </div>
  );
};
