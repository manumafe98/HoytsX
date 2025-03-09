import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  onClick: () => void;
};

export const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button
      className="bg-white w-5/6 rounded-md h-10 mt-5 hover:opacity-55 transform duration-200 cursor-pointer focus:outline-none"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
