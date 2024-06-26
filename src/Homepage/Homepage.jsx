import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Homepage.css';
import swapIcon from '../assets/swap-icon.svg';
import connectIcon from '../assets/connect-icon.svg'
import AccountHeader from './AccountHeader';
import Header from '../components/Header';
import { useAccount } from '../AccountContext';

const Homepage = () => {
  const { selectedAccount, accounts, handleAccountChange, truncateAddress, copyAddress, connectNode } = useAccount();
  const [showAccountSelector, setShowAccountSelector] = useState(false);
  const [selectedTab, setSelectedTab] = useState('Exchanges');
  const [transactions, setTransactions] = useState([]);
  const [tokens, setTokens] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [connectedNodeAddress, setConnectedNodeAddress] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedAccount) {
      fetchTransactions();
      checkConnectionStatus();
    }
  }, [selectedAccount]);

  const fetchTransactions = async () => {
    try {
      const response = await fetch('http://localhost:3001/transactions');
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const fetchTokens = async (nodeAddress) => {
    try {
      const response = await fetch(`http://localhost:3001/nodes?address=${nodeAddress}`);
      if (!response.ok) {
        throw new Error(`Error fetching tokens for node ${nodeAddress}`);
      }
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0 && Array.isArray(data[0].tokens)) {
        setTokens(data[0].tokens);
      } else {
        setTokens([]);
      }
    } catch (error) {
      console.error('Error fetching tokens:', error.message);
    }
  };

  const checkConnectionStatus = () => {
    if (selectedAccount.connectedNodeAddress) 
    {
      setConnectedNodeAddress(selectedAccount.connectedNodeAddress);
      fetchTokens(selectedAccount.connectedNodeAddress);
      setIsConnected(true);
    } 
    else if (selectedAccount.node && selectedAccount.node.length > 0) 
    {
      const firstNodeAddress = selectedAccount.node[0].address;
      setConnectedNodeAddress(firstNodeAddress);
      fetchTokens(firstNodeAddress);
    } 
    else 
    {
      setConnectedNodeAddress('');
      setTokens([]);
      setIsConnected(false);
    }
  };

  if (!selectedAccount) {
    return <div>Loading...</div>;
  }

  return (
    <div className='app-content-wrapper'>
      <div className='app-content'>
        <Header />
        {selectedAccount && (
          <AccountHeader 
            setShowAccountSelector={setShowAccountSelector} 
          />
        )}

        <div className='homepage'>
          <div className="main-content">
            <div className="balance-section">
              <h1>0 ETH</h1>
              <div className="actions">
                <div className="button-wrapper">
                  <button 
                    className="round-button" 
                    onClick={() => navigate('/homepage/nodes')}
                  >
                    <img src={connectIcon} className="button-icon" alt="Node" />
                  </button>
                  <span className="button-label">Node</span>
                </div>
                
                <div className="button-wrapper">
                  <div className="tooltip">
                    <button 
                      className="round-button" 
                      onClick={() => navigate('/homepage/swap')}
                      disabled={!isConnected} // Disable button if not connected
                    >
                      <img src={swapIcon} className="button-icon" alt="Swap" />
                    </button>
                    {!isConnected && <span className="tooltiptext">Please connect to a node</span>}
                  </div>
                  <span className="button-label">Swap</span>
                </div>
              </div>
            </div>

            <div className="tabs">
              <button className={`tab ${selectedTab === 'Exchanges' ? 'active' : ''}`} onClick={() => setSelectedTab('Exchanges')}>Exchanges</button>
              <button className={`tab ${selectedTab === 'Transactions' ? 'active' : ''}`} onClick={() => setSelectedTab('Transactions')}>Transactions</button>
            </div>

            {selectedTab === 'Exchanges' ? (
              <div className="activity-section">
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
            ) : (
              <div className="activity-section">
                <table className="table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>From Token</th>
                      <th>To Token</th>
                      <th>From Amount</th>
                      <th>To Amount</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.length > 0 ? (
                      transactions.map((tx, index) => (
                        <tr key={tx.id}>
                          <td>{index + 1}</td>
                          <td>{tx.fromToken}</td>
                          <td>{tx.toToken}</td>
                          <td>{tx.fromAmount}</td>
                          <td>{tx.toAmount}</td>
                          <td>{new Date(tx.date).toLocaleString()}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6">You have no transactions</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>

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
                      onClick={() => handleAccountChange(account.name)}
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
