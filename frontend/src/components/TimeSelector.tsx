import { ArrowDown, ArrowUp } from "@/icons";
import { Fragment, useCallback } from "react";
import { SeatChartSection } from "./SeatChartSection";

export type TimeSelectorProps = {
  time: string;
  date: string;
  isTimeOpen: boolean;
  showtimeSeatsTaken: number[];
  openTime: (time: string, date: string) => Promise<void>;
  closeTime: (time: string) => void;
  openPurchaseDialog: (id: number) => void;
};

export const TimeSelector = ({
  time,
  date,
  isTimeOpen,
  showtimeSeatsTaken,
  openTime,
  closeTime,
  openPurchaseDialog,
}: TimeSelectorProps) => {
  const handleOpenTime = useCallback(
    () => openTime(time, date),
    [openTime, time, date],
  );
  const handleCloseTime = useCallback(() => closeTime(time), [openTime, time]);

  return (
    <Fragment>
      <div className="flex items-center justify-between p-5 w-2/3 h-10 border-1 border-solid border-gray-200 shadow-md rounded-sm mt-2 max-xl:w-full ">
        <span className="text-md">{time}</span>
        {!isTimeOpen ? (
          <ArrowDown
            className="fill-current text-primary w-6 h-6 hover:opacity-70 cursor-pointer"
            onClick={handleOpenTime}
          />
        ) : (
          <ArrowUp
            className="fill-current text-primary w-6 h-6 hover:opacity-70 cursor-pointer"
            onClick={handleCloseTime}
          />
        )}
      </div>
      {isTimeOpen && (
        <SeatChartSection
          openPurchaseDialog={openPurchaseDialog}
          seatsTaken={showtimeSeatsTaken}
        />
      )}
    </Fragment>
  );
};
