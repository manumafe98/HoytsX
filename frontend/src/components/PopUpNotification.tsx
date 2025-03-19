import { TransactionResult } from "@/types/transactionResult.type";

export const PopUpNotification = ({
  success,
  transactionHash,
}: TransactionResult) => {
  const bgColor = success ? "bg-primary" : "bg-dark-background";
  const width = success ? "w-5/12" : "w-3/12";

  return (
    <div
      className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 ${width} my-4 px-4 py-2 rounded-lg shadow-lg transition-opacity duration-300 ${bgColor}`}
    >
      <p className="text-center text-white text-lg">
        {success
          ? `Seat purchased successfully, tx: ${transactionHash}`
          : "Something went wrong"}
      </p>
    </div>
  );
};
