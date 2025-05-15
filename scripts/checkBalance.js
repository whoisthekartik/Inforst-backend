const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying from address:", deployer.address);

  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Wallet balance:", ethers.formatEther(balance), "MATIC");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});