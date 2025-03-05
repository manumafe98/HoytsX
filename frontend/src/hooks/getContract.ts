import { Contract } from "ethers";
import abi from "../abi/HoytsX.json";
import config from "../config.json";
import { getProviderAndSigner } from "./getProviderAndSigner";

export const getContract = async () => {
  const { provider } = getProviderAndSigner();

  return new Contract(config[31337].HoytsX.address, abi, provider);
};
