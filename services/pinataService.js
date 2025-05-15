const axios = require('axios');

const PINATA_JWT = process.env.PINATA_JWT;

async function uploadMetadataToPinata(metadata) {
  const url = 'https://api.pinata.cloud/pinning/pinJSONToIPFS';

  try {
    const res = await axios.post(url, metadata, {
      headers: {
        Authorization: `Bearer ${PINATA_JWT}`,
        'Content-Type': 'application/json',
      },
    });

    const ipfsHash = res.data.IpfsHash;
    return `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
  } catch (err) {
    console.error('Pinata upload error:', err);
    throw new Error('Failed to upload metadata to Pinata');
  }
}

module.exports = { uploadMetadataToPinata };