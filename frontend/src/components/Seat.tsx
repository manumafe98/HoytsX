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

  return (
    <div
      className={`grid ${chartType === "center" ? `grid-cols-10` : `grid-cols-5`} grid-rows-5 gap-2 ${margin} items-center`}
    >
      {Array(totalSeats)
        .fill(1)
        .map((_, index) => (
          <div
            className={`flex justify-center items-center rounded-2xl p-1 w-8 h-8 text-white col-start-${(index % maxColumns) + 1 + columnStart} row-start-${Math.ceil((index + 1) / maxRows) + rowStart} border-1 border-solid border-black ${seatsTaken.find((seat) => Number(seat) == index + step) ? `bg-gray-600` : `bg-[#10069f] cursor-pointer hover:opacity-60`}`}
            onClick={() => openPurchaseDialog(index + step)}
          >
            {index + step}
          </div>
        ))}
    </div>
  );
};
