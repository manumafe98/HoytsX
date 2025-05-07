import { Movie } from "@/types/movie.type";
import { MovieCard } from "./MovieCard";

interface CarouselCardProps {
  movie: Movie;
  index: number;
  offset: number;
  direction: number;
  absOffset: number;
  hidden: boolean;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

export const CarouselCard = ({
  movie,
  index,
  offset,
  direction,
  absOffset,
  hidden,
  onClick,
}: CarouselCardProps) => {
  const zIndex = 1000 - Math.abs(offset) * 100;

  const style: React.CSSProperties = {
    transform: `
      rotateY(${offset * 35}deg)
      scaleY(${1 + absOffset * -0.1})
      translateZ(${-15 * absOffset}rem)
      translateX(${-6 * direction}rem)
    `,
    filter: `blur(${absOffset * 0.3}rem)`,
    opacity: Math.abs(offset) >= 3 ? 0 : 1,
    pointerEvents: offset === 0 ? "auto" : "none",
    transition: "all 0.3s ease-out",
    position: "absolute",
    width: "300px",
    height: "100%",
    display: hidden ? "none" : "block",
    zIndex: zIndex,
  };

  return (
    <div style={style}>
      <MovieCard movie={movie} index={index} getMovieInfo={onClick} />
    </div>
  );
};
