// test/web3Integration.test.js
const web3 = require('../utils/web3'); // Web3.js instance
const { mintNFT } = require('../utils/nftContract');
const Player = require('../models/Player');
const NFT = require('../models/NFT');

describe('Web3 Integration', () => {
  it('should mint an NFT and save to the database', async () => {
    const player = new Player({
      username: 'testplayer',
      walletAddress: 'player-wallet-address', // Use a valid test address
    });

    await player.save();

    const tokenURI = 'https://example.com/nft-metadata.json'; // Replace with actual URI
    const receipt = await mintNFT(player.walletAddress, tokenURI);

    const nft = await NFT.findOne({ tokenId: receipt.events.Transfer.returnValues.tokenId });

    expect(nft).not.toBeNull();
    expect(nft.owner.toString()).toBe(player._id.toString());
    expect(nft.tokenURI).toBe(tokenURI);
  });

  it('should fail if minting transaction fails', async () => {
    // Simulate an error by passing invalid parameters or simulating a failed mint
    const player = new Player({
      username: 'testplayer',
      walletAddress: 'invalid-wallet-address', // Invalid wallet address
    });

    await player.save();

    const tokenURI = 'https://example.com/nft-metadata.json';
    try {
      await mintNFT(player.walletAddress, tokenURI);
    } catch (error) {
      expect(error.message).toBe('Failed to mint NFT');
    }
  });
});