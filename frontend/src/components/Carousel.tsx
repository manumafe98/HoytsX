import { ArrowLeft, ArrowRight } from "@/icons";
import { Movie } from "@/types/movie.type";
import { useState } from "react";
import { CarouselCard } from "./CarouselCard";

const MAX_VISIBILITY = 3;

type CarouselProps = {
  movies: Movie[];
  onCardClick: (event: React.MouseEvent<HTMLElement>) => void;
};

export const Carousel = ({ movies, onCardClick }: CarouselProps) => {
  const [active, setActive] = useState(2);

  const count = movies.length;

  return (
    <div className="h-[30rem] w-full flex items-center justify-center perspective-[1000px]">
      {active > 0 && (
        <button
          onClick={() => setActive((i) => i - 1)}
          className="absolute left-4 z-10 bg-primary/30 hover:bg-primary/50 text-primary rounded-full p-2"
        >
          <ArrowLeft className="fill-current text-primary size-8" />
        </button>
      )}

      {movies.map((movie, i) => {
        const offset = active - i;
        const direction = Math.sign(offset);
        const absOffset = Math.abs(offset);
        const hidden = absOffset >= MAX_VISIBILITY;

        return (
          <CarouselCard
            key={movie.id}
            movie={movie}
            index={i}
            offset={offset}
            direction={direction}
            absOffset={absOffset}
            hidden={hidden}
            onClick={onCardClick}
          />
        );
      })}

      {active < count - 1 && (
        <button
          onClick={() => setActive((i) => i + 1)}
          className="absolute right-4 z-10 bg-primary/30 hover:bg-primary/50 text-primary rounded-full p-2"
        >
          <ArrowRight className="fill-current text-primary size-8" />
        </button>
      )}
    </div>
  );
};
