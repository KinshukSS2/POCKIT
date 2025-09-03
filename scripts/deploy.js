const { ethers } = require("hardhat");

async function main() {
  const guardians = [
    "0xDc3F4038c2EA219796B509E5A54FD979B9Bc0f08",
    "0xAbfF690D8BE464E9a22CC10B2f8ddAaf551204Cc",
    "0xbaff547e767b197e5476ad12FF1a252Df83E432c",
    "0xA7F9B2367BBf6Bf30219ecdd6989a7Ff82019A85",
    "0x43345C7c699aF9Df0E1e6374923f479e46eb1399"
  ];

  const Wallet = await ethers.getContractFactory("wallet");
  const wallet = await Wallet.deploy(guardians);

  await wallet.waitForDeployment();
  const address = await wallet.getAddress(); 

  console.log("✅ Wallet contract deployed to:", address);
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});
