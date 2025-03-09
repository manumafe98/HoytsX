import { forwardRef } from "react";
import { mintSeat } from "../hooks/mintSeat";
import { Movie } from "../types/movie.type";
import { Button } from "./Button";
import { DialogLayout } from "./DialogLayout";

type PurchaseSeatDialogProps = {
  movie: Movie | undefined;
  seatId: number;
};

export const PurchaseSeatDialog = forwardRef<
  HTMLDialogElement,
  PurchaseSeatDialogProps
>(({ movie, seatId }, ref) => {
  const purchaseTiket = async () => {
    await mintSeat(movie?.id as number, seatId, movie?.cost as number);
    if (ref && typeof ref !== "function") {
      ref.current?.close();
    }
  };

  return (
    <DialogLayout ref={ref} minHeight="min-h-[25vh]">
      <div className="flex flex-col items-center p-5">
        <p className="text-xl text-white w-5/6">
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
