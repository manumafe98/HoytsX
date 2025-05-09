import { DateShowtime } from "@/types/dateShowtime.type";
import { ContractTransactionResponse, ethers } from "ethers";
import { getContract } from "./getContract";
import { getProvider } from "./getProvider";

export const listMovie = async (
  name: string,
  description: string,
  ipfsHash: string,
  genre: string,
  director: string,
  actors: string[],
  duration: number,
  dateShowtimes: DateShowtime[],
) => {
  let success: boolean;
  try {
    const provider = getProvider();
    const signer = await provider.getSigner();
    const contract = getContract(signer);

    dateShowtimes.forEach((dateShowtime) => {
      dateShowtime.showtimes.forEach((showtime) => {
        showtime.cost = ethers.parseEther(`${showtime.cost}`);
      });
    });

    const transaction: Promise<ContractTransactionResponse> =
      await contract.listMovie(
        name,
        description,
        ipfsHash,
        genre,
        director,
        actors,
        duration,
        dateShowtimes,
      );
    const receipt = await (await transaction).wait();

    success = receipt?.status === 1;
  } catch {
    success = false;
  }

  return success;
};
