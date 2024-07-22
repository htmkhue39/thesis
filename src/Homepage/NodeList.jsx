import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './NodeList.css';
import './Explore.css';
import '../components/Button.css';
import { useAccount } from '../AccountContext';
import { getNodes, checkNodeConnection, searchNodes } from '../../mockApi';

const NodeList = () => {
  const { selectedAccount } = useAccount();
  const [nodes, setNodes] = useState([]);
  const [nodeConnections, setNodeConnections] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchNodes();
  }, []);

  useEffect(() => {
    if (selectedAccount) {
      checkConnections();
    }
  }, [selectedAccount, nodes]);

  const fetchNodes = async () => {
    try {
      const nodesData = await getNodes();
      setNodes(nodesData);
    } catch (error) {
      console.error('Error fetching nodes:', error);
    }
  };

  const searchNodesByQuery = async (query) => {
    try {
      const nodesData = await searchNodes(query);
      setNodes(nodesData);
    } catch (error) {
      console.error('Error searching nodes:', error);
    }
  };

  const checkConnections = async () => {
    const connections = {};
    const promises = nodes.map(async (node) => {
      try {
        const isConnected = await checkNodeConnection(selectedAccount.address, node.address);
        connections[node.address] = isConnected;
      } catch (error) {
        console.error('Error checking node connection:', error);
      }
    });

    await Promise.all(promises);
    setNodeConnections(connections);
  };

  const handleNodeClick = (nodeAddress) => {
    navigate(`/nodes/${nodeAddress}`);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    searchNodesByQuery(query);
  };

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
                onChange={handleSearchChange}
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
                  {nodes.map((node, index) => (
                    <tr key={node.id} onClick={() => handleNodeClick(node.address)} className='node-row'>
                      <td>{index + 1}</td>
                      <td>{node.address}</td>
                      <td className={`connection-status ${nodeConnections[node.address] ? 'connected' : 'disconnected'}`}>
                        {nodeConnections[node.address] ? 'Yes' : 'No'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NodeList;
