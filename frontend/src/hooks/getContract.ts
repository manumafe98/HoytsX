import { Contract, ContractRunner } from "ethers";
import abi from "../abi/HoytsX.json";
import config from "../config.json";

export const getContract = async (runner: ContractRunner) => {
  return new Contract(config[31337].HoytsX.address, abi, runner);
};
