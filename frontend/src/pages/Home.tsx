import { Footer, Layout, MovieDialog } from "@/components";
import { Carousel } from "@/components/Carousel";
import { getMovies } from "@/hooks";
import { Movie } from "@/types/movie.type";
import { useEffect, useRef, useState } from "react";

export const Home = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [movieClicked, setMovieClicked] = useState<Movie>();

  const openMovieDialogRef = useRef<HTMLDialogElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const moviesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getMovies().then(setMovies);
  }, []);

  const getMovieInfo = (event: React.MouseEvent<HTMLElement>) => {
    const index = +(event.currentTarget.getAttribute("data-key") ?? 0);
    setMovieClicked(movies[index]);
    openMovieDialogRef.current?.showModal();
  };

  const scrollToSection = (section: string) => {
    if (section === "about" && aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (section === "movies" && moviesRef.current) {
      moviesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Layout showFooter={false} onNavigate={scrollToSection}>
      <div
        ref={aboutRef}
        className="w-full h-full relative text-white bg-gradient-to-r from-[#01091c] to-secondary"
      >
        <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
          <img
            src="/src/assets/images/3dglasses.webp"
            alt="3D glasses decorative image"
            className="h-[80%] object-contain"
          />
        </div>
        <div className="relative z-10 flex items-center justify-center h-full px-4">
          <div className="text-center max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
              <span className="text-primary">Revolutionizing the</span>{" "}
              <span>cinema with blockchain</span>
            </h1>
            <p className="text-lg font-semibold md:text-xl text-gray-300 leading-relaxed">
              HoytsX is revolutionizing the cinema experience by bringing the
              power of blockchain technology to movie enthusiasts. As the
              world's first decentralized cinema platform, we combine the
              timeless joy of film with cutting-edge Web3 innovation.
            </p>
          </div>
        </div>
      </div>

      <div
        ref={moviesRef}
        className="h-full flex items-center justify-center py-10 px-4 bg-gradient-to-t from-background-gradiant-start to-background-gradiant-end"
      >
        <MovieDialog ref={openMovieDialogRef} movie={movieClicked} />
        <Carousel movies={movies} onCardClick={getMovieInfo} />
      </div>
      <Footer />
    </Layout>
  );
};
