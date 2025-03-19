type CharPosition = "left" | "right" | "center";

type SeatProps = {
  step: number;
  columnStart: number;
  maxColumns: number;
  rowStart: number;
  maxRows: number;
  totalSeats: number;
  chartType: CharPosition;
  seatsTaken: number[];
  openPurchaseDialog: (id: number) => void;
};

export const Seat = ({
  step,
  columnStart,
  maxColumns,
  rowStart,
  maxRows,
  totalSeats,
  chartType,
  seatsTaken,
  openPurchaseDialog,
}: SeatProps) => {
  const getMargin = (chartType: CharPosition) => {
    return chartType === "center"
      ? "mt-4 mx-2 max-sm:mx-0.5"
      : chartType === "left"
        ? "mr-2 mt-2 max-sm:mr-1"
        : "ml-2 mt-2 max-sm:ml-1";
  };

  const getGridCols = (chartType: CharPosition) => {
    return chartType === "center" ? "grid-cols-10" : "grid-cols-5";
  };

  const isSeatTaken = (index: number) => {
    return seatsTaken.find((seat) => Number(seat) == index + step);
  };

  const calculateSeatColumnPosition = (index: number): string => {
    return `col-start-${(index % maxColumns) + 1 + columnStart}`;
  };

  const calculateSeatRowPosition = (index: number): string => {
    return `row-start-${Math.ceil((index + 1) / maxRows) + rowStart}`;
  };

  return (
    <div
      className={`grid ${getGridCols(chartType)} ${getMargin(chartType)} grid-rows-5 gap-2 max-[770px]:gap-1 max-[650px]:gap-0.5 items-center`}
    >
      {Array(totalSeats)
        .fill(1)
        .map((_, index) => (
          <div
            key={index + step}
            className={`flex justify-center items-center rounded-2xl p-1 max-[650px]:p-2 size-8 max-[770px]:size-6 max-[650px]:size-5 text-white ${calculateSeatColumnPosition(index)} ${calculateSeatRowPosition(index)} border-1 border-solid border-black ${isSeatTaken(index) ? `bg-gray-600` : `bg-secondary cursor-pointer hover:opacity-60`} select-none`}
            onClick={
              isSeatTaken(index)
                ? undefined
                : () => openPurchaseDialog(index + step)
            }
          >
            {index + step}
          </div>
        ))}
    </div>
  );
};
