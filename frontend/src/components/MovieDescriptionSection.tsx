import { Movie } from "@/types/movie.type";
import { Fragment } from "react";

type MovieDescriptionSectionProps = {
  movie: Movie | undefined;
};

export const MovieDescriptionSection = ({
  movie,
}: MovieDescriptionSectionProps) => {
  const movieData = [
    {
      category: "Original Title:",
      value: `${movie?.name}`,
    },
    {
      category: "Genre:",
      value: `${movie?.genre}`,
    },
    {
      category: "Director:",
      value: `${movie?.director}`,
    },
    {
      category: "Actors:",
      value: `${movie?.actors[0]}, ${movie?.actors[1]}, ${movie?.actors[2]}`,
    },
    {
      category: "Duration:",
      value: `${movie?.duration} minutes`,
    },
  ];

  return (
    <div className="flex flex-col items-center row-span-2 border-1 border-solid border-gray-200 shadow-xl rounded-md p-5 max-xl:col-span-2 max-xl:row-span-1">
      <img
        className="h-[540px] rounded-md w-90 "
        src={`https://dweb.link/ipfs/${movie?.ipfsHash}`}
        alt={`${movie?.name} film cover image`}
      />
      <div className="grid grid-cols-2 w-90 mt-10 max-sm:px-2">
        {movieData.map((data, index) => (
          <Fragment key={index}>
            <span className="font-bold text-lg mt-2">{data.category}</span>
            <span className="mt-2 text-lg">{data.value}</span>
          </Fragment>
        ))}
      </div>
    </div>
  );
};
