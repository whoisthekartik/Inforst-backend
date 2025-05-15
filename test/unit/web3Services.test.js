// tests/unit/web3Service.test.js
const { expect } = require('chai');
const { connectWallet, getBalance, mintNFT } = require('../../src/services/web3Service');

describe('Web3 Service', () => {
    let privateKey = 'your_private_key';  // Replace with a valid private key for testing
    let testAddress = '0x...';  // Replace with an actual test address
    let tokenURI = 'https://my-nft-uri.com';

    it('should connect wallet and return address', async () => {
        const address = await connectWallet(privateKey);
        expect(address).to.be.a('string');
    });

    it('should return balance for a given address', async () => {
        const balance = await getBalance(testAddress);
        expect(balance).to.be.a('string');
        expect(parseFloat(balance)).to.be.greaterThan(0);
    });

    it('should mint an NFT', async () => {
        const tx = await mintNFT(testAddress, tokenURI);
        expect(tx).to.have.property('status').that.equals(true);
    });
});