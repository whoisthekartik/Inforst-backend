require("dotenv").config(); // ✅ Load env at the very top
const express = require("express");
const cors = require("cors");
const { ethers } = require("ethers");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const logger = require('./utils/logger');
const swaggerDocument = require('./swagger.json');
const swaggerDocs = require('./swagger');
const PORT = process.env.PORT || 5000;

app.use("/api/player", require("./routes/player"));

const factionStatsRoutes = require('./routes/factionStatsRoutes');
app.use('/api/factions/stats', factionStatsRoutes);

swaggerDocs(app);



// Confirm env loaded
console.log("Loaded MONGO_URI:", process.env.MONGO_URI);

// Swagger setup
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swaggerConfig');






  






const web3Routes = require('./routes/web3');
app.use(cors());
app.use('/api/web3', web3Routes);

const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

const helmet = require('helmet');

// CORS config
app.use(cors({
  origin: ['http://localhost:3001'], // your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

const authRoutes = require("./routes/authRoutes");
app.use(express.json());
app.use(cors());

// Your routes setup

app.use('/api/auth', authRoutes); // ✅ Correct
app.use('/api-docs', require('./swagger'));



// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const leaderboardRoutes = require('./routes/leaderboardRoutes');
app.use('/api/leaderboard', leaderboardRoutes);

const marketplaceRoutes = require('./routes/marketplaceRoutes');
app.use('/api/marketplace', marketplaceRoutes);


app.use(express.json());
const factionRoutes = require('./routes/factionRoutes');

app.use('/api/factions', require('./routes/factionRoutes'));

const nftRoutes = require("./routes/nftRoutes");
app.use("/api/nft", nftRoutes);

app.use(express.json());

// Load environment variables

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ALCHEMY_API_URL = process.env.ALCHEMY_API_URL;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const ABI = require("./InfrostNFT.json");

const factionInfluenceRoutes = require('./routes/factionInfluenceRoutes');
app.use('/api/faction-influence', factionInfluenceRoutes);

// ✅ FIXED Mongoose connection with options
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB Connection Error:", err.message));

const provider = new ethers.providers.JsonRpcProvider(ALCHEMY_API_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);

// Gain XP endpoint
app.post("/gain-xp", async (req, res) => {
  try {
    const { player, amount } = req.body;
    const tx = await contract.gainExperience(player, amount);
    await tx.wait();
    res.json({ status: "success", txHash: tx.hash });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Wallet Balance
app.get("/balance", async (req, res) => {
  try {
    const balance = await provider.getBalance(wallet.address);
    res.json({ address: wallet.address, balance: ethers.formatEther(balance) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mint NFT
app.post("/mint", async (req, res) => {
  try {
    const { to, tokenURI } = req.body;
    const tx = await contract.mintNFT(to, tokenURI);
    await tx.wait();
    res.json({ status: "success", txHash: tx.hash });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get NFT owner
app.get("/owner/:tokenId", async (req, res) => {
  try {
    const owner = await contract.ownerOf(req.params.tokenId);
    res.json({ tokenId: req.params.tokenId, owner });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Serve static files if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

// Final error handler
app.use((err, req, res, next) => {
  console.error("🔥 Error:", err.stack);
  res.status(err.statusCode || 500).json({
    status: "error",
    message: err.message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack, details: err })
  });
});
// Start server
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});


// Graceful shutdown
process.on("unhandledRejection", (err) => {
  console.error("💥 UNHANDLED REJECTION! Shutting down...");
  console.error(err.name, err.message);
  server.close(() => process.exit(1));
});

process.on("SIGTERM", () => {
  console.log("🛑 SIGTERM received. Shutting down gracefully...");
  server.close(() => {
    console.log("💤 Process terminated");
    mongoose.connection.close(false);
  });
});