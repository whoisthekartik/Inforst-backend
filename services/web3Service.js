// src/services/web3Service.js
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.WEB3_PROVIDER_URL));

const contractABI = require('../config/contractABI.json');  // ABI of your smart contract
const contractAddress = process.env.CONTRACT_ADDRESS;     // Contract address

const contract = new web3.eth.Contract(contractABI, contractAddress);

const connectWallet = async (privateKey) => {
    web3.eth.accounts.wallet.add(privateKey);
    return web3.eth.accounts.wallet[0].address;
};

const getBalance = async (address) => {
    const balance = await web3.eth.getBalance(address);
    return web3.utils.fromWei(balance, 'ether');
};

const mintNFT = async (toAddress, tokenURI) => {
    const fromAddress = web3.eth.accounts.wallet[0].address;
    const tx = await contract.methods.mint(toAddress, tokenURI).send({ from: fromAddress });
    return tx;
};

module.exports = {
    connectWallet,
    getBalance,
    mintNFT,
};