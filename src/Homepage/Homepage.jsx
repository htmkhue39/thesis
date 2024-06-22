import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Homepage.css';
import swapIcon from '../assets/swap-icon.svg';
import sendIcon from '../assets/send-icon.svg';
import AccountHeader from './AccountHeader';
import Header from '../components/Header';

const accounts = [
  { name: 'Account 1', address: '0x76721d7dE385beF55F8447C0afC704f7057e9aBE' },
  { name: 'Account 2', address: '0x12345d7dE385beF55F8447C0afC704f7057e1234' }
];

function Homepage() {
  const [selectedAccount, setSelectedAccount] = useState(accounts[0]);
  const [showAccountSelector, setShowAccountSelector] = useState(false);
  const [selectedTab, setSelectedTab] = useState('Activity');
  const [transactions, setTransactions] = useState([]);
  const [tokens, setTokens] = useState([]);
  const navigate = useNavigate();
  const [dropdownValue, setDropdownValue] = useState('');

  useEffect(() => {
    fetchTransactions();
    fetchTokens();
  }, [selectedAccount]);

  const handleDropdownChange = (e) => {
    setDropdownValue(e.target.value);
    setSelectedTab('Tab3'); // Automatically switch to Tab 3 when dropdown is used
  };

  const fetchTransactions = async () => {
    try {
      const response = await fetch(`http://localhost:3001/transactions?address=${selectedAccount.address}`);
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const fetchTokens = async () => {
    try {
      const response = await fetch(`http://localhost:3001/tokens`);
      const data = await response.json();
      setTokens(data);
    } catch (error) {
      console.error('Error fetching tokens:', error);
    }
  };

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
    <div className='app-content-wrapper'>
      <div className='app-content'>
        <Header/>
        <AccountHeader
          selectedAccount={selectedAccount}
          setShowAccountSelector={setShowAccountSelector}
          truncateAddress={truncateAddress}
          copyAddress={copyAddress}
        />
        <div className='homepage'>
          <main className="main-content">
            <div className="balance-section">
              <h1>0 ETH</h1>
              <div className="actions">
                <div className="button-wrapper">
                  <button className="round-button" onClick={() => navigate('/homepage-swap')}>
                    <img src={swapIcon} className="button-icon" alt="Swap" />
                  </button>
                  <span className="button-label">Swap</span>
                </div>
              </div>
            </div>

            <div className="tabs">
              <button className={`tab ${selectedTab === 'Transactions' ? 'active' : ''}`} onClick={() => setSelectedTab('Transactions')}>Transactions</button>
              <button className={`tab ${selectedTab === 'Tokens' ? 'active' : ''}`} onClick={() => setSelectedTab('Tokens')}>Tokens</button>
              <select onChange={handleDropdownChange} value={dropdownValue} className={`tab ${selectedTab === 'Nodes' ? 'active' : ''}`}>
                <option value="">Connected</option>
                <option value="Option1">0x76721d7dE385beF55F8447C0afC704f7057e9aBE</option>
                <option value="Option2">Option 2</option>
                <option value="Option3">Option 3</option>
              </select>
            </div>

            {selectedTab === 'Transactions' ? (
              <div className="activity-section">
                <table className="table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Type</th>
                      <th>Amount</th>
                      <th>Address</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.length > 0 ? (
                      transactions.map((tx, index) => (
                        <tr key={tx.id}>
                          <td>{index + 1}</td>
                          <td>{tx.type}</td>
                          <td>{tx.amount}</td>
                          <td>{tx.address}</td>
                          <td>{tx.date}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5">You have no transactions</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="tokens-section">
                <table className="table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>1h</th>
                      <th>24h</th>
                      <th>7d</th>
                      <th>Volume (24h)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tokens.length > 0 ? (
                      tokens.map((token, index) => (
                        <tr key={token.id}>
                          <td>{index + 1}</td>
                          <td>
                            <div className="token-info">
                              <img src={token.logo} alt={`${token.name} logo`} className="token-logo" />
                              <div>
                                <div>{token.name}</div>
                                <div className="token-symbol">{token.symbol}</div>
                              </div>
                            </div>
                          </td>
                          <td>{token.price}</td>
                          <td className={parseFloat(token.change1h) > 0 ? 'green' : 'red'}>{token.change1h}%</td>
                          <td className={parseFloat(token.change24h) > 0 ? 'green' : 'red'}>{token.change24h}%</td>
                          <td className={parseFloat(token.change7d) > 0 ? 'green' : 'red'}>{token.change7d}%</td>
                          <td>{token.volume24h}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7">You have no tokens</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
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
      </div>
    </div>
  );
}

export default Homepage;
