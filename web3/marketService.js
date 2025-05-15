const web3 = require('../config/web3');
const MarketContract = require('./contracts/Marketplace.json');
const { MARKET_CONTRACT_ADDRESS } = require('../config/constants');

const contract = new web3.eth.Contract(
  MarketContract.abi,
  MARKET_CONTRACT_ADDRESS
);

// List NFT for sale
exports.listNFT = async (sellerWallet, nftContractAddress, tokenId, price) => {
  const tx = await contract.methods
    .listNFT(nftContractAddress, tokenId, web3.utils.toWei(price.toString(), 'ether'))
    .send({
      from: sellerWallet,
      gas: 400000
    });
  return tx.transactionHash;
};

// Buy NFT
exports.buyNFT = async (buyerWallet, listingId, price) => {
  const tx = await contract.methods
    .buyNFT(listingId)
    .send({
      from: buyerWallet,
      value: web3.utils.toWei(price.toString(), 'ether'),
      gas: 500000
    });
  return tx.transactionHash;
};