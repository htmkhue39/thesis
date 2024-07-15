import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccount } from '../AccountContext';

import './Explore.css';
import CombinedTokenLogo from '../components/CombinedTokenLogo';

const Explore = () => {
  const { selectedAccount } = useAccount();
  const [selectedTab, setSelectedTab] = useState('Tokens');
  const [transactions, setTransactions] = useState([]);
  const [tokens, setTokens] = useState([]);
  const [pools, setPools] = useState([]);
  const [balances, setBalances] = useState([]);
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

  const fetchPools = async (nodeAddress) => {
    try {
      const response = await fetch(`http://localhost:3001/nodes?address=${nodeAddress}`);
      if (!response.ok) {
        throw new Error(`Error fetching pools for node ${nodeAddress}`);
      }
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0 && Array.isArray(data[0].liquidityPools)) {
        const node = data[0];
        const poolData = node.liquidityPools.map((pool) => {
          const tokenALogo = node.tokens.find(token => token.symbol === pool.tokenA)?.logo || '';
          const tokenBLogo = node.tokens.find(token => token.symbol === pool.tokenB)?.logo || '';
          return {
            id: pool.id,
            pool: `${pool.tokenA}/${pool.tokenB}`,
            transactions: pool.transactions,
            tvl: pool.tvl,
            dayVolume: pool.dayVolume,
            weekVolume: pool.weekVolume,
            apr: pool.apr,
            logo1: tokenALogo,
            logo2: tokenBLogo,
          };
        });
        setPools(poolData);
      } else {
        setPools([]);
      }
    } catch (error) {
      console.error('Error fetching pools:', error.message);
    }
  };

  const fetchBalances = async (nodeAddress) => {
    try {
      const accountNode = selectedAccount.node.find(node => node.address === nodeAddress);
      if (accountNode && accountNode.balances) {
        setBalances(accountNode.balances);
      } else {
        setBalances([]);
      }
    } catch (error) {
      console.error('Error fetching balances:', error.message);
    }
  };

  const checkConnectionStatus = () => {
    if (selectedAccount.connectedNodeAddress) 
    {
      setConnectedNodeAddress(selectedAccount.connectedNodeAddress);
      fetchTokens(selectedAccount.connectedNodeAddress);
      fetchPools(selectedAccount.connectedNodeAddress);
      fetchBalances(selectedAccount.connectedNodeAddress);
      setIsConnected(true);
    } 
    else if (selectedAccount.node && selectedAccount.node.length > 0) 
    {
      const firstNodeAddress = selectedAccount.node[0].address;
      setConnectedNodeAddress(firstNodeAddress);
      fetchTokens(firstNodeAddress);
      fetchPools(firstNodeAddress);
      fetchBalances(firstNodeAddress);
    } 
    else 
    {
      setConnectedNodeAddress('');
      setTokens([]);
      setPools([]);
      setBalances([]);
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
            <div className="tabs">
              <button className={`tab ${selectedTab === 'Tokens' ? 'active' : ''}`} onClick={() => setSelectedTab('Tokens')}>Tokens</button>
              <button className={`tab ${selectedTab === 'Pools' ? 'active' : ''}`} onClick={() => setSelectedTab('Pools')}>Pools</button>
              <button className={`tab ${selectedTab === 'Transactions' ? 'active' : ''}`} onClick={() => setSelectedTab('Transactions')}>Transactions</button>
              <button className={`tab ${selectedTab === 'Balances' ? 'active' : ''}`} onClick={() => setSelectedTab('Balances')}>Balances</button>
            </div>

            {/* {!isConnected && (
              <div className="overlay">
                <button className="btn-primary connect-button" onClick={() => navigate('/nodes')}>+ Connect to Node</button>
              </div>
            )} */}

            {selectedTab === 'Tokens' && (
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
            )}
            
            {selectedTab === 'Pools' && (
              <div className="activity-section">
                <table className="table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Pool</th>
                      <th>Transactions</th>
                      <th>TVL</th>
                      <th>1 day volume</th>
                      <th>7 day volume</th>
                      <th>1 day APR</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pools.length > 0 ? (
                      pools.map((pool, index) => (
                        <tr key={pool.id}>
                          <td>{index + 1}</td>
                          <td>
                            <CombinedTokenLogo logo1={pool.logo1} logo2={pool.logo2} />
                            {pool.pool}
                          </td>
                          <td>{pool.transactions}</td>
                          <td>{pool.tvl}</td>
                          <td>{pool.dayVolume}</td>
                          <td>{pool.weekVolume}</td>
                          <td>{pool.apr}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7">You have no pools</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {selectedTab === 'Transactions' && (
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

            {selectedTab === 'Balances' && (
              <div className="activity-section">
                <table className="table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Token</th>
                      <th>Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {balances.length > 0 ? (
                      balances.map((balance, index) => (
                        <tr key={balance.id}>
                          <td>{index + 1}</td>
                          <td>{balance.token}</td>
                          <td>{balance.amount}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3">You have no balances</td>
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
