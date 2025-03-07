import { Contract } from "ethers";
import abi from "../abi/HoytsX.json";
import config from "../config.json";
import { getProvider } from "./getProvider";

export const getContract = async () => {
  const provider = getProvider();

  return new Contract(config[31337].HoytsX.address, abi, provider);
};
