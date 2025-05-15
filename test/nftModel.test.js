const NFT = require('../models/NFT');

describe('NFT Model', () => {
  it('should create a new NFT', async () => {
    const nftData = {
      tokenId: 1,
      owner: 'valid-player-id',
      tokenURI: 'https://example.com/nft-metadata.json',
    };

    const nft = new NFT(nftData);
    await nft.save();

    expect(nft.tokenId).toBe(1);
    expect(nft.tokenURI).toBe('https://example.com/nft-metadata.json');
  });

  it('should not create an NFT without a tokenId', async () => {
    const nftData = {
      owner: 'valid-player-id',
      tokenURI: 'https://example.com/nft-metadata.json',
    };

    try {
      await new NFT(nftData).save();
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });
});