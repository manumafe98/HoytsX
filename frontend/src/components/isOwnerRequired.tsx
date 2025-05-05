import { isOwnerWallet } from "@/hooks/isOwnerWallet";
import { useAppKitAccount } from "@reown/appkit/react";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const IsOwnerRequired = () => {
  const { address, status } = useAppKitAccount();
  const location = useLocation();
  const [isOwner, setIsOwner] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const checkOwnership = async () => {
      if (status === "connected" && address) {
        const result = await isOwnerWallet(address);
        setIsOwner(result);
      }
    };
    checkOwnership();
  }, [status, address]);

  if (status === "connecting" || isOwner === undefined) {
    return <div className="h-screen">Loading...</div>;
  }

  return isOwner ? (
    <Outlet />
  ) : (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  );
};
