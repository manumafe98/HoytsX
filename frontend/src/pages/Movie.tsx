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
      <div className="grid grid-cols-3 grid-rows-2 px-90 py-10 gap-2">
        <div className="flex justify-center col-span-2 h-90">
          <h1 className="text-7xl font-bold text-outline">{movie?.name}</h1>
        </div>
        <div className="flex flex-col items-center row-span-2 border-1 border-solid border-gray-200 shadow-xl rounded-md p-5">
          <img className="h-2/3 rounded-md w-90" src={`https://dweb.link/ipfs/${movie?.ipfsHash}`} alt={`${movie?.name} film cover image`} />
          <div className="grid grid-cols-2 w-90 mt-10">
            <span className="font-bold text-lg mt-2">Original Title:</span><span className="mt-2 text-lg">{movie?.name}</span>
            <span className="font-bold text-lg mt-2">Genre:</span><span className="mt-2 text-lg">{movie?.genre}</span>
            <span className="font-bold text-lg mt-2">Director:</span><span className="mt-2 text-lg">{movie?.director}</span>
            <span className="font-bold text-lg mt-2">Actors:</span><span className="mt-2 text-lg">{`${movie?.actors[0]}, ${movie?.actors[1]}, ${movie?.actors[2]}`}</span>
            <span className="font-bold text-lg mt-2">Duration:</span><span className="mt-2 text-lg">{movie?.duration} minutes</span>
          </div>
        </div>
      </div>
    </Layout>
  );
};
