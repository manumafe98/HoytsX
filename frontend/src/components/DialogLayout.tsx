import { Close } from "@/icons/Close";
import { ForwardedRef, ReactNode } from "react";

type DialogLayoutProps = {
  children: ReactNode;
  ref: ForwardedRef<HTMLDialogElement>;
  minHeight: string;
};

export const DialogLayout = ({
  children,
  ref,
  minHeight,
}: DialogLayoutProps) => {
  const closeInstructions = () => {
    if (ref && typeof ref !== "function") {
      ref.current?.close();
    }
  };

  return (
    <dialog
      ref={ref}
      className={`bg-[#121313] backdrop:bg-black/45 m-auto rounded-lg ${minHeight} min-w-[25vw] focus:outline-none py-5`}
    >
      <div className="flex flex-col items-center">
        <div className="flex justify-end w-5/6 mb-2">
          <Close
            className="fill-current text-gray-500 w-10 h-10 hover:text-white transform duration-200"
            onClick={closeInstructions}
          />
        </div>
        {children}
      </div>
    </dialog>
  );
};
