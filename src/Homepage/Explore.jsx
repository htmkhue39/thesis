import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccount } from '../AccountContext';
import { getTransactions, getTokens, getPools, getBalances } from '../../mockApi';

import './Explore.css';
import CombinedTokenLogo from '../components/CombinedTokenLogo';

const Explore = () => {
  const { selectedAccount } = useAccount();
  const [selectedTab, setSelectedTab] = useState('Tokens');
  const [transactions, setTransactions] = useState([]);
  const [tokens, setTokens] = useState([]);
  const [pools, setPools] = useState([]);
  const [balances, setBalances] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedAccount && selectedAccount.connectedNodeAddress) {
      fetchAllData(selectedAccount.connectedNodeAddress);
    }
  }, [selectedAccount]);

  const fetchAllData = async (nodeAddress) => {
    await Promise.all([fetchTransactions(), fetchTokens(nodeAddress), fetchPools(nodeAddress), fetchBalances(nodeAddress)]);
  };

  const fetchTransactions = async () => {
    if (!selectedAccount) return;
    try {
      const transactions = await getTransactions(selectedAccount.address, selectedAccount.connectedNodeAddress);
      setTransactions(transactions);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const fetchTokens = async (nodeAddress) => {
    try {
      const tokens = await getTokens(nodeAddress);
      setTokens(tokens);
    } catch (error) {
      console.error('Error fetching tokens:', error);
    }
  };

  const fetchPools = async (nodeAddress) => {
    try {
      const pools = await getPools(nodeAddress);
      const tokens = await getTokens(nodeAddress); // Fetch tokens to get logos
  
      const poolData = pools.map(pool => {
        const tokenALogo = tokens.find(token => token.symbol === pool.tokenA)?.logo || '';
        const tokenBLogo = tokens.find(token => token.symbol === pool.tokenB)?.logo || '';
  
        return {
          ...pool,
          logo1: tokenALogo,
          logo2: tokenBLogo,
        };
      });
  
      setPools(poolData);
    } catch (error) {
      console.error('Error fetching pools:', error);
    }
  };

  const fetchBalances = async (nodeAddress) => {
    try {
      const balances = await getBalances(selectedAccount.address, nodeAddress);
      setBalances(balances);
    } catch (error) {
      console.error('Error fetching balances:', error);
    }
  };

  if (!selectedAccount) {
    return <div>Loading...</div>;
  }

  if (!selectedAccount.connectedNodeAddress) {
    return (
      <div className='app-content-wrapper'>
        <div className='app-content'>
          <div className='homepage'>
            <div className="main-content">
              <div className="overlay">
                <button className="btn-primary connect-button" onClick={() => navigate('/nodes')}>+ Connect to Node</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
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
                    {Object.keys(balances).length > 0 ? (
                      Object.entries(balances).map(([token, amount], index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{token}</td>
                          <td>{amount}</td>
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
