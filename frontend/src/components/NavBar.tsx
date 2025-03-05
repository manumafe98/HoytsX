import { useAppKit, useAppKitAccount } from "@reown/appkit/react";

export const NavBar = () => {
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();

  return (
    <div className="flex justify-between items-center h-36 bg-gradient-to-l from-[#10069f] to-[#9b2b66] border-b-1 border-solid border-b-[#9b2b66] p-5">
      <h1 className="text-4xl font-bold text-white">H o y t s X</h1>
      <button
        className="bg-[#9b2b66] rounded-4xl text-white text-xl cursor-pointer hover:bg-[#9b2b66]/80 duration-200 transform p-4"
        onClick={() => open()}
      >
        {isConnected
          ? `${address?.substring(0, 7)}...${address?.substring(address.length - 5)}`
          : "Connect"}
      </button>
    </div>
  );
};
