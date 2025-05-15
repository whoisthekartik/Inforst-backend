// tests/unit/nftService.test.js
const nftService = require('../../src/services/nftService');

describe('NFT Service', () => {
  test('should mint an NFT successfully', async () => {
    const receipt = await nftService.mintNFT('0xPlayerAddress', 'tokenURI');
    expect(receipt.status).toBe(true);
  });
});