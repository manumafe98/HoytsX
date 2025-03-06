import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import { defineChain } from "@reown/appkit/networks";
import { createAppKit } from "@reown/appkit/react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Movie } from "./pages/Movie";

const hardhatNetwork = defineChain({
  id: 31337,
  caipNetworkId: "eip155:31337",
  chainNamespace: "eip155",
  name: "Hardhat",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH",
  },
  rpcUrls: {
    default: {
      http: ["http://127.0.0.1:8545"],
    },
  },
  blockExplorers: {
    default: {
      name: "Localhost Explorer",
      url: "http://127.0.0.1:8545",
    },
  },
});

const metadata = {
  name: "HoytsX",
  description: "Your cinema in the blockchain",
  url: "https://hoytsx.com",
  icons: ["https://avatars.hoytsx.com/"],
};

createAppKit({
  adapters: [new EthersAdapter()],
  networks: [hardhatNetwork],
  metadata,
  projectId: import.meta.env.PROJECT_ID,
  features: {
    analytics: true,
    socials: false,
    email: false,
  },
});

export const HoytsX = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie/:id" element={<Movie />} />
    </Routes>
  );
};
