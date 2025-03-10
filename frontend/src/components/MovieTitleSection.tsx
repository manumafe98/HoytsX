import { Movie } from "../types/movie.type";

type MovieTitleSectionProps = {
  movie: Movie | undefined;
};

export const MovieTitleSection = ({ movie }: MovieTitleSectionProps) => {
  return (
    <div className="flex flex-col col-span-2">
      <h1 className="text-7xl font-bold text-outline">{movie?.name}</h1>
      <div className="flex gap-5 mt-2">
        <span className="border-1 border-black rounded-4xl p-1 font-bold bg-[#9b2b66] text-white">
          {movie?.duration} minutes
        </span>
        <span className="border-1 border-black rounded-4xl p-1 font-bold bg-[#9b2b66] text-white">
          {movie?.genre}
        </span>
      </div>
      <p className="mt-5 text-lg">{movie?.description}</p>
    </div>
  );
};
