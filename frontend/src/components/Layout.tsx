import { ReactNode } from "react";
import { Footer } from "./Footer";
import { NavBar } from "./NavBar";

type LayoutProps = {
  children: ReactNode;
  onNavigate?: (section: string) => void;
  showFooter: boolean;
};

export const Layout = ({ children, onNavigate, showFooter }: LayoutProps) => {
  return (
    <div className="min-h-screen h-screen flex flex-col">
      <header>
        <NavBar onNavigate={onNavigate} />
      </header>
      <div className="flex-1">{children}</div>
      {showFooter && <Footer />}
    </div>
  );
};
