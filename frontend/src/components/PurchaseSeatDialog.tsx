import { mintSeat } from "@/hooks";
import { Movie } from "@/types/movie.type";
import { Showtime } from "@/types/showtime.type";
import { TransactionResult } from "@/types/transactionResult.type";
import { forwardRef } from "react";
import { DialogButton } from "./DialogButton";
import { DialogLayout } from "./DialogLayout";

type PurchaseSeatDialogProps = {
  movie: Movie | undefined;
  showtime: Showtime | undefined;
  date: string | undefined;
  seatId: number;
  handlePopUp: (data: TransactionResult) => void;
};

export const PurchaseSeatDialog = forwardRef<
  HTMLDialogElement,
  PurchaseSeatDialogProps
>(({ movie, showtime, date, seatId, handlePopUp }, ref) => {
  const purchaseTiket = async () => {
    const transationResult = await mintSeat(
      movie?.id as number,
      date as string,
      showtime?.time as string,
      seatId,
      showtime?.cost as number,
    );
    handlePopUp(transationResult);
    if (ref && typeof ref !== "function") {
      ref.current?.close();
    }
  };

  return (
    <DialogLayout ref={ref} minHeight="min-h-[25vh]">
      <div className="flex flex-col items-center p-5">
        <p className="text-xl text-center text-white w-5/6">
          Confirm purchase for {movie?.name} seat {seatId} on {date} at{" "}
          {showtime?.time}
        </p>
        <DialogButton onClick={purchaseTiket}>
          <div>Confirm</div>
        </DialogButton>
      </div>
    </DialogLayout>
  );
});
