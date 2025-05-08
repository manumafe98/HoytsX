import { isOwnerWallet, useWindowSize } from "@/hooks";
import { Menu } from "@/icons";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Navigation } from "./Navigation";
import { SmallNavigationMenu } from "./SmallNavigationMenu";
import { WalletConnectButton } from "./WalletConnectButton";

type NavbarProps = {
  onNavigate?: (section: string) => void;
};

export const NavBar = ({ onNavigate }: NavbarProps) => {
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { open } = useAppKit();
  const { address, isConnected, status } = useAppKitAccount();
  const showMenuIcon = useWindowSize();

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
    <div
      className={`${location.pathname === "/" ? "fixed top-0 left-0 right-0 z-50" : ""} flex justify-between items-center h-36 bg-gradient-to-l from-secondary to-primary border-b-1 border-solid border-b-primary p-10`}
    >
      <h1
        className="text-4xl font-bold text-white cursor-pointer"
        onClick={() => handleNavigate("/")}
      >
        H o y t s X
      </h1>
      {showMenuIcon ? (
        <>
          <Menu onClick={() => setIsMenuOpen(true)} />
          <SmallNavigationMenu
            isOpen={isMenuOpen}
            isOwner={isOwner}
            isConnected={isConnected}
            showMenuIcon={showMenuIcon}
            address={address}
            handleNavigate={handleNavigate}
            onNavigate={onNavigate}
            handleOpen={handleOpen}
            onClose={() => setIsMenuOpen(false)}
          />
        </>
      ) : (
        <>
          <Navigation
            isOwner={isOwner}
            showMenuIcon={showMenuIcon}
            handleNavigate={handleNavigate}
            onNavigate={onNavigate}
          />
          <WalletConnectButton
            isConnected={isConnected}
            address={address}
            classname="bg-primary rounded-4xl text-white text-xl cursor-pointer hover:bg-primary/80 duration-200 transform p-4"
            onClick={handleOpen}
          />
        </>
      )}
    </div>
  );
};
