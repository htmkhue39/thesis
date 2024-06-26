import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../components/Header';
import AccountHeader from './AccountHeader';

import './NodeList.css'
import './Homepage.css'
import '../components/Button.css'
import backIcon from '../assets/back-icon.svg';

import { useAccount } from '../AccountContext';

const NodeList = () => {
  const { selectedAccount } = useAccount();
  const [nodes, setNodes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNodes();
  }, []);

  const fetchNodes = async () => {
    try {
      const response = await fetch('http://localhost:3001/nodes');
      const data = await response.json();
      setNodes(data);
    } catch (error) {
      console.error('Error fetching nodes:', error);
    }
  };

  const handleNodeClick = (nodeAddress) => {
    navigate(`/homepage/nodes/${nodeAddress}`);
  };

  const handleBack = () => {
    navigate('/homepage');
  };

  const isNodeConnected = (nodeAddress) => {
    return selectedAccount.node.some(node => node.address === nodeAddress);
  };

  return (
    <div className='app-content-wrapper'>
      <div className='app-content'>
        <Header />
        {selectedAccount && (
            <AccountHeader
                selectedAccount={selectedAccount}
            />
        )}
        <div className='homepage'>
            <div className="main-content">
              <div className='node-list-header'>
                <div className='back-icon'>
                  <img src={backIcon} className='back-icon-detail' onClick={handleBack}/>
                </div>
                <h2 className='node-list-title'>Node list</h2>
              </div>
                <table className='activity-section table'>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Address</th>
                        <th>Connection</th>
                    </tr>
                    </thead>
                    <tbody>
                    {nodes.map((node, index) => (
                        <tr key={node.id} onClick={() => handleNodeClick(node.address)} className='node-row'>
                        <td>{index + 1}</td>
                        <td>{node.address}</td>
                        <td className={`connection-status ${isNodeConnected(node.address) ? 'connected' : 'disconnected'}`}>
                          {isNodeConnected(node.address) ? 'Yes' : 'No'}
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    </div>
  );
}

export default NodeList;
