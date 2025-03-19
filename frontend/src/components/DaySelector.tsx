import { ArrowDown } from "@/icons/ArrowDown";
import { ArrowUp } from "@/icons/ArrowUp";
import React from "react";
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
  return (
    <React.Fragment>
      <div className="flex items-center justify-between p-5 w-2/3 h-10 border-1 border-solid border-gray-200 shadow-md rounded-sm mt-2">
        <span className="text-xl">{date}</span>
        {!isDateOpen ? (
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
      {isDateOpen && (
        <div className="flex flex-col ml-2">
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
    </React.Fragment>
  );
};
