import { BrowserProvider } from "ethers";
import { getContract } from "./getContract";
import { getProvider } from "./getProvider";

export const mintSeat = async (
  movieId: number,
  seatId: number,
  seatCost: number,
) => {
  const provider = getProvider() as BrowserProvider;

  const signer = await provider.getSigner();
  const contract = await getContract(signer);

  contract.mintMovieTicket(movieId, seatId, { value: seatCost });
};
