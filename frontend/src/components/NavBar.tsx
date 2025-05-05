import { isOwnerWallet } from "@/hooks/isOwnerWallet";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const NavBar = () => {
  const navigate = useNavigate();
  const { open } = useAppKit();
  const { address, isConnected, status } = useAppKitAccount();
  const [isOwner, setIsOwner] = useState<boolean>(false);

  useEffect(() => {
    const checkOwnership = async () => {
      if (address && status === "connected") {
        const isOwner = await isOwnerWallet(address);
        setIsOwner(isOwner);
      } else {
        setIsOwner(false);
      }
    };
    checkOwnership();
  }, [address, status]);

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const handleOpen = () => {
    open();
  };

  return (
    <div className="flex justify-between items-center h-36 bg-gradient-to-l from-secondary to-primary border-b-1 border-solid border-b-primary p-10">
      <h1
        className="text-4xl font-bold text-white cursor-pointer"
        onClick={() => handleNavigate("/")}
      >
        H o y t s X
      </h1>
      <ul className="flex text-xl text-white gap-5">
        <li className="hover:text-background-gradiant-end transform duration-200 cursor-pointer">
          About us
        </li>
        <li className="hover:text-background-gradiant-end transform duration-200 cursor-pointer">
          Movies
        </li>
        {isOwner && (
          <li
            className="hover:text-background-gradiant-end transform duration-200 cursor-pointer"
            onClick={() => handleNavigate("/admin")}
          >
            Admin
          </li>
        )}
      </ul>
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
