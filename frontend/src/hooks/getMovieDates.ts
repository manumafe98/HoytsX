import { getContract } from "./getContract";
import { getProvider } from "./getProvider";

export const getMovieDates = async (id: number): Promise<string[]> => {
  const provider = getProvider();
  const contract = await getContract(provider);
  return contract.getMovieDates(id);
};
