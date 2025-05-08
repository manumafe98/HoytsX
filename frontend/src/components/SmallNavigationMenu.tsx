import { Close } from "@/icons";
import { Navigation } from "./Navigation";
import { WalletConnectButton } from "./WalletConnectButton";

interface SmallNavigationMenuProps {
  isOpen: boolean;
  isOwner: boolean;
  isConnected: boolean;
  showMenuIcon: boolean;
  address: string;
  handleNavigate: (path: string) => void;
  onNavigate: (section: string) => void;
  handleOpen: () => void;
  onClose: () => void;
}

export const SmallNavigationMenu = ({
  isOpen,
  isOwner,
  isConnected,
  showMenuIcon,
  address,
  handleNavigate,
  onNavigate,
  handleOpen,
  onClose,
}: SmallNavigationMenuProps) => {
  return (
    <div
      className={`fixed top-0 right-0 w-1/2 max-lg:w-3/4 max-md:w-full h-screen bg-gradient-to-t from-background-gradiant-start to-background-gradiant-end transform ${isOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out z-40 border-l-1 border-solid border-primary`}
    >
      <button
        className="rounded-4xl p-3 hover:bg-gray-300/35 absolute right-5 top-5"
        onClick={onClose}
      >
        <Close className="size-6 fill-current text-white" />
      </button>
      <div className="flex items-center justify-center w-full mt-20">
        <WalletConnectButton
          isConnected={isConnected}
          address={address}
          classname="w-4/5 bg-primary rounded-4xl text-white text-xl cursor-pointer hover:bg-primary/80 duration-200 transform p-4"
          onClick={handleOpen}
        />
      </div>
      <Navigation
        isOwner={isOwner}
        showMenuIcon={showMenuIcon}
        handleNavigate={handleNavigate}
        onNavigate={onNavigate}
        onClose={onClose}
      />
    </div>
  );
};
