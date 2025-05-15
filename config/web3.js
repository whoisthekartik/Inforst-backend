require('dotenv').config();
const Web3 = require('web3');

// Create provider and instance

const { ethers } = require("ethers");
const provider = new ethers.providers.JsonRpcProvider("https://polygonzkevm-testnet.g.alchemy.com/v2/l9KUTrys5cp7OueFXWnUBF0JfCW2xtC");

console.log("web3 initialized");
module.exports = provider;