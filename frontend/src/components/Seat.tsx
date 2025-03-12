type SeatProps = {
  step: number;
  columnStart: number;
  maxColumns: number;
  rowStart: number;
  maxRows: number;
  totalSeats: number;
  chartType: "left" | "right" | "center";
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
  let margin = "";

  if (chartType === "center") {
    margin = "mt-4 mx-2";
  } else if (chartType === "left") {
    margin = "mr-2 mt-2";
  } else {
    margin = "ml-2 mt-2";
  }

  const isSeatTaken = (index: number) => {
    return seatsTaken.find((seat) => Number(seat) == index + step);
  };

  const calculateSeatColumnPosition = (index: number): string => {
    return `col-start-${(index % maxColumns) + 1 + columnStart}`
  }

  const calculateSeatRowPosition = (index: number): string => {
    return `row-start-${Math.ceil((index + 1) / maxRows) + rowStart}`;
  }

  return (
    <div
      className={`grid ${chartType === "center" ? `grid-cols-10` : `grid-cols-5`} grid-rows-5 gap-2 ${margin} items-center`}
    >
      {Array(totalSeats)
        .fill(1)
        .map((_, index) => (
          <div
            key={index + step}
            className={`flex justify-center items-center rounded-2xl p-1 w-8 h-8 text-white ${calculateSeatColumnPosition(index)} ${calculateSeatRowPosition(index)} border-1 border-solid border-black ${isSeatTaken(index) ? `bg-gray-600` : `bg-secondary cursor-pointer hover:opacity-60`} select-none`}
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
