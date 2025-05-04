import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { useNavigate } from "react-router-dom";

export const NavBar = () => {
  const navigate = useNavigate();
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();

  const navigateToHome = () => {
    navigate("/");
  };

  const handleOpen = () => {
    open();
  };

  return (
    <div className="flex justify-between items-center h-36 bg-gradient-to-l from-secondary to-primary border-b-1 border-solid border-b-primary p-5">
      <h1
        className="text-4xl font-bold text-white cursor-pointer"
        onClick={navigateToHome}
      >
        H o y t s X
      </h1>
      <button
        className="bg-primary rounded-4xl text-white text-xl cursor-pointer hover:bg-primary/80 duration-200 transform p-4"
        onClick={handleOpen}
      >
        {isConnected
          ? `${address?.substring(0, 7)}...${address?.substring(address.length - 5)}`
          : "Connect"}
      </button>
    </div>
  );
};
