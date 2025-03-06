import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "../components/Layout";
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
      <div>{movie?.name}</div>
    </Layout>
  );
};
