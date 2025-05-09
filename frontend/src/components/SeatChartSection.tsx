import { useWindowSize } from "@/hooks";
import { Seat } from "./Seat";
import { SeatWalkAway } from "./SeatWalkAway";

type SeatChartSectionProps = {
  openPurchaseDialog: (id: number) => void;
  seatsTaken: number[];
};

export const SeatChartSection = ({
  openPurchaseDialog,
  seatsTaken,
}: SeatChartSectionProps) => {
  const isSmallScreen = useWindowSize(860)

  return (
    <div
      className="flex flex-col col-span-2 h-auto border-1 border-solid border-gray-200 shadow-xl rounded-md p-5 max-sm:p-0 max-md:p-1 max-xl:mt-5 mt-2"
    >
      <div className="grid grid-cols-4 grid-rows-5 w-full h-full gap-y-4">
        <div className="flex justify-center items-center bg-dark-background col-span-4 rounded-md text-white h-14 select-none">
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
            openPurchaseDialog={openPurchaseDialog}
          />
          <SeatWalkAway />
        </div>
        <div className="row-span-4 col-span-2">
          <Seat
            totalSeats={50}
            step={26}
            columnStart={0}
            maxColumns={10}
            rowStart={0}
            maxRows={5}
            chartType="center"
            seatsTaken={seatsTaken}
            openPurchaseDialog={openPurchaseDialog}
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
            openPurchaseDialog={openPurchaseDialog}
          />
        </div>
      </div>
    </div>
  );
};
