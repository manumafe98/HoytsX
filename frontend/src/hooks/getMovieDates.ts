import { getContract } from "./getContract";

export const getMovieDates = async (id: number): Promise<string[]> => {
  const contract = getContract();
  return contract.getMovieDates(id);
};
