
const Web3 = require('web3');
require('dotenv').config();

const web3 = new Web3(
  new Web3.providers.HttpProvider(process.env.BLOCKCHAIN_RPC_URL)
);

const nftContractABI = require('./InfrostNFTABI.json');
const nftContract = new web3.eth.Contract(
  nftContractABI,
  process.env.NFT_CONTRACT_ADDRESS
);

module.exports = { web3, nftContract };