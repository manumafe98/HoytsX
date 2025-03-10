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
    "import.meta.env.PROJECT_ID": JSON.stringify(process.env.PROJECT_ID)
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  }
})
