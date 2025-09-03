require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");

/** @type import('hardhat/config').HardhatUserConfig */

const fs = require("fs");

// Load secrets
let mnemonic = fs.readFileSync(".secret").toString().trim();
let alchemyprojectID = fs.readFileSync(".alchemy").toString().trim();

module.exports = {
  solidity: "0.8.28",
  networks:{
    sepolia:{
      url:`https://eth-sepolia.g.alchemy.com/v2/${alchemyprojectID}`,
      accounts: {
        mnemonic: mnemonic,
        path: "m/44'/60'/0'/0", // standard HD path
        initialIndex: 1,
        count: 10,
      },

    },

  },

  sourcify: {
    enabled: true
  },



};
