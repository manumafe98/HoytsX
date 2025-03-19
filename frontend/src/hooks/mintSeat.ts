import { TransactionResult } from "@/types/transactionResult.type";
import { BrowserProvider, ContractTransactionResponse } from "ethers";
import { getContract } from "./getContract";
import { getProvider } from "./getProvider";

export const mintSeat = async (
  movieId: number,
  date: string,
  time: string,
  seatId: number,
  seatCost: number,
): Promise<TransactionResult> => {
  let success;
  let transactionHash;

  try {
    const provider = getProvider() as BrowserProvider;

    const signer = await provider.getSigner();
    const contract = await getContract(signer);

    const transaction: Promise<ContractTransactionResponse> =
      contract.mintMovieTicket(movieId, date, time, seatId, {
        value: seatCost,
      });

    const receipt = await (await transaction).wait();

    success = receipt?.status === 1;
    transactionHash = (await transaction).hash;
  } catch (error) {
    success = false;
    transactionHash = undefined;
  }

  return {
    success,
    transactionHash,
    date,
    time,
  };
};
