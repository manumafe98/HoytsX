import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  define: {
    "process.env": {},
    "process.browser": true,
    "process.version": JSON.stringify(process.version),
    "import.meta.env.PROJECT_ID": JSON.stringify(process.env.PROJECT_ID),
    "import.meta.env.PINATA_JWT": JSON.stringify(process.env.PINATA_JWT),
    "import.meta.env.PINATA_GATEWAY": JSON.stringify(process.env.PINATA_GATEWAY),
    "import.meta.env.RPC_URL": JSON.stringify(process.env.RPC_URL),
    "import.meta.env.CHAIN_ID": JSON.stringify(process.env.CHAIN_ID)
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  }
})
