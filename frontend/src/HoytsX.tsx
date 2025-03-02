import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import { mainnet } from "@reown/appkit/networks";
import { createAppKit } from "@reown/appkit/react";
import { Footer } from "./components/Footer";
import { Movies } from "./components/Movies";
import { NavBar } from "./components/NavBar";

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
  }
});

export const HoytsX = () => {
  return (
    <div className="h-screen flex flex-col">
      <header>
        <NavBar />
      </header>
      <section>
        <Movies />
      </section>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}
