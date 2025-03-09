import { forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { Ticket } from "../icons/Ticket";
import { Movie } from "../types/movie.type";
import { Button } from "./Button";
import { DialogLayout } from "./DialogLayout";

type MovieDialogProps = {
  movie: Movie | undefined;
};

export const MovieDialog = forwardRef<HTMLDialogElement, MovieDialogProps>(
  (props, ref) => {
    const navigate = useNavigate();

    const calculateDuration = (
      durationInMinutes: number | undefined,
    ): string => {
      const minutes = Number(durationInMinutes) % 60;
      const hours = Math.floor(Number(durationInMinutes) / 60);
      return `${hours}h ${minutes}m`;
    };

    const navigateToMovieTab = () => {
      navigate(`/movie/${props.movie?.id}`);
    };

    return (
      <DialogLayout ref={ref} minHeight="min-h-55vh">
        <div className="flex justify-center w-5/6 h-72 rounded-lg overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={`https://dweb.link/ipfs/${props.movie?.ipfsHash}`}
            alt={`${props.movie?.name} film cover image`}
          />
        </div>
        <div className="flex w-5/6 justify-between items-center p-2">
          <h1 className="text-3xl text-white justify-start">
            {(props.movie?.name.length as number) > 20
              ? `${props.movie?.name.substring(0, 20)}...`
              : props.movie?.name}
          </h1>
          <p className="text-md text-gray-500">
            {calculateDuration(props.movie?.duration)}
          </p>
        </div>
        <div className="w-5/6 mt-5 max-w-lg">
          <p className="text-md text-white">{props.movie?.description}</p>
        </div>
        <Button onClick={navigateToMovieTab}>
          <div className="flex justify-center items-center gap-2">
            <Ticket className="fill-current text-black w-6 h-6" />
            <span className="text-xl font-semibold">Get your Ticket</span>
          </div>
        </Button>
      </DialogLayout>
    );
  },
);
