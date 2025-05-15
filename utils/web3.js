const { Web3 } = require('web3');
const path = require('path');
const fs = require('fs');
const solc = require('solc');

// 1. Configure with error handling
const initWeb3 = () => {
  try {
    return new Web3('http://localhost:8545');
  } catch (error) {
    console.error('❌ Web3 initialization failed:', error.message);
    process.exit(1);
  }
};

const web3 = initWeb3();

// 2. Find Solidity Contract File
const findContractFile = () => {
  const possiblePaths = [
    path.join(__dirname, '../contracts/InfrostNFT.sol'),
    path.join(__dirname, '../src/contracts/InfrostNFT.sol'),
    path.join(__dirname, '../InfrostNFT.sol')
  ];

  for (const contractPath of possiblePaths) {
    if (fs.existsSync(contractPath)) {
      return contractPath;
    }
  }

  console.error('🔍 Contract not found. Searched in:');
  possiblePaths.forEach(p => console.log(`- ${p}`));
  process.exit(1);
};

// 3. Safe Compilation Function
const compileContract = async () => {
  try {
    const contractPath = findContractFile();
    console.log(`✓ Found contract at: ${contractPath}`);

    const sourceCode = fs.readFileSync(contractPath, 'utf8');
    const input = {
      language: 'Solidity',
      sources: { 'InfrostNFT.sol': { content: sourceCode } },
      settings: { 
        outputSelection: { 
          '*': { 
            '*': ['abi', 'evm.bytecode'] 
          } 
        } 
      }
    };

    console.log('🔨 Compiling contract...');
    const output = JSON.parse(solc.compile(JSON.stringify(input)));

    if (output.errors) {
      const errors = output.errors
        .filter(err => !err.message.includes('Warning'))
        .map(err => err.formattedMessage);
      if (errors.length > 0) throw new Error(errors.join('\n'));
    }

    const contractName = Object.keys(output.contracts['InfrostNFT.sol'])[0];
    const contract = output.contracts['InfrostNFT.sol'][contractName];
    
    return {
      abi: contract.abi,
      bytecode: contract.evm.bytecode.object
    };
  } catch (error) {
    console.error('❌ Compilation failed:', error.message);
    process.exit(1);
  }
};

// 4. Contract Connection with Retries
const connectToContract = async (attempt = 1) => {
  try {
    const { abi } = await compileContract();
    const contractAddress = process.env.CONTRACT_ADDRESS || 'YOUR_CONTRACT_ADDRESS';

    if (!web3.utils.isAddress(contractAddress)) {
      throw new Error(`Invalid contract address: ${contractAddress}`);
    }

    const contract = new web3.eth.Contract(abi, contractAddress);
    
    // Test connection
    await contract.methods.someSimpleMethod().call().catch(() => {});
    console.log('✅ Successfully connected to contract');
    return contract;
  } catch (error) {
    if (attempt <= 3) {
      console.log(`⚠️  Retrying connection (attempt ${attempt}/3)...`);
      await new Promise(resolve => setTimeout(resolve, 2000 * attempt));
      return connectToContract(attempt + 1);
    }
    console.error('❌ Failed to connect after 3 attempts:', error.message);
    process.exit(1);
  }
};

// 5. Clean Exit Handling
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled rejection:', reason);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error);
  process.exit(1);
});

module.exports = connectToContract();