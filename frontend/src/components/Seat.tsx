type SeatProps = {
  index: number;
  step: number;
  columnStart: number;
  maxColumns: number;
  rowStart: number;
  maxRows: number;
};

export const Seat = ({
  index,
  step,
  columnStart,
  maxColumns,
  rowStart,
  maxRows,
}: SeatProps) => {
  return (
    <div
      className={`flex justify-center items-center bg-[#10069f] rounded-2xl p-1 w-8 h-8 text-white col-start-${(index % maxColumns) + 1 + columnStart} row-start-${Math.ceil((index + 1) / maxRows) + rowStart}`}
    >
      {index + step}
    </div>
  );
};
