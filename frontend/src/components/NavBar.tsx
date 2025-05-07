import { isOwnerWallet } from "@/hooks/isOwnerWallet";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type NavbarProps = {
  onNavigate?: (section: string) => void;
};

export const NavBar = ({ onNavigate }: NavbarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
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

  const menuOptions = [
    {
      name: "Home",
      onclick: () => handleNavigate("/"),
      onlyOwner: false,
      shouldBeAvailableOPathsDifferentsThanHome: true,
      shouldBeAvailableOnHome: false,
    },
    {
      name: "About us",
      onclick: () => onNavigate("about"),
      onlyOwner: false,
      shouldBeAvailableOPathsDifferentsThanHome: false,
      shouldBeAvailableOnHome: true,
    },
    {
      name: "Movies",
      onclick: () => onNavigate("movies"),
      onlyOwner: false,
      shouldBeAvailableOPathsDifferentsThanHome: false,
      shouldBeAvailableOnHome: true,
    },
    {
      name: "Admin",
      onclick: () => handleNavigate("/admin"),
      onlyOwner: true,
      shouldBeAvailableOPathsDifferentsThanHome: true,
      shouldBeAvailableOnHome: true,
    },
  ];

  const renderMenuItem = (option: (typeof menuOptions)[0], index: number) => {
    if (option.onlyOwner && !isOwner) return null;
    if (
      !option.shouldBeAvailableOPathsDifferentsThanHome &&
      location.pathname !== "/"
    )
      return null;
    if (!option.shouldBeAvailableOnHome && location.pathname === "/")
      return null;

    return (
      <li
        key={index}
        className="hover:text-background-gradiant-end transform duration-200 cursor-pointer"
        onClick={option.onclick}
      >
        {option.name}
      </li>
    );
  };

  return (
    <div
      className={`${location.pathname === "/" ? "fixed top-0 left-0 right-0 z-50" : ""} flex justify-between items-center h-36 bg-gradient-to-l from-secondary to-primary border-b-1 border-solid border-b-primary p-10`}
    >
      <h1
        className="text-4xl font-bold text-white cursor-pointer"
        onClick={() => handleNavigate("/")}
      >
        H o y t s X
      </h1>
      <ul className="flex text-xl text-white gap-5">
        {menuOptions.map(renderMenuItem)}
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
