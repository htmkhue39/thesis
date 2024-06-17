import React, { useState } from 'react';
import './Homepage.css';
import swapIcon from '../assets/swap-icon.svg';
import dropIcon from '../assets/dropdown-icon.svg';
import sendIcon from '../assets/send-icon.svg';
import copyIcon from '../assets/copy-icon.svg';

const accounts = [
  { name: 'Account 1', address: '0x76721d7dE385beF55F8447C0afC704f7057e9aBE' },
  { name: 'Account 2', address: '0x12345d7dE385beF55F8447C0afC704f7057e1234' }
];

function Homepage() {
  const [selectedAccount, setSelectedAccount] = useState(accounts[0]);
  const [showAccountSelector, setShowAccountSelector] = useState(false);

  const copyAddress = () => {
    navigator.clipboard.writeText(selectedAccount.address);
    alert('Address copied to clipboard');
  };

  const handleAccountChange = (event) => {
    const accountName = event.target.value;
    const account = accounts.find((acc) => acc.name === accountName);
    setSelectedAccount(account);
    setShowAccountSelector(false);
  };

  const truncateAddress = (address) => `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;

  return (
    <div className="homepage">
      <header className="header">
        <div className="account-info">
          <div className="account-details" onClick={() => setShowAccountSelector(true)}>
            <div className="account-text">
              <span className="account-name">{selectedAccount.name}</span>
              <img src={dropIcon} className="dropdown-icon" alt="Dropdown" />
            </div>
          </div>
          <div className="account-address-wrapper">
            <span className="account-address">{truncateAddress(selectedAccount.address)}</span>
            <button onClick={copyAddress} className="copy-button">
              <img src={copyIcon} className="copy-icon" alt="Copy" />
            </button>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="balance-section">
          <h1>0 ETH</h1>
          <div className="actions">
            <div className="button-wrapper">
              <button className="round-button">
                <img src={sendIcon} className="button-icon" alt="Send" />
              </button>
              <span className="button-label">Send</span>
            </div>
            <div className="button-wrapper">
              <button className="round-button">
                <img src={swapIcon} className="button-icon" alt="Swap" />
              </button>
              <span className="button-label">Swap</span>
            </div>
          </div>
        </div>

        <div className="tabs">
          <button className="tab active">Activity</button>
        </div>

        <div className="activity-section">
          <div className="transactions">
            <p>You have no transactions</p>
          </div>
        </div>
      </main>

      {showAccountSelector && (
        <>
          <div className="overlay" onClick={() => setShowAccountSelector(false)}></div>
          <div className="account-selector-modal">
            <div className="account-selector-header">
              <span>Select an account</span>
              <button onClick={() => setShowAccountSelector(false)} className="close-button">X</button>
            </div>
            <ul className="account-list">
              {accounts.map((account, index) => (
                <li
                  key={index}
                  onClick={() => handleAccountChange({ target: { value: account.name } })}
                  className="account-item"
                >
                  <span className="account-name">{account.name}</span>
                  <span className="account-address">{truncateAddress(account.address)}</span>
                  <span className="account-balance">0 ETH</span>
                </li>
              ))}
            </ul>
            <button className="add-account-button">+ Add account or hardware wallet</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Homepage;
