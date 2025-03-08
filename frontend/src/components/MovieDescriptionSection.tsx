import { Movie } from "../types/movie.type";

type MovieDescriptionSectionProps = {
  movie: Movie | undefined;
};

export const MovieDescriptionSection = ({
  movie,
}: MovieDescriptionSectionProps) => {
  return (
    <div className="flex flex-col items-center row-span-2 border-1 border-solid border-gray-200 shadow-xl rounded-md p-5">
      <img
        className="h-2/3 rounded-md w-90"
        src={`https://dweb.link/ipfs/${movie?.ipfsHash}`}
        alt={`${movie?.name} film cover image`}
      />
      <div className="grid grid-cols-2 w-90 mt-10">
        <span className="font-bold text-lg mt-2">Original Title:</span>
        <span className="mt-2 text-lg">{movie?.name}</span>
        <span className="font-bold text-lg mt-2">Genre:</span>
        <span className="mt-2 text-lg">{movie?.genre}</span>
        <span className="font-bold text-lg mt-2">Director:</span>
        <span className="mt-2 text-lg">{movie?.director}</span>
        <span className="font-bold text-lg mt-2">Actors:</span>
        <span className="mt-2 text-lg">{`${movie?.actors[0]}, ${movie?.actors[1]}, ${movie?.actors[2]}`}</span>
        <span className="font-bold text-lg mt-2">Duration:</span>
        <span className="mt-2 text-lg">{movie?.duration} minutes</span>
      </div>
    </div>
  );
};
