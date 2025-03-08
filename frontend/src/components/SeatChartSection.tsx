import { useEffect, useState } from "react";
import { getMovieSeatsTaken } from "../hooks/getMovieSeatsTaken";
import { Movie } from "../types/movie.type";
import { Seat } from "./Seat";
import { SeatWalkAway } from "./SeatWalkAway";

type SeatChartSectionProps = {
  movie: Movie | undefined;
};

export const SeatChartSection = ({ movie }: SeatChartSectionProps) => {
  const [seatsTaken, setSeatsTaken] = useState<number[]>([]);

  useEffect(() => {
    const fetchSeatsTaken = async () => {
      const seats = await getMovieSeatsTaken(movie?.id as number);
      setSeatsTaken(seats);
    };
    fetchSeatsTaken();
  }, []);

  return (
    <div className="flex flex-col col-span-2 h-auto border-1 border-solid border-gray-200 shadow-xl rounded-md p-5">
      <div className="grid grid-cols-4 grid-rows-5 w-full h-full gap-y-4">
        <div className="flex justify-center items-center bg-[#121313] col-span-4 rounded-md text-white h-14">
          <span className="font-bold">SCREEN</span>
        </div>
        <div className="flex row-span-4">
          <Seat
            totalSeats={25}
            step={1}
            columnStart={0}
            maxColumns={5}
            rowStart={0}
            maxRows={5}
            chartType="left"
            seatsTaken={seatsTaken}
          />
          <SeatWalkAway />
        </div>
        <div className="row-span-4 col-span-2 mx-1">
          <Seat
            totalSeats={50}
            step={26}
            columnStart={0}
            maxColumns={10}
            rowStart={0}
            maxRows={5}
            chartType="center"
            seatsTaken={seatsTaken}
          />
        </div>
        <div className="flex row-span-4">
          <SeatWalkAway />
          <Seat
            totalSeats={25}
            step={76}
            columnStart={0}
            maxColumns={5}
            rowStart={0}
            maxRows={5}
            chartType="right"
            seatsTaken={seatsTaken}
          />
        </div>
      </div>
    </div>
  );
};
