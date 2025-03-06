import { ReactNode } from "react";
import { Footer } from "./Footer";
import { NavBar } from "./NavBar";

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="h-screen flex flex-col">
      <header>
        <NavBar />
      </header>
      <section>{children}</section>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};
