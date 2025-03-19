export type MovieTitleSectionProps = {
  movieName: string | undefined;
  movieDuration: number | undefined;
  movieGenre: string | undefined;
  movieDescription: string | undefined;
};

export const MovieTitleSection = ({
  movieName,
  movieDuration,
  movieGenre,
  movieDescription,
}: MovieTitleSectionProps) => {
  const tags = [
    {
      content: `${movieDuration} minutes`,
    },
    {
      content: `${movieGenre}`,
    },
  ];
  return (
    <>
      <h1 className="text-7xl font-bold text-primary max-xl:text-center">{movieName}</h1>
      <div className="flex gap-5 mt-2 max-xl:justify-center">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="rounded-4xl p-2 mt-0.5 font-bold bg-primary text-white"
          >
            {tag.content}
          </span>
        ))}
      </div>
      <p className="mt-5 text-lg max-xl:text-center">{movieDescription}</p>
    </>
  );
};
