const  {ethers } = require('ethers'); // Import ethers first
const web3 = require('../config/web3'); // Your Web3 instance
const path = require('path');

// Load ABI
const contractPath = path.join(__dirname, '..', 'web3', 'contracts', 'InforstNFT.json');
const contractJson = require(contractPath);
const abi = contractJson.abi;

// Load contract address from env
const contractAddress = process.env.NFT_CONTRACT;

require('dotenv').config();



const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
// Instantiate contract
const nftContract = new ethers.Contract(contractAddress, abi, provider);

// Mint function
async function mintNFT(toAddress, tokenURI) {
  const privateKey = process.env.OWNER_PRIVATE_KEY;
  const wallet = new ethers.Wallet(privateKey, provider);
  const contractWithSigner = nftContract.connect(wallet);

  const tx = await contractWithSigner.mintNFT(toAddress, tokenURI);
  const receipt = await tx.wait();
  return receipt;
}

module.exports = { mintNFT };