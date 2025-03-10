import { Movie } from "../types/movie.type";

type MovieCardProps = {
  movie: Movie;
  index: number;
  getMovieInfo: (event: React.MouseEvent<HTMLElement>) => void;
};

export const MovieCard = ({ movie, index, getMovieInfo }: MovieCardProps) => {
  return (
    <div
      key={movie.id}
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
  );
};
