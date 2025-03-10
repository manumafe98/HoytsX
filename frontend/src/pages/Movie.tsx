import { Layout } from "@/components/Layout";
import { MovieDescriptionSection } from "@/components/MovieDescriptionSection";
import { MovieTitleSection } from "@/components/MovieTitleSection";
import { PurchaseSeatDialog } from "@/components/PurchaseSeatDialog";
import { SeatChartSection } from "@/components/SeatChartSection";
import { getMovie } from "@/hooks/getMovie";
import { Movie as MovieType } from "@/types/movie.type";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

export const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieType>();
  const [seatId, setSeatId] = useState<number>(0);
  const openPurchaseSeatDialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      setMovie(await getMovie(Number(id)));
    };

    fetchMovie();
  }, [id]);

  const openPurchaseDialog = (id: number) => {
    if (openPurchaseSeatDialogRef.current) {
      openPurchaseSeatDialogRef.current.showModal();
      setSeatId(id);
    }
  };

  return (
    <Layout>
      <PurchaseSeatDialog
        ref={openPurchaseSeatDialogRef}
        movie={movie}
        seatId={seatId}
      />
      <div className="grid grid-cols-3 grid-rows-2 px-90 py-10 gap-x-4">
        <MovieTitleSection movie={movie} />
        <MovieDescriptionSection movie={movie} />
        <SeatChartSection openPurchaseDialog={openPurchaseDialog} />
      </div>
    </Layout>
  );
};
