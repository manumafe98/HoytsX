import { ReactNode } from "react";

type DialogButtonProps = {
  children: ReactNode;
  onClick: () => void;
};

export const DialogButton = ({ children, onClick }: DialogButtonProps) => {
  return (
    <button
      className="bg-white w-5/6 rounded-md h-10 mt-5 hover:opacity-55 transform duration-200 cursor-pointer focus:outline-none"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
