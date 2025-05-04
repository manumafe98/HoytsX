import abi from "@/abi/HoytsX.json";
import rawConfig from "@/config.json" assert { type: "json" };
import { Contract, ContractRunner } from "ethers";
import { getProvider } from "./getProvider";

interface Config {
  [chainId: string]: {
    HoytsX: {
      address: string;
    };
  };
}

export const getContract = (runner?: ContractRunner) => {
  const chainId = import.meta.env.CHAIN_ID;
  const config = rawConfig as Config;

  if (!runner) {
    runner = getProvider();
  }

  return new Contract(config[chainId].HoytsX.address, abi, runner);
};
