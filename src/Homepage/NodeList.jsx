import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './NodeList.css'
import './Explore.css'
import '../components/Button.css'

import { useAccount } from '../AccountContext';

const NodeList = () => {
  const { selectedAccount } = useAccount();
  const [nodes, setNodes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
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
    navigate(`/nodes/${nodeAddress}`);
  };

  const isNodeConnected = (nodeAddress) => {
    return selectedAccount.node.some(node => node.address === nodeAddress);
  };

  const filteredNodes = nodes.filter(node =>
    node.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='app-content-wrapper'>
      <div className='app-content'>
        <div className='homepage'>
            <div className="main-content">
              <div className='balance-section'>
                <h2>Node list</h2>
              </div>
              <div className='search-bar'>
                <input
                  type="text"
                  placeholder="Search for nodes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='search-input'
                />
              </div>
              <div className='activity-section'>
                <table className='table'>
                      <thead>
                      <tr>
                          <th>#</th>
                          <th>Address</th>
                          <th>Connection</th>
                      </tr>
                      </thead>
                      <tbody>
                      {filteredNodes.length > 0 ? (
                        filteredNodes.map((node, index) => (
                          <tr key={node.id} onClick={() => handleNodeClick(node.address)} className='node-row'>
                            <td>{index + 1}</td>
                            <td>{node.address}</td>
                            <td className={`connection-status ${isNodeConnected(node.address) ? 'connected' : 'disconnected'}`}>
                              {isNodeConnected(node.address) ? 'Yes' : 'No'}
                            </td>
                          </tr>
                        ))
                      ) : (
                        nodes.map((node, index) => (
                          <tr key={node.id} onClick={() => handleNodeClick(node.address)} className='node-row'>
                            <td>{index + 1}</td>
                            <td>{node.address}</td>
                            <td className={`connection-status ${isNodeConnected(node.address) ? 'connected' : 'disconnected'}`}>
                              {isNodeConnected(node.address) ? 'Yes' : 'No'}
                            </td>
                          </tr>
                        ))
                      )}
                      </tbody>
                  </table>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default NodeList;
