interface WalletConnectButtonProps {
  isConnected: boolean;
  address: string;
  classname: string;
  onClick: () => void;
}

export const WalletConnectButton = ({
  isConnected,
  address,
  classname, onClick,
}: WalletConnectButtonProps) => {
  return (
    <button
      className={classname}
      onClick={onClick}
    >
      {isConnected
        ? `${address?.substring(0, 7)}...${address?.substring(address.length - 5)}`
        : "Connect"}
    </button>
  );
};
