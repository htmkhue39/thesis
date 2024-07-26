import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import './Explore.css';
import './NodeItem.css';
import '../components/Button.css';
import backIcon from '../assets/back-icon.svg';

import { useAccount } from '../AccountContext';
import { getNode } from '../api/nodes';
import { getCoinLogo } from '../helpers/GetCoinLogo';

const NodeItem = () => {
  const { connectNode } = useAccount();
  const { nodeAddress } = useParams();
  const [node, setNode] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNodeData();
  }, [nodeAddress]);

  const fetchNodeData = async () => {
    try {
      const nodeData = await getNode(nodeAddress);
      setNode(nodeData);
    } catch (error) {
      console.error('Error fetching node data:', error);
    }
  };

  const handleBack = () => {
    navigate('/nodes');
  };

  const handleConnect = async () => {
    try {
      await connectNode(nodeAddress);
      navigate('/swap');
    } catch (error) {
      console.error('Error connecting to node:', error);
    }
  };

  if (!node) {
    return <div>Loading...</div>;
  }

  return (
    <div className='app-content-wrapper'>
      <div className='app-content'>
        <div className='homepage'>
          <div className="main-content">
            <div className='node-item-header'>
              <div className='item-back-icon'>
                <img src={backIcon} className='item-back-icon-detail' onClick={handleBack} />
              </div>
              <h2 className='node-item-title'>Node detail</h2>
              <button className='btn-connect' onClick={handleConnect}>+ Connect</button>
            </div>
            <table className="activity-section table">
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
                {node.tokens.map((token, index) => (
                  <tr key={token.id}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="token-info">
                        <img src={getCoinLogo(token.symbol)} alt={`${token.name} logo`} className="token-logo" />
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
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NodeItem;
