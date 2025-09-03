Smart Wallet 🛡️

A secure, trust-minimized Ethereum smart wallet that combines guardian-based recovery, rate-limiting, anti-reentrancy, and allowance-based sub-wallets. 

Designed for users with trust concerns, this wallet ensures your funds are always safe, transparent, and recoverable.

📖 Description


This Smart Wallet contract is built to go beyond a simple balance manager. It introduces trust safeguards such as:

Guardian System (5 guardians) – Protects against lost access by allowing guardians to collectively approve a new owner.

Multi-layer Security – Uses non-reentrancy locks and rate-limiting to prevent spam or malicious exploits.

Transparent Transactions – Every deposit and withdrawal is logged with events.

Allowance-Based Spending – Owners can delegate withdrawal rights to sub-owners with spending limits.

On-Chain History – Keeps track of all executed transactions for full accountability.

This design ensures that no single point of failure can compromise user assets.

🚀 Features

✅ Deposits – Users can deposit ETH safely into the wallet.

✅ Withdrawals – Owners can withdraw ETH with reentrancy protection and cooldown timers.

✅ Guardian Recovery – 3 out of 5 guardians can transfer ownership if the current owner loses access.

✅ Allowance Management – Owners can grant controlled spending rights to sub-owners.

✅ Rate Limiter – Prevents rapid consecutive withdrawals to reduce attack vectors.

✅ Transaction Logs – On-chain record of all outgoing transfers.

⚙️ Installation

Clone this repo:
```shell

git clone https://github.com/your-repo/smart-wallet.git

cd smart-wallet

```

Install dependencies (if using Hardhat):

```shell

npm install

```


Compile the contract:
```shell

npx hardhat compile

```

Deploy to a local or testnet environment:
```shell

npx hardhat run scripts/deploy.js --network sepolia

```


📦 Contract Functions



🔹 Owner Functions


deposits() → Deposit ETH into your wallet.

withdrawal(uint amount, address payable to) → Withdraw ETH (rate-limited, reentrancy-safe).

approval(address subOwner, uint amount) → Approve a sub-owner with a spending limit.

🔹 Sub-Owner Functions


subWithdraw(address owner, uint amount) → Sub-owner withdraws within approved limit.

🔹 Guardian Functions


proposeNewOwner(address newOwner) → Guardians vote for a new wallet owner (requires 3 approvals).

🔒 Security Features

Reentrancy Guard – Blocks malicious recursive withdrawals.

Guardian Consensus – Prevents single guardian takeover.

Cooldowns – Rate-limits withdrawals to protect against bots/flash exploits.

Zero Address Protection – Disallows transfers to 0x0.

📜 License

This project is licensed under the MIT License.


          ______________________
         /                      \
        /   SMART WALLET 🛡️      \
       |--------------------------|
       |   🔐 Secure Funds        |
       |   👥 5 Guardian Recovery |
       |   ⏳ Rate Limited        |
       |   🛑 Anti-Reentrancy     |
       |   💳 Allowances          |
       |__________________________|
             |              |
         ====|   ETH 💎     |====
             |______________|

     ⛓️  Built on Ethereum · Trustless · Transparent




