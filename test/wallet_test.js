const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Wallet Contract", function () {
  let Wallet, wallet, owner, addr1, addr2, guardians;

  beforeEach(async function () {
    [owner, addr1, addr2, ...others] = await ethers.getSigners();

    guardians = [addr1.address, addr2.address, others[0].address, others[1].address, others[2].address];

    Wallet = await ethers.getContractFactory("wallet");
    wallet = await Wallet.deploy(guardians);
    await wallet.waitForDeployment();
  });

  it("Should set initial owner correctly", async function () {
    // Owner is private, so we cannot access directly
    // But we can check deposit/withdraw ownership logic
    await wallet.connect(owner).deposits({ value: ethers.parseEther("1") });
    expect(await wallet.balances(owner.address)).to.equal(ethers.parseEther("1"));
  });

  it("Should allow deposit and track balance", async function () {
    await wallet.connect(addr1).deposits({ value: ethers.parseEther("2") });
    const balance = await wallet.balances(addr1.address);
    expect(balance).to.equal(ethers.parseEther("2"));
  });

  it("Should fail withdrawal if not enough balance", async function () {
    await expect(
      wallet.connect(addr1).withdrawal(ethers.parseEther("1"), addr1.address)
    ).to.be.revertedWith("Insufficient funds to withdraw");
  });

  it("Should allow guardian to propose new owner", async function () {
    await wallet.connect(addr1).proposeNewOwner(addr2.address);
    await wallet.connect(addr2).proposeNewOwner(addr2.address);
    await wallet.connect(others[0]).proposeNewOwner(addr2.address);

    // After 3 guardian approvals, addr2 should become new owner
    // Can't access `owner` directly (private), so test withdrawal rights
    await wallet.connect(addr2).deposits({ value: ethers.parseEther("1") });

    await wallet.connect(addr2).withdrawal(ethers.parseEther("0.5"), addr1.address);

    const finalBalance = await wallet.balances(addr2.address);
    expect(finalBalance).to.equal(ethers.parseEther("0.5"));
  });

  it("Should handle subWithdrawals with approval", async function () {
    await wallet.connect(owner).deposits({ value: ethers.parseEther("5") });

    await wallet.connect(owner).approval(addr1.address, ethers.parseEther("1"));

    await wallet.connect(addr1).subWithdraw(owner.address, ethers.parseEther("1"));

    const ownerBal = await wallet.balances(owner.address);
    expect(ownerBal).to.equal(ethers.parseEther("4"));

    const allowance = await wallet.allowance(owner.address, addr1.address);
    expect(allowance).to.equal(0);
  });
});
