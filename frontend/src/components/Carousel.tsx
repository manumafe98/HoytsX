import { ArrowLeft, ArrowRight } from "@/icons";
import { Movie } from "@/types/movie.type";
import { useEffect, useState } from "react";
import { CarouselCard } from "./CarouselCard";

const MAX_VISIBILITY = 3;

type CarouselProps = {
  movies: Movie[];
  onCardClick: (event: React.MouseEvent<HTMLElement>) => void;
};

export const Carousel = ({ movies, onCardClick }: CarouselProps) => {
  const [active, setActive] = useState(2);
  const count = movies.length;

  useEffect(() => {
    if (movies.length > 0) {
      setActive(Math.min(2, movies.length - 1));
    }
  }, [movies]);

  const handleSlideChange = (newIndex: number) => {
    setActive(newIndex);
  };

  return (
    <div className="relative h-[35rem] w-full overflow-hidden">
      <div className="absolute inset-0 h-[30rem] flex items-center justify-center perspective-[1000px] pt-5">
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
      </div>

      <div className="absolute bottom-0 left-5 right-0 flex justify-center gap-54 pb-4 z-20">
        {active > 0 && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleSlideChange(active - 1);
            }}
            className="bg-primary/30 hover:bg-primary/50 text-primary rounded-full p-2"
          >
            <ArrowLeft className="fill-current text-primary size-8" />
          </button>
        )}

        {active < count - 1 && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleSlideChange(active + 1);
            }}
            className="bg-primary/30 hover:bg-primary/50 text-primary rounded-full p-2"
          >
            <ArrowRight className="fill-current text-primary size-8" />
          </button>
        )}
      </div>
    </div>
  );
};
