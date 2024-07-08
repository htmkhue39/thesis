import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './Explore.css'
import './Pool.css'
import '../components/Button.css'

import { useAccount } from '../AccountContext';

const Pool = () => {
    const { selectedAccount } = useAccount();
    const [liquidityPositions, setLiquidityPositions] = useState([]);
    const [showDetails, setShowDetails] = useState(null);
    const navigate = useNavigate();
  
    useEffect(() => {
      if (selectedAccount && selectedAccount.connectedNodeAddress) {
          const connectedNode = selectedAccount.node.find(node => node.address === selectedAccount.connectedNodeAddress);
          if (connectedNode) {
              setLiquidityPositions(connectedNode.liquidityPositions);
          }
      }
  }, [selectedAccount]);

    const handleToggleDetails = (poolId) => {
      setShowDetails(showDetails === poolId ? null : poolId);
    };
  
    const handleAddLiquidity = () => {
      navigate(`/pool/liquidity`);
    };

  return (
    <div className='app-content-wrapper'>
      <div className='app-content'>
        <div className='homepage'>
            <div className="main-content">
                <div className='pool-header-wrapper'>
                    <div className='pool-header'>
                        <h2 className='position-title'>Position</h2>

                        <div className='pool-buttons'>
                            <button className='create-pool btn-primary' onClick={handleAddLiquidity}>Create Pool</button>
                            <button className='create-pool btn-primary' onClick={handleAddLiquidity}>Add Liquidity</button>
                        </div>
                    </div>
                </div>
                <div className='liquidity-container'>
                    <div className='liquidity-box'>
                        {liquidityPositions.length > 0 ? (
                            liquidityPositions.map((position, index) => (
                              <div key={index} className='pool-card'>
                                <div className='pool-card-header'>
                                  <span className='pool-card-span'>{position.tokenA}/{position.tokenB}</span>
                                  <button 
                                    onClick={() => handleToggleDetails(position.poolId)} 
                                    className='manage-button'
                                  >
                                    Manage
                                    {showDetails === position.poolId ? '▲' : '▼'}
                                  </button>
                                </div>  
                                {showDetails === position.poolId && (
                                <div className="pool-card-body">
                                  <div className="pool-card-row">
                                    <p className='pool-card-p'>Your total pool tokens: </p>
                                    <div className='pool-card-row-detail'>
                                      <p>{position.totalPoolTokens}</p>
                                    </div>
                                  </div>
                                  <div className="pool-card-row">
                                    <p className='pool-card-p'>Pooled {position.tokenA}:</p>
                                    <div className='pool-card-row-detail'>
                                      <p>{position.amountA}</p>
                                    </div>
                                  </div>
                                  <div className="pool-card-row">
                                    <p className='pool-card-p'>Pooled {position.tokenB}:</p>
                                    <div className='pool-card-row-detail'>
                                      <p>{position.amountB}</p>
                                    </div>
                                  </div>
                                  <div className="pool-card-row">
                                    <p className='pool-card-p'>Your pool share:</p>
                                    <div className='pool-card-row-detail'>
                                      <p>{position.poolShare}</p>
                                    </div>
                                  </div>
                                  <div className="pool-card-actions">
                                    <button className="pool-button">Add</button>
                                    <button className="pool-button">Remove</button>
                                  </div>
                                </div>
                              )}                              
                              </div>
                            ))
                        ) : (
                            <p>No liquidity positions found.</p>
                        )}
                    </div>
                </div>           
            </div>
        </div>
      </div>
    </div>
  );
}

export default Pool;
