import { BrowserProvider, Eip1193Provider, ethers } from "ethers";

export const getProviderAndSigner = () => {
  let provider = null;
  let signer = null;

  if (window.ethereum == null) {
    provider = ethers.getDefaultProvider();
  } else {
    provider = new BrowserProvider(
      window.ethereum as unknown as Eip1193Provider,
    );
    signer = provider.getSigner();
  }

  return {
    provider,
    signer,
  };
};
