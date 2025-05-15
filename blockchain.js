// Import dependencies
const express = require('express');
const router = express.Router();
const Web3 = require('web3');
const User = require('../models/User'); // Your MongoDB User model

// Initialize Web3 and contract
const web3 = new Web3(process.env.BLOCKCHAIN_NODE_URL); // From .env
const contractABI = require('../contractABI.json'); // Your NFT contract's ABI
const contractAddress = process.env.CONTRACT_ADDRESS; // From .env

// --- NFT Minting Route ---
router.post('/mint', async (req, res) => {
  try {
    // 1. Authenticate user via token
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "No authorization token" });
    }
    const token = authHeader.split(' ')[1]; // Extract JWT token
    const user = await User.findOne({ token }); // Find user in MongoDB

    if (!user) {
      return res.status(401).json({ error: "Invalid token" });
    }

    // 2. Get Pokémon data from request
    const { name, elements, stats } = req.body.pokemon;

    // 3. Interact with smart contract
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    const tx = await contract.methods
      .mintPokemon(user.walletAddress, name, elements, stats)
      .send({ 
        from: process.env.ADMIN_WALLET, // Your admin wallet
        gas: 500000 
      });

    // 4. Save NFT to user's collection in MongoDB
    await User.updateOne(
      { _id: user._id },
      { $push: { 
        pokemonNFTs: { 
          name: name,
          elements: elements,
          stats: stats,
          txHash: tx.transactionHash 
        } 
      } 
    });

    // 5. Return success response
    res.json({ 
      success: true, 
      txHash: tx.transactionHash 
    });

  } catch (error) {
    console.error("Minting error:", error);
    res.status(500).json({ error: "Minting failed" });
  }
});

// Export the router
module.exports = router;