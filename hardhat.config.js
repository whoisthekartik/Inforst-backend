require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: {
    compilers: [
      { version: "0.8.29" },
      { version: "0.8.20" }
    ]
  },
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    "polygonZkEvm": {
      url: "https://polygonzkevm-mainnet.g.alchemy.com/v2/l9KUTrys5cp7OueFXWnUBF0JfCW2xtCJ", // Correct RPC for Cardona
      accounts: ["0a9476f24caf465c1a390614ed641cb3b7a6e11ae606bba111a70c1f3a2e300e"], // Replace with your private key
    
    }
  }
};