import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccount } from '../AccountContext';

import '../components/Button.css';
import './AddLiquidity.css';
import './Explore.css';
import './SwapCoin.css'

import dropIcon from '../assets/dropdown-icon.svg';
import searchIcon from '../assets/search-icon.svg';
import backIcon from '../assets/back-icon.svg';

function AddLiquidity() {
    const { selectedAccount, handleAccountChange } = useAccount();
    const navigate = useNavigate();
    const [tokens, setTokens] = useState([]);
    const [nodes, setNodes] = useState([]);
    const [balances, setBalances] = useState({});
    const [fromToken, setFromToken] = useState({ symbol: 'ETH', logo: '/coin/ethereum.png?url' });
    const [toToken, setToToken] = useState(null);
    const [fromAmount, setFromAmount] = useState(0);
    const [toAmount, setToAmount] = useState(0);
    const [showFromTokenDropdown, setShowFromTokenDropdown] = useState(false);
    const [showToTokenDropdown, setShowToTokenDropdown] = useState(false);
    const [isAmountExceedBalance, setIsAmountExceedBalance] = useState(false);
    const [showFeeOptions, setShowFeeOptions] = useState(false);
    const [selectedFee, setSelectedFee] = useState("0.30%");
    const [poolExists, setPoolExists] = useState(false);

    useEffect(() => {
        fetchTokens();
        fetchNodes();
    }, []);

    useEffect(() => {
        if (selectedAccount && selectedAccount.connectedNodeAddress) {
            const connectedNode = selectedAccount.node.find(node => node.address === selectedAccount.connectedNodeAddress);
            if (connectedNode) {
                const accountBalances = {};
                connectedNode.balances.forEach(balance => {
                    accountBalances[balance.token] = balance.amount;
                });
                setBalances(accountBalances);
            }
        }
    }, [selectedAccount]);

    useEffect(() => {
        if (selectedAccount && selectedAccount.connectedNodeAddress) {
            checkPoolExists();
        } else {
            setPoolExists(false);
        }
    }, [selectedAccount, fromToken, toToken]);

    const fetchTokens = async () => {
        try {
            const response = await fetch('http://localhost:3001/tokens');
            const data = await response.json();
            setTokens(data);
        } catch (error) {
            console.error('Error fetching tokens:', error);
        }
    };

    const fetchNodes = async () => {
        try {
            const response = await fetch('http://localhost:3001/nodes');
            const data = await response.json();
            setNodes(data);
        } catch (error) {
            console.error('Error fetching tokens:', error);
        }
    };

    const checkPoolExists = () => {
        const connectedNode = nodes.find(node => node.address === selectedAccount.connectedNodeAddress);
        if (connectedNode) {
            const pool = connectedNode.liquidityPools.find(
                pool =>
                    (pool.tokenA === fromToken.symbol && pool.tokenB === toToken.symbol) ||
                    (pool.tokenA === toToken.symbol && pool.tokenB === fromToken.symbol)
            );
            setPoolExists(!!pool);
        }
    };

    const getAddLiquidityButtonState  = () => {
        if (!selectedAccount.connectedNodeAddress) {
            return { disabled: false, text: "+ Connect to Node" };
        }
        if (!fromToken || !toToken) {
            return { disabled: true, text: "Select Token" };
        }
        if (!fromAmount) {
            return { disabled: true, text: "Enter an Amount" };
        }
        if (isAmountExceedBalance) {
            return { disabled: true, text: "Insufficient Balance" };
        }
        return { disabled: false, text: "Add Liquidity" };
    };

    const addLiquidityButtonState = getAddLiquidityButtonState();

    const toggleFeeOptions = () => {
        setShowFeeOptions(!showFeeOptions);
    };

    const selectFeeOption = (fee) => {
        setSelectedFee(fee);
        setShowFeeOptions(false);
    };

    const handleTokenSelect = (token, setToken) => {
        setToken(token);
        setShowFromTokenDropdown(false);
        setShowToTokenDropdown(false);
    };

    const getBalance = (token) => {
        if (!token) return 0;
        return balances[token.symbol] || 0;
    };

    const handleFirstAmountChange = (e) => {
        const value = e.target.value;
        const amount = value === '' ? 0 : Number(value);
        setFromAmount(amount);
        setIsAmountExceedBalance(amount > getBalance(fromToken));
    };

    const handleSecondAmountChange = (e) => {
        const value = e.target.value;
        const amount = value === '' ? 0 : Number(value);
        setToAmount(amount);
        setIsAmountExceedBalance(amount > getBalance(toToken));
    };

    const handleAddLiquidity = async () => {
        if (!selectedAccount || !fromToken || !toToken || !fromAmount || !toAmount || !selectedFee) {
            return;
        }

        // Perform the add liquidity logic here, like updating balances, etc.
        // Assuming the add liquidity is successful, record the transaction.

        const newLiquidityPosition = {
            poolId: Date.now().toString(),
            tokenA: fromToken.symbol,
            tokenB: toToken.symbol,
            amountA: fromAmount,
            amountB: toAmount,
            liquidityToken: "UNI-V2",
            poolShare: "0.5%", // Example pool share
            totalPoolTokens: fromAmount + toAmount, // Example total pool tokens
            selectedFee: selectedFee
        };

        try {
            const response = await fetch(`http://localhost:3001/accounts/${selectedAccount.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...selectedAccount,
                    liquidityPositions: [...selectedAccount.liquidityPositions, newLiquidityPosition],
                }),
            });

            if (response.ok) {
                handleAccountChange(selectedAccount.name);
                navigate('/pool');
            } else {
                console.error('Failed to add liquidity');
            }
        } catch (error) {
            console.error('Error adding liquidity:', error);
        }
    };

    const handleConnectToNode = () => {
        navigate('/nodes');
    };

    const handleBack = () => {
        navigate('/pool');
    };
    
    return (
        <div className={`app-content-wrapper`}>
            <div className='app-content'>
                <div className='swap-coin-wrapper'>
                    <div className="liquidity-content">
                        <div className='liquidity-header'>
                            <div className='liquidity-back-icon'>
                                <img src={backIcon} className='liquidity-back-icon-detail' onClick={handleBack}/>
                            </div>
                            <h2 className='title liquidity-title'>Add Liquidity</h2>
                        </div>

                        <div className='prepare-liquidity-wrapper'>
                            <div className='prepare-swap'>
                                <div className='prepare-swap-from'>
                                    <div className='from-token'>
                                        <div className='token-dropdown' onClick={() => setShowFromTokenDropdown(true)}>
                                            <div className='token-list'>
                                                {fromToken && <img src={fromToken.logo} alt={fromToken.symbol} className='token-logo' />}
                                                <span className='swap-token-name'>{fromToken ? fromToken.symbol : 'Select token'}</span>
                                            </div>
                                            <img src={dropIcon} className="dropdown-search" alt="Dropdown" />
                                        </div>
                                        <div className='amount-wrapper'>
                                            <input 
                                                type='number' 
                                                value={fromAmount || 0} 
                                                onChange={handleFirstAmountChange} 
                                                className='amount-input' 
                                                disabled={!selectedAccount.connectedNodeAddress}
                                            />
                                        </div>
                                    </div>
                                    <div className='balance'>
                                        Balance: {getBalance(fromToken)}
                                    </div>
                  
                                </div>
                                <div className='prepare-swap-to'>
                                    <div className='to-token'>
                                        <div className='token-dropdown' onClick={() => setShowToTokenDropdown(true)}>
                                            <div className='token-list'>
                                                {toToken && <img src={toToken.logo} alt={toToken.symbol} className='token-logo' />}
                                                <span className='swap-token-name'>{toToken ? toToken.symbol : 'Select token'}</span>
                                            </div>
                                            <img src={dropIcon} className="dropdown-search" alt="Dropdown" />
                                        </div>
                                        <div className='amount-wrapper'>
                                            <input 
                                                type='number' 
                                                value={toAmount || 0} 
                                                onChange={handleSecondAmountChange} 
                                                className='amount-input'
                                                disabled={!selectedAccount.connectedNodeAddress}
                                            />
                                        </div>
                                    </div>
                                    <div className='balance'>
                                        Balance: {getBalance(toToken)}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {!poolExists && (toToken != null) && (
                            <div className='fee-dropdown'>
                                <div className='fee-dropdown-header' onClick={toggleFeeOptions}>
                                <span>{selectedFee}</span>
                                <img src={dropIcon} className='dropdown-icon' alt='Dropdown' />
                                </div>
                                {showFeeOptions && (
                                <div className='fee-options'>
                                    {['0.01%', '0.05%', '0.30%', '1.00%'].map(fee => (
                                    <div
                                        key={fee}
                                        className={`fee-option ${selectedFee === fee ? 'selected' : ''}`}
                                        onClick={() => selectFeeOption(fee)}
                                    >
                                        {fee} fee tier
                                    </div>
                                    ))}
                                </div>
                                )}
                            </div>
                        )}

                        {selectedAccount.connectedNodeAddress && fromToken && toToken && (
                            <div className='initial-prices'>
                                <div className='price-info'>
                                    <span>{fromToken.symbol}/{toToken.symbol} price:</span>
                                    <span>{poolExists ? (fromAmount / toAmount).toFixed(4) : '-'}</span>
                                </div>
                                <div className='price-info'>
                                    <span>{toToken.symbol}/{fromToken.symbol} price:</span>
                                    <span>{poolExists ? (toAmount / fromAmount).toFixed(4) : '-'}</span>
                                </div>
                                <div className='pool-share'>
                                    <span>Share of pool:</span>
                                    <span>0%</span>
                                </div>
                            </div>
                        )}

                        <div className="swap-footer">
                            <footer className='swap-footer-btn'>
                                <button 
                                    className="btn-primary" 
                                    disabled={addLiquidityButtonState .disabled} 
                                    onClick={selectedAccount?.connectedNodeAddress ? handleAddLiquidity : handleConnectToNode}
                                >
                                    {addLiquidityButtonState .text}
                                </button>
                            </footer>
                        </div>
                    </div>
                </div>
            </div>
            {(showFromTokenDropdown || showToTokenDropdown) && (
                <div className='modal-overlay'>
                    <div className='token-modal'>
                        <div className='token-modal-content'>
                            <div className='token-modal-header'>
                                <div className='modal-title'>{showFromTokenDropdown ? 'Swap from' : 'Swap to'}</div>
                                <button onClick={() => {
                                    setShowFromTokenDropdown(false);
                                    setShowToTokenDropdown(false);
                                }}>✕</button>
                            </div>
                            <div className='token-modal-search-box'>
                                <div className='token-modal-search'>
                                    <div className='token-modal-search-content'>
                                        <img src={searchIcon} className='search-icon'></img>
                                        <input type='text' placeholder='Enter token name or paste address' />
                                    </div>    
                                </div>
                                <div className='searchable-list'>
                                    <div className='searchable-list-container'>
                                        {tokens.map(token => (
                                            <div
                                                key={token.id}
                                                className='token-modal-item'
                                                onClick={() => handleTokenSelect(token, showFromTokenDropdown ? setFromToken : setToToken)}
                                            >
                                                <img src={token.logo} alt={token.name} className='token-modal-logo' />
                                                <div className='token-modal-info'>
                                                    <span className='token-modal-name'>{token.name}</span>
                                                    <span className='token-modal-symbol'>{token.symbol}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AddLiquidity;
