// tests/integration/web3Routes.test.js
const request = require('supertest');
const app = require('../../src/app');  // Import the Express app

describe('Web3 API Routes', () => {
    it('should connect wallet and return address', async () => {
        const response = await request(app)
            .post('/api/web3/connect')
            .send({ privateKey: 'your_private_key' });  // Replace with a valid private key

        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('address').that.is.a('string');
    });

    it('should return balance for a given address', async () => {
        const response = await request(app)
            .get('/api/web3/balance/0x...');  // Replace with an actual test address

        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('balance').that.is.a('string');
    });

    it('should mint an NFT', async () => {
        const response = await request(app)
            .post('/api/web3/mint')
            .send({
                toAddress: '0x...',  // Replace with test address
                tokenURI: 'https://my-nft-uri.com',
            });

        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('tx');
    });
});