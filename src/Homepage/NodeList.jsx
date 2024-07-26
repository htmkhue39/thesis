import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './NodeList.css';
import './Explore.css';
import '../components/Button.css';
import { searchNodes } from '../../mockApi';
import { listNodes } from '../api/nodes';

const NodeList = () => {
  const [nodes, setNodes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchNodes();
  }, []);

  const fetchNodes = async () => {
    try {
      const nodesData = await listNodes();
      console.log("List nodes: ", nodesData)
      // setNodes(nodesData);
      setNodes(nodesData.nodeList)
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
                      <td className={`connection-status ${node.connected ? 'connected' : 'disconnected'}`}>
                        {node.connected ? 'Yes' : 'No'}
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
