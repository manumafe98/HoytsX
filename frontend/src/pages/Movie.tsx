import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "../components/Layout";
import { Seat } from "../components/Seat";
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
        <div className="flex flex-col col-span-2">
          <h1 className="text-7xl font-bold text-outline">{movie?.name}</h1>
          <div className="flex gap-5 mt-2">
            <span className="border-1 border-black rounded-4xl p-1 font-bold bg-[#9b2b66] text-white">
              {movie?.duration} minutes
            </span>
            <span className="border-1 border-black rounded-4xl p-1 font-bold bg-[#9b2b66] text-white">
              {movie?.genre}
            </span>
          </div>
          <p className="mt-5 text-lg">{movie?.description}</p>
        </div>
        <div className="flex flex-col items-center row-span-2 border-1 border-solid border-gray-200 shadow-xl rounded-md p-5">
          <img
            className="h-2/3 rounded-md w-90"
            src={`https://dweb.link/ipfs/${movie?.ipfsHash}`}
            alt={`${movie?.name} film cover image`}
          />
          <div className="grid grid-cols-2 w-90 mt-10">
            <span className="font-bold text-lg mt-2">Original Title:</span>
            <span className="mt-2 text-lg">{movie?.name}</span>
            <span className="font-bold text-lg mt-2">Genre:</span>
            <span className="mt-2 text-lg">{movie?.genre}</span>
            <span className="font-bold text-lg mt-2">Director:</span>
            <span className="mt-2 text-lg">{movie?.director}</span>
            <span className="font-bold text-lg mt-2">Actors:</span>
            <span className="mt-2 text-lg">{`${movie?.actors[0]}, ${movie?.actors[1]}, ${movie?.actors[2]}`}</span>
            <span className="font-bold text-lg mt-2">Duration:</span>
            <span className="mt-2 text-lg">{movie?.duration} minutes</span>
          </div>
        </div>
        <div className="flex flex-col col-span-2 h-auto border-1 border-solid border-gray-200 shadow-xl rounded-md p-5">
          <div className="grid grid-cols-4 grid-rows-5 w-full h-full gap-y-4">
            <div className="bg-[#121313] col-span-4 rounded-md text-white text-center h-14">
              SCREEN
            </div>
            <div className="flex row-span-4 gap-2">
              <div className="grid grid-cols-5 grid-rows-5 gap-2 mr-1 mt-2">
                {Array(25)
                  .fill(1)
                  .map((_, index) => (
                    <Seat
                      index={index}
                      step={1}
                      columnStart={0}
                      maxColumns={5}
                      rowStart={0}
                      maxRows={5}
                    />
                  ))}
              </div>
              <div className="flex items-center justify-center row-span-4 bg-[#121313] text-white w-8 rounded-sm">
                <p className="rotate-90">WALKAWAY</p>
              </div>
            </div>
            <div className="row-span-4 col-span-2 mx-1">
              <div className="grid grid-cols-10 grid-rows-5 gap-2 mt-2">
                {Array(100 - 50)
                  .fill(1)
                  .map((_, index) => (
                    <Seat
                      index={index}
                      step={26}
                      columnStart={0}
                      maxColumns={10}
                      rowStart={0}
                      maxRows={5}
                    />
                  ))}
              </div>
            </div>
            <div className="flex row-span-4">
              <div className="flex items-center justify-center row-span-4 bg-[#121313] text-white w-8 rounded-sm">
                <p className="rotate-90">WALKAWAY</p>
              </div>
              <div className="grid grid-cols-5 grid-rows-5 gap-2 ml-1 mt-2">
                {Array(25)
                  .fill(1)
                  .map((_, index) => (
                    <Seat
                      index={index}
                      step={76}
                      columnStart={0}
                      maxColumns={5}
                      rowStart={0}
                      maxRows={5}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
