import { forwardRef } from "react";
import { DialogLayout } from "./DialogLayout";
import { Movie } from "../types/movie.type";

type PurchaseSeatDialogProps = {
  movie: Movie | undefined;
  seatId: number;
}

export const PurchaseSeatDialog = forwardRef<
  HTMLDialogElement,
  PurchaseSeatDialogProps
>((props, ref) => {
  return (
    <DialogLayout ref={ref}>
      <div className="text-white">{props.seatId}</div>
    </DialogLayout>
  );
});
