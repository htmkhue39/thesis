import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Explore.css';
import { useAccount } from '../AccountContext';

const Explore = () => {
  const { selectedAccount } = useAccount();
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
    if (!selectedAccount) return;
    try {
      const accountTransactions = selectedAccount.transactions.filter(
        tx => tx.nodeAddress === selectedAccount.connectedNodeAddress
      );
      setTransactions(accountTransactions);
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
        <div className='homepage'>
          <div className="main-content">
            <div className="balance-section">
              <h1>0 ETH</h1>
            </div>

            <div className="tabs">
              <button className={`tab ${selectedTab === 'Exchanges' ? 'active' : ''}`} onClick={() => setSelectedTab('Exchanges')}>Tokens</button>
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
        </div>
      </div>
    </div>
  );
}

export default Explore;
