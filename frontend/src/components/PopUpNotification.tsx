import { NotificationType } from "@/types/notification.type";

interface PopUpNotificationProps {
  type: NotificationType;
  message: string;
  transactionHash?: string;
}

export const PopUpNotification = ({
  type,
  message,
  transactionHash,
}: PopUpNotificationProps) => {
  const bgColor = type === "success" ? "bg-primary" : "bg-dark-background";
  const width = transactionHash
    ? "w-5/12 max-lg:w-7/12 max-md:w-full"
    : "w-3/12 max-lg:w-5/12 max-md:w-8/12";

  return (
    <div
      className={`fixed bottom-20 left-1/2 transform -translate-x-1/2 ${width} my-4 px-4 py-2 rounded-lg shadow-lg transition-opacity duration-300 ${bgColor}`}
    >
      <p className="text-center text-white text-lg">{message}</p>
    </div>
  );
};
