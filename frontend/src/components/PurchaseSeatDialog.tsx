import { mintSeat } from "@/hooks/mintSeat";
import { Movie } from "@/types/movie.type";
import { TransactionResult } from "@/types/transactionResult.type";
import { forwardRef } from "react";
import { Button } from "./Button";
import { DialogLayout } from "./DialogLayout";

type PurchaseSeatDialogProps = {
  movie: Movie | undefined;
  seatId: number;
  handlePopUp: (data: TransactionResult) => void;
};

export const PurchaseSeatDialog = forwardRef<
  HTMLDialogElement,
  PurchaseSeatDialogProps
>(({ movie, seatId, handlePopUp }, ref) => {
  const purchaseTiket = async () => {
    const transationResult = await mintSeat(
      movie?.id as number,
      seatId,
      movie?.cost as number,
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
          Confirm purchase of {movie?.name} seat {seatId} on date {movie?.date}{" "}
          at {movie?.time}
        </p>
        <Button onClick={purchaseTiket}>
          <div>Confirm</div>
        </Button>
      </div>
    </DialogLayout>
  );
});
