const Web3 = require('web3');
const ABI = require('../yourContractABI.json'); // Adjust the ABI file path
require('dotenv').config();

// Connect to the blockchain
const web3 = new Web3(process.env.RPC_URL);
const contractAddress = process.env.CONTRACT_ADDRESS;
const contract = new web3.eth.Contract(ABI, contractAddress);

// Load wallet credentials
const senderAddress = process.env.SENDER_ADDRESS;
const privateKey = process.env.PRIVATE_KEY;

async function gainExperience(playerAddress, xpAmount) {
  try {
    console.log(`Sending ${xpAmount} XP to ${playerAddress}...`);

    const tx = contract.methods.gainExperience(playerAddress, xpAmount);
    
    let gas;
    try {
      gas = await tx.estimateGas({ from: senderAddress });
    } catch (err) {
      console.warn('Gas estimation failed, using default gas limit:', err.message);
      gas = 300000;
    }

    const gasPrice = await web3.eth.getGasPrice();
    const data = tx.encodeABI();
    const nonce = await web3.eth.getTransactionCount(senderAddress, 'pending');

    const signedTx = await web3.eth.accounts.signTransaction(
      {
        to: contractAddress,
        data,
        gas,
        gasPrice,
        nonce,
        chainId: Number(process.env.CHAIN_ID) || 80001,
      },
      privateKey
    );

    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    console.log('✅ XP added successfully. TX Hash:', receipt.transactionHash);
    return receipt;
  } catch (error) {
    console.error('❌ Failed to add experience:', error);
    throw error;
  }
}

// Export the function
module.exports = gainExperience;