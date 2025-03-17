import { getMovieDates } from "@/hooks/getMovieDates";
import { getMovieTimesByDate } from "@/hooks/getMovieTimesByDate";
import { ArrowDown } from "@/icons/ArrowDown";
import { ArrowUp } from "@/icons/ArrowUp";
import { Movie } from "@/types/movie.type";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type MovieTitleSectionProps = {
  movie: Movie | undefined;
};

export const MovieTitleSection = ({ movie }: MovieTitleSectionProps) => {
  const { id } = useParams();
  const [movieDates, setMovieDates] = useState<string[]>([]);
  const [movieTimesByDate, setMovieTimesByDate] = useState<Record<string, string[]>>({})
  const [isDateOpen, setIsDateOpen] = useState<Record<string, boolean>>({});
  const tags = [
    {
      content: `${movie?.duration} minutes`,
    },
    {
      content: `${movie?.genre}`,
    },
  ];

  useEffect(() => {
    const fetcthMovieDates = async () => {
      const dates = await getMovieDates(Number(id));
      setMovieDates(dates);
    }
    fetcthMovieDates();
  }, [])
  
  const openDate = async (date: string) => {
    const times = await getMovieTimesByDate(Number(id), date);
    setMovieTimesByDate((prevState) => ({
      ...prevState,
      [date]: times,
    }));

    setIsDateOpen(prevState => ({
      ...prevState,
      [date]: true,
    }));
  }

  const closeDate = (date: string) => {
    setIsDateOpen((prevState) => ({
      ...prevState,
      [date]: false,
    }));
  }

  return (
    <div className="flex flex-col col-span-2 row-span-2">
      <h1 className="text-7xl font-bold text-primary">{movie?.name}</h1>
      <div className="flex gap-5 mt-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="rounded-4xl p-2 mt-0.5 font-bold bg-primary text-white"
          >
            {tag.content}
          </span>
        ))}
      </div>
      <p className="mt-5 text-lg">{movie?.description}</p>
      <div className="flex flex-col mt-5">
        {movieDates.map((date, index) => (
          <>
            <div
              key={index}
              className="flex items-center justify-between p-5 w-2/3 h-10 border-1 border-solid border-gray-200 shadow-md rounded-sm mt-2"
            >
              <span className="text-xl">{date}</span>
              {!isDateOpen[date] ? (
                <ArrowDown
                  className="fill-current text-primary w-6 h-6 hover:opacity-70 cursor-pointer"
                  onClick={() => openDate(date)}
                />
              ) : (
                <ArrowUp
                  className="fill-current text-primary w-6 h-6 hover:opacity-70 cursor-pointer"
                  onClick={() => closeDate(date)}
                />
              )}
            </div>
            {isDateOpen[date] && (
              <div className="flex flex-col ml-2">
                {movieTimesByDate[date].map((time, index) => (
                  <div key={index} className="flex items-center justify-between p-5 w-2/3 h-10 border-1 border-solid border-gray-200 shadow-md rounded-sm mt-2">
                    <span className="text-md">{time}</span>
                  </div>
                ))}
              </div>
            )}
          </>
        ))}
      </div>
    </div>
  );
};
