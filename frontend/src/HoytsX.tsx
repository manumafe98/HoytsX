import { mainnet } from "@reown/appkit/networks";
import { NavBar } from "./components/NavBar";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import { createAppKit } from "@reown/appkit/react";

const metadata = {
  name: "HoytsX",
  description: "Your cinema in the blockchain",
  url: "https://hoytsx.com",
  icons: ["https://avatars.hoytsx.com/"]
};

createAppKit({
  adapters: [new EthersAdapter()],
  networks: [mainnet],
  metadata,
  projectId: import.meta.env.PROJECT_ID,
  features: {
    analytics: true,
    socials: false,
    email: false
  },
  themeVariables: {
    "--w3m-color-mix": "#9b2b66",
    "--w3m-color-mix-strength": 40
  }
});

export const HoytsX = () => {
  return (
    <header>
      <NavBar />
    </header>
  )
}
