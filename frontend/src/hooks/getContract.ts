import abi from "@/abi/HoytsX.json";
import config from "@/config.json";
import { Contract, ContractRunner } from "ethers";

export const getContract = async (runner: ContractRunner) => {
  return new Contract(config[31337].HoytsX.address, abi, runner);
};
