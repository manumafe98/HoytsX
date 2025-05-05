import { getAddress } from "ethers";
import { getContract } from "./getContract";

export const isOwnerWallet = async (address: string): Promise<boolean> => {
  const contract = getContract();
  const ownerWallet = await contract.getOwner();

  return ownerWallet === getAddress(address);
};
