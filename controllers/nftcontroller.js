// controllers/nftcontroller.js
const NFT = require('../models/NFT');
const Player = require('../models/Player');
const { web3, nftContract } = require('../utils/web3');
const { validateNFTInput } = require('../middleware/validate');


const mintNFT = async (req, res) => {
  console.log("Request body:", req.body);
console.log("=== DEBUG mintNFT ===");
  console.log("Request Headers:", req.headers);

  const { playerId, name, image, description } = req.body;

  if (!playerId ||!name || !image || !description) {
    return res.status(400).json({
      error: "All fields are required",
      playerId, name, image, description
    });
  }

  try {
    const player = await Player.findById(playerId);
    if (!player) {
      return res.status(404).json({ error: "Player not found" });
    }

    const metadataURI = https://your-metadata-host.com/metadata/${name.replace(/\s+/g, '_')};

    const tx = await nftContract.methods
      .mintNFT(player.walletAddress, metadataURI)
      .send({ from: web3.eth.accounts.wallet[0].address, gas: 500000 });

    const tokenId = await nftContract.methods.tokenCount().call();

    const newNFT = new NFT({
      playerId,
      tokenId,
      name,
      image,
      description,
      metadataURI,
      transactionHash: tx.transactionHash
    });

    await newNFT.save();

    res.status(201).json({ message: "NFT minted successfully", nft: newNFT });
  } catch (error) {
    console.error("Mint NFT error:", error);
    res.status(500).json({ error: "Failed to mint NFT" });
  }
};

// Export as object
module.exports = {
  mintNFT,
  getPlayerNFTs,
  transferNFT,
  getNFTDetails
};