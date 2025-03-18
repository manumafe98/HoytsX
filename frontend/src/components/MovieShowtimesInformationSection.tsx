import { getMovieDates } from "@/hooks/getMovieDates";
import { getMovieTimesByDate } from "@/hooks/getMovieTimesByDate";
import { Movie } from "@/types/movie.type";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieSeatsTaken } from "@/hooks/getMovieSeatsTaken";
import { DaySelector } from "./DaySelector";
import { MovieTitleSection } from "./MovieTitleSection";

type MovieShowtimesInformationSectionProps = {
  movie: Movie | undefined;
  openPurchaseDialog: (id: number) => void;
  getShowtime: (date: string, time: string) => void;
};

export const MovieShowtimesInformationSection = ({
  movie,
  openPurchaseDialog,
  getShowtime,
}: MovieShowtimesInformationSectionProps) => {
  const { id } = useParams();
  const [movieDates, setMovieDates] = useState<string[]>([]);
  const [movieTimesByDate, setMovieTimesByDate] = useState<
    Record<string, string[]>
  >({});
  const [showtimeSeatsTaken, setShowtimeSeatsTaken] = useState<
    Record<string, number[]>
  >({});
  const [isDateOpen, setIsDateOpen] = useState<Record<string, boolean>>({});
  const [isTimeOpen, setIsTimeOpen] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetcthMovieDates = async () => {
      const dates = await getMovieDates(Number(id));
      setMovieDates(dates);
    };
    fetcthMovieDates();
  }, []);

  const openDate = async (date: string) => {
    const times = await getMovieTimesByDate(Number(id), date);
    setMovieTimesByDate((prevState) => ({
      ...prevState,
      [date]: times,
    }));

    setIsDateOpen((prevState) => ({
      ...prevState,
      [date]: true,
    }));
  };

  const openTime = async (time: string, date: string) => {
    const seatsTaken = await getMovieSeatsTaken(Number(id), date, time);
    setIsTimeOpen((prevState) => ({
      ...prevState,
      [time]: true,
    }));

    setShowtimeSeatsTaken((prevState) => ({
      ...prevState,
      [time]: seatsTaken,
    }));

    getShowtime(date, time);
  };

  const closeDate = (date: string) => {
    setIsDateOpen((prevState) => ({
      ...prevState,
      [date]: false,
    }));
  };

  const closeTime = (time: string) => {
    setIsTimeOpen((prevState) => ({
      ...prevState,
      [time]: false,
    }));
  };

  return (
    <div className="flex flex-col col-span-2 row-span-2">
      <MovieTitleSection movieName={movie?.name} movieDuration={movie?.duration} movieGenre={movie?.genre} movieDescription={movie?.description}/>
      <div className="flex flex-col mt-5">
        {movieDates.map((date, index) => (
          <DaySelector
            key={index}
            date={date}
            isDateOpen={isDateOpen[date]}
            isTimeOpen={isTimeOpen}
            showtimeSeatsTaken={showtimeSeatsTaken}
            movieTimesByDate={movieTimesByDate[date]}
            openDate={openDate}
            closeDate={closeDate}
            openTime={openTime}
            closeTime={closeTime}
            openPurchaseDialog={openPurchaseDialog}
          />
        ))}
      </div>
    </div>
  );
};
