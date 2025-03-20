import { ArrowDown, ArrowUp } from "@/icons";
import { Fragment, useCallback } from "react";
import { TimeSelector } from "./TimeSelector";

export type DaySelectorProps = {
  date: string;
  isDateOpen: boolean;
  isTimeOpen: Record<string, boolean>;
  showtimeSeatsTaken: Record<string, number[]>;
  movieTimesByDate: string[];
  openDate: (date: string) => Promise<void>;
  closeDate: (date: string) => void;
  openTime: (time: string, date: string) => Promise<void>;
  closeTime: (time: string) => void;
  openPurchaseDialog: (id: number) => void;
};

export const DaySelector = ({
  date,
  isDateOpen,
  isTimeOpen,
  showtimeSeatsTaken,
  movieTimesByDate,
  openDate,
  closeDate,
  openTime,
  closeTime,
  openPurchaseDialog,
}: DaySelectorProps) => {
  const handleOpenDate = useCallback(() => openDate(date), [openDate, date]);
  const handleCloseDate = useCallback(() => closeDate(date), [closeDate, date]);

  return (
    <Fragment>
      <div className="flex items-center justify-between p-5 w-2/3 h-10 border-1 border-solid border-gray-200 shadow-md rounded-sm mt-2 max-xl:w-full">
        <span className="text-xl">{date}</span>
        {!isDateOpen ? (
          <ArrowDown
            className="fill-current text-primary w-6 h-6 hover:opacity-70 cursor-pointer"
            onClick={handleOpenDate}
          />
        ) : (
          <ArrowUp
            className="fill-current text-primary w-6 h-6 hover:opacity-70 cursor-pointer"
            onClick={handleCloseDate}
          />
        )}
      </div>
      {isDateOpen && (
        <div className="flex flex-col ml-2 max-xl:mx-2">
          {movieTimesByDate.map((time, index) => (
            <TimeSelector
              key={index}
              time={time}
              date={date}
              isTimeOpen={isTimeOpen[time]}
              showtimeSeatsTaken={showtimeSeatsTaken[time]}
              openTime={openTime}
              closeTime={closeTime}
              openPurchaseDialog={openPurchaseDialog}
            />
          ))}
        </div>
      )}
    </Fragment>
  );
};
