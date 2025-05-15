const { ethers } = require("ethers");
const contractABI = require("../web3/NFT_ABI.json");
const contractAddress = process.env.NFT_CONTRACT_ADDRESS;
const { uploadMetadataToPinata } = require('../services/pinataService');
const NFTModel = require('../models/NFT');

// Setup provider, wallet, and contract
const provider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_API_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

// Main NFT minting function
async function mintNFT(toAddress) {
  // 1. Prepare metadata
  const metadata = {
    name: 'Legendary Fire Token',
    description: 'A powerful NFT from the Infernos faction',
    image: 'https://your-image-url.com/fire-token.png'
  };

  // 2. Upload to IPFS
  const tokenURI = await uploadMetadataToPinata(metadata);

  // 3. Mint NFT
  const tx = await contract.mintNFT(toAddress, tokenURI);
  await tx.wait();

  // 4. Save to DB
  await NFTModel.create({
    to: toAddress,
    tokenURI,
    txHash: tx.hash
  });

  return { success: true, txHash: tx.hash };
}

module.exports = { mintNFT };