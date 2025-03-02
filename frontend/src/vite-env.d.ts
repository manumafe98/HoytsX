import { Eip1193Provider } from "ethers";

/// <reference types="vite/client" />

interface Window {
    ethereum: Eip1193Provider;
}
