import { BrowserProvider, Eip1193Provider, JsonRpcProvider } from "ethers";

export const getProvider = () => {
  if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    return new BrowserProvider(window.ethereum as unknown as Eip1193Provider);
  }

  return new JsonRpcProvider(import.meta.env.RPC_URL);
};
