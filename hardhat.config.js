require("@nomiclabs/hardhat-waffle");


const { privateKeys } = require("./secrets.json");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  networks: {
    etherlinkTest: {
      url: "https://node.ghostnet.etherlink.com",
      chainId: 128123,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  solidity: {
    //configure solidity version for compilation
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
      },
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  mocha: {
    timeout: 20000,
  },
};