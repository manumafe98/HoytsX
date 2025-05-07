interface PopUpNotificationProps {
  type: "error" | "success";
  message: string;
  transactionHash?: string;
}

export const PopUpNotification = ({
  type,
  message,
  transactionHash,
}: PopUpNotificationProps) => {
  const bgColor = type === "success" ? "bg-primary" : "bg-dark-background";
  const width = transactionHash ? "w-5/12" : "w-3/12";

  return (
    <div
      className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 ${width} my-4 px-4 py-2 rounded-lg shadow-lg transition-opacity duration-300 ${bgColor}`}
    >
      <p className="text-center text-white text-lg">{message}</p>
    </div>
  );
};
