# 🎬 HoytsX – Cinema Ticketing DApp

> **Revolutionizing the cinema with blockchain**  
> HoytsX is revolutionizing the cinema experience by bringing the power of blockchain technology to movie enthusiasts. As the world's first decentralized cinema platform, we combine the timeless joy of film with cutting-edge Web3 innovation.

A decentralized cinema ticketing platform on the Sepolia Ethereum testnet. Users can explore a list of available movies, select a showtime, and purchase their seat as a **non-fungible token (NFT)** ticket. All movie and ticket data is stored on-chain, while poster images are hosted via IPFS. The app also includes admin features for the owner to manage the movie listings.

🔗 **Deployed Contract on Sepolia**: [0xeD4DC4D881ce7ed238c6940D9c97eae86B3BD29d](https://sepolia.etherscan.io/address/0xeD4DC4D881ce7ed238c6940D9c97eae86B3BD29d#code)

---

## 🛠️ Features

### 🎟️ User Flow

- Visit the DApp and browse the available movies.
- Connect your Ethereum wallet (Sepolia network).
- Select a movie, choose a show date and time.
- Select an available seat.
- Pay with ETH to mint your ticket as an ERC721 NFT.
- Each ticket is unique and verifiable on-chain.

### 🎬 Admin Functionality

- Only the **contract owner** can:
  - Add new movies with metadata:
    - Name, description, genre, director, actors
    - Poster image (via IPFS hash)
    - Duration and multiple showtimes across different dates
  - Withdraw contract funds.

### 🧠 Smart Contract Logic

- Built using **ERC721** to represent tickets as NFTs.
- Seat availability is enforced:
  - Cannot mint an already taken or invalid seat.
- Each movie has:
  - Unique ID
  - Multiple show dates and showtimes
  - Limited number of tickets per showtime
- All ticket ownership is fully transparent and accessible via the blockchain.

---

## 💻 Technologies Used

### 📦 Smart Contract

- **Solidity** (v0.8.28)
- **Hardhat** (development & deployment)
- **OpenZeppelin** (ERC721 contract)

### 🖥️ Frontend

- **React**
- **Vite** (build tool)
- **Tailwind CSS** (styling)
- **TypeScript**
- **Ethers.js** (Ethereum interaction)
- **Reown AppKit** (wallet connection)

---

## 📸 IPFS Integration

- All movie poster images are uploaded and stored on IPFS (e.g., via Pinata).
- The IPFS hash is used in the smart contract and frontend for rendering visuals.

---

## 📄 License

MIT
