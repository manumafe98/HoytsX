import { Layout } from "@/components/Layout";
import { MovieDescriptionSection } from "@/components/MovieDescriptionSection";
import { MovieShowtimesInformationSection } from "@/components/MovieShowtimesInformationSection";
import { PopUpNotification } from "@/components/PopUpNotification";
import { PurchaseSeatDialog } from "@/components/PurchaseSeatDialog";
import { getMovie } from "@/hooks/getMovie";
import { getMovieShowtime } from "@/hooks/getMovieShowtime";
import { Movie as MovieType } from "@/types/movie.type";
import { Showtime } from "@/types/showtime.type";
import { TransactionResult } from "@/types/transactionResult.type";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

export const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieType>();
  const [seatId, setSeatId] = useState<number>(0);
  const [transactionResult, setTransactionResult] = useState<
    TransactionResult | undefined
  >();
  const [showPopUpNotification, setShowPopUpNotification] =
    useState<boolean>(false);
  const [showtime, setShowtime] = useState<Showtime>();
  const [date, setDate] = useState<string>();
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

  const getShowtime = async (date: string, time: string) => {
    const showtime = await getMovieShowtime(Number(id), date, time);
    setShowtime(showtime);
    setDate(date);
  };

  const handlePopUp = (data: TransactionResult) => {
    setTransactionResult(data);
    setShowPopUpNotification(true);
    setTimeout(() => setShowPopUpNotification(false), 4000);
  };

  return (
    <Layout>
      <PurchaseSeatDialog
        ref={openPurchaseSeatDialogRef}
        movie={movie}
        showtime={showtime}
        date={date}
        seatId={seatId}
        handlePopUp={handlePopUp}
      />
      <div className="grid grid-cols-3 grid-rows-2 px-90 py-10 gap-x-4 max-md:gap-x-0 max-xl:grid-rows-2 max-xl:grid-cols-1 max-sm:px-0.5 max-lg:px-1 max-[1400px]:px-10 max-[1550px]:px-30 max-[1650px]:px-50 max-[1750px]:px-60 max-[1900px]:px-70">
        <MovieShowtimesInformationSection
          movie={movie}
          transactionResult={transactionResult}
          openPurchaseDialog={openPurchaseDialog}
          getShowtime={getShowtime}
        />
        <MovieDescriptionSection movie={movie} />
        {showPopUpNotification && (
          <PopUpNotification
            success={transactionResult ? transactionResult.success : false}
            transactionHash={
              transactionResult ? transactionResult.transactionHash : ""
            }
          />
        )}
      </div>
    </Layout>
  );
};
