import { ReactNode } from "react";
import { Footer } from "./Footer";
import { NavBar } from "./NavBar";

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen h-auto flex flex-col">
      <header>
        <NavBar />
      </header>
      <section className="flex-1">{children}</section>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};
