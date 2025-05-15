const hre = require("hardhat");

async function main() {
  const InforstCore = await hre.ethers.getContractFactory("InforstCore");
  
  // Deploy the contract
  const game = await InforstCore.deploy();
  await game.deployed();

  console.log("InforstCore deployed to:", game.address);

  // If you want to interact with an already deployed contract:
  const gameInstance = await hre.ethers.getContractAt(
    "InforstGame",
    "0xeD16593d0cF1A247774e80Bf8D6669DFc2199e28"
  );

  // Call some function on the existing contract
  console.log(await gameInstance.someFunction());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});