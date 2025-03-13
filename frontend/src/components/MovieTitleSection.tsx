import { Movie } from "@/types/movie.type";

type MovieTitleSectionProps = {
  movie: Movie | undefined;
};

export const MovieTitleSection = ({ movie }: MovieTitleSectionProps) => {

  const tags = [
    {
      content: `${movie?.duration} minutes`,
    },
    {
      content: `${movie?.genre}`,
    },
  ];

  return (
    <div className="flex flex-col col-span-2">
      <h1 className="text-7xl font-bold text-primary">{movie?.name}</h1>
      <div className="flex gap-5 mt-2">
        {tags.map((tag, index) => (
          <span key={index} className="rounded-4xl p-2 mt-0.5 font-bold bg-primary text-white">
            {tag.content}
          </span>
        ))}
      </div>
      <p className="mt-5 text-lg">{movie?.description}</p>
    </div>
  );
};
