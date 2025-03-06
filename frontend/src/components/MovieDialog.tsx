import { forwardRef } from "react";
import { Close } from "../icons/Close";
import { Ticket } from "../icons/Ticket";
import { Movie } from "../types/movie.type";

type MovieDialogProps = {
  movie: Movie | undefined;
};

export const MovieDialog = forwardRef<HTMLDialogElement, MovieDialogProps>(
  (props, ref) => {

    const calculateDuration = (
      durationInMinutes: number | undefined,
    ): string => {
      const minutes = Number(durationInMinutes) % 60;
      const hours = Math.floor(Number(durationInMinutes) / 60);
      return `${hours}h ${minutes}m`;
    };

    const closeInstructions = () => {
      if (ref && typeof ref !== "function") {
        ref.current?.close();
      }
    };

    return (
      <dialog
        ref={ref}
        className="bg-[#121313] backdrop:bg-black/45 m-auto rounded-lg min-h-[55vh] min-w-[25vw] focus:outline-none py-5"
      >
        <div className="flex flex-col items-center">
          <div className="flex justify-end w-5/6 mb-5">
            <Close
              className="fill-current text-gray-500 w-10 h-10 hover:text-white transform duration-200"
              onClick={closeInstructions}
            />
          </div>
          <div className="flex justify-center w-5/6 h-72 rounded-lg overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={`https://dweb.link/ipfs/${props.movie?.ipfsHash}`}
              alt={`${props.movie?.name} film cover image`}
            />
          </div>
          <div className="flex w-5/6 justify-between items-center p-2">
            <h1 className="text-3xl text-white justify-start">
              {props.movie?.name}
            </h1>
            <p className="text-md text-gray-500">
              {calculateDuration(props.movie?.duration)}
            </p>
          </div>
          <div className="w-5/6 mt-5 max-w-lg">
            <p className="text-md text-white">{props.movie?.description}</p>
          </div>
          <button className="bg-white w-5/6 rounded-md h-10 mt-5 hover:opacity-55 transform duration-200">
            <div className="flex justify-center items-center gap-2">
              <Ticket className="fill-current text-black w-6 h-6" />
              <span className="text-xl font-semibold">Get your Ticket</span>
            </div>
          </button>
        </div>
      </dialog>
    );
  },
);
