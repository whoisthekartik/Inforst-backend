// src/components/NftMint.js
import React, { useState } from 'react';
import { mintNFT } from '../services/apiService';

const NftMint = () => {
  const [nftUri, setNftUri] = useState('');
  const [status, setStatus] = useState('');

  const handleMint = async (e) => {
    e.preventDefault();
    
    const nftData = { playerAddress: '0xPlayerAddress', tokenURI: nftUri };

    try {
      setStatus('Minting NFT...');
      const response = await mintNFT(nftData);
      setStatus(NFT minted successfully! Transaction: ${response.receipt.transactionHash});
    } catch (error) {
      setStatus('Failed to mint NFT.');
    }
  };

  return (
    <div>
      <h2>Mint an NFT</h2>
      <form onSubmit={handleMint}>
        <input
          type="text"
          placeholder="NFT URI"
          value={nftUri}
          onChange={(e) => setNftUri(e.target.value)}
        />
        <button type="submit">Mint NFT</button>
      </form>
      <p>{status}</p>
    </div>
  );
};

export default NftMint;