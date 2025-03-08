import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "../components/Layout";
import { MovieDescriptionSection } from "../components/MovieDescriptionSection";
import { MovieTitleSection } from "../components/MovieTitleSection";
import { SeatChartSection } from "../components/SeatChartSection";
import { getMovie } from "../hooks/getMovie";
import { Movie as MovieType } from "../types/movie.type";

export const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieType>();

  useEffect(() => {
    const fetchMovie = async () => {
      setMovie(await getMovie(Number(id)));
    };

    fetchMovie();
  }, [id]);

  return (
    <Layout>
      <div className="grid grid-cols-3 grid-rows-2 px-90 py-10 gap-x-4">
        <MovieTitleSection movie={movie} />
        <MovieDescriptionSection movie={movie} />
        <SeatChartSection />
      </div>
    </Layout>
  );
};
