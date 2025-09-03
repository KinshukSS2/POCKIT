"use client";

import { useEffect, useState } from "react";
import { ethers } from "ethers";
import "./MainDashboard.css"; // adjust path if needed
import wallet from "../wallet.json";
import TrueFocus from "./TrueFocus";
import TiltedCard from './TiltedCard';
import { Link } from 'react-router-dom';

const CONTRACT_ADDRESS = "0xEAB810881028269Ff9FEA83A92193d2191E1C43C";

export default function MainDashboard() {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [proposedOwner, setProposedOwner] = useState("");
  const [guardians, setGuardians] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [subWithdrawAmount, setSubWithdrawAmount] = useState("");
  const [subWithdrawOwner, setSubWithdrawOwner] = useState("");
  const [totalBalance, setTotalBalance] = useState("0");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const accounts = await provider.send("eth_requestAccounts", []);
        setAccount(accounts[0]);

        const walletContract = new ethers.Contract(CONTRACT_ADDRESS, wallet.abi, signer);
        setContract(walletContract);

        const guardianList = [];
        for (let i = 0; i < 5; i++) {
          try {
            const g = await walletContract.guardianList(i);
            guardianList.push(g);
          } catch {
            break;
          }
        }
        setGuardians(guardianList);

        try {
          const proposed = await walletContract.proposedOwner();
          setProposedOwner(proposed);
        } catch (err) {
          console.error("Error fetching proposed owner:", err);
        }

        try {
          const length = await walletContract.txnlength();
          const txns = [];
          for (let i = 0; i < length; i++) {
            const txn = await walletContract.txnlist(i);
            txns.push(txn);
          }
          setTransactions(txns);
        } catch (err) {
          console.error("Error fetching transactions:", err);
        }

        try {
          const balance = await walletContract.tbalance();
          setTotalBalance(ethers.utils.formatEther(balance));
        } catch (err) {
          console.error("Error fetching balance:", err);
        }
      } else {
        alert("Please install MetaMask to use this application.");
      }
    };
    load();
  }, []);

  const handleDeposit = async () => {
    if (contract && depositAmount) {
      setIsLoading(true);
      try {
        const tx = await contract.deposits({
          value: ethers.utils.parseEther(depositAmount),
        });
        await tx.wait();
        alert("Deposit successful!");
        setDepositAmount("");
      } catch {
        alert("Deposit failed.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleWithdraw = async () => {
    if (contract && withdrawAmount && toAddress) {
      setIsLoading(true);
      try {
        const tx = await contract.withdrawal(
          ethers.utils.parseEther(withdrawAmount),
          toAddress
        );
        await tx.wait();
        alert("Withdrawal successful!");
        setWithdrawAmount("");
        setToAddress("");
      } catch {
        alert("Withdrawal failed.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const proposeNewOwner = async (newOwner) => {
    try {
      const tx = await contract.proposeNewOwner(newOwner);
      await tx.wait();
      alert("New owner proposed.");
    } catch {
      alert("Proposal failed.");
    }
  };

  const approveSubOwner = async () => {
    try {
      const tx = await contract.approval(subWithdrawOwner, ethers.utils.parseEther(subWithdrawAmount));
      await tx.wait();
      alert("Approval sent.");
    } catch {
      alert("Approval failed.");
    }
  };

  const subWithdraw = async () => {
    try {
      const tx = await contract.subWithdraw(subWithdrawOwner, ethers.utils.parseEther(subWithdrawAmount));
      await tx.wait();
      alert("Sub-owner withdrew funds.");
    } catch {
      alert("Sub-owner withdrawal failed.");
    }
  };

  return (
    <div className="app-container">
      <div className="main-content">
        <header className="header">
          <h1 className="main-title">
            <span className="wallet-icon naming">🧾 Pickit<TrueFocus /></span><br />
          </h1>
          <br />
          <div className="subtitle">Secure • Decentralized • Elegant</div>
          <div className="connection-status">
            <div className="status-dot connected"></div>
            {account ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}` : "Not Connected"}
          </div>
        </header>

        <div className="cards-container">
          {/* Deposit Card */}
          <div className="card deposit-card">
            <h3 className="card-title">💰 Deposit ETH</h3>
            <div className="inputeth">
              <div className="inpt">
                <input
                  className="premium-input"
                  placeholder="Amount in ETH"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                />
              </div>
              <button className="premium-button" id="buttondeposit" onClick={handleDeposit} disabled={isLoading}>
                {isLoading ? "Processing..." : "Deposit"}
              </button>
            </div>
          </div>

          {/* Withdraw Card */}
          <div className="card withdraw-card">
            <h3 className="card-title">📤 Withdraw ETH</h3>
            <div className="inputwithdraws">
              <input
                className="premium-input"
                placeholder="To address"
                value={toAddress}
                onChange={(e) => setToAddress(e.target.value)}
              />
            </div>
            <div className="inputwithdraws2">
              <input
                className="premium-input"
                placeholder="Amount in ETH"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
              />
            </div>
            <div className="buttonwithdraw">
              <button className="premium-button" onClick={handleWithdraw} disabled={isLoading}>
                {isLoading ? "Processing..." : "Withdraw"}
              </button>
            </div>
          </div>

          {/* Guardian List */}
          <div className="card guardian-card">
            <h3 className="card-title">👨‍👩‍👧 Guardians</h3>
            <ul>
              {guardians.map((g, i) => (
                <li key={i}>{g}</li>
              ))}
            </ul>
          </div>

          {/* Propose New Owner */}
          <div className="card propose-owner-card">
            <div className="newowner">
              <h3 className="card-title">🔁 Propose New Owner</h3>
            </div>
            <div className="proposenewowner">
              <input
                className="premium-input"
                placeholder="New owner address"
                onBlur={(e) => proposeNewOwner(e.target.value)}
              />
            </div>
            <div className="proposedowner">
              <p>Current Proposed Owner: {proposedOwner}</p>
            </div>
          </div>

          {/* Sub-owner Actions */}
          <div className="card subowner-card">
            <h3 className="card-title">🛡️ Sub-owner Actions</h3>
            <div className="inputsubowner">
              <input
                id="subwithdrawaddress"
                className="premium-input"
                placeholder="Sub-owner address"
                value={subWithdrawOwner}
                onChange={(e) => setSubWithdrawOwner(e.target.value)}
              />
              <input
                id="subwithdrawinput"
                className="premium-input"
                placeholder="Amount (ETH)"
                value={subWithdrawAmount}
                onChange={(e) => setSubWithdrawAmount(e.target.value)}
              />
            </div>
            <div className="button-group">
              <button className="premium-button" onClick={approveSubOwner}>Approve</button>
              <button className="premium-button" onClick={subWithdraw}>Withdraw</button>
            </div>
          </div>

          {/* Wallet Balance */}
          <div className="card balance-card">
            <h3 className="card-title">💼 Wallet Balance</h3>
            <p className="totalbalance">{totalBalance} ETH</p>
          </div>

          {/* Transaction History */}
          <div className="card txns-card">
            <h3 className="card-title">📜 Transaction History</h3>
            <ul>
              {transactions.map((txn, i) => (
                <li key={i}>To: {txn.to}, Amount: {ethers.utils.formatEther(txn.amount)} ETH</li>
              ))}
            </ul>
          </div>
        </div>

       
      </div>

      
    </div>
  );
}
