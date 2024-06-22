import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import AccountHeader from './AccountHeader';
import Header from '../components/Header';
import { useAccount } from '../AccountContext';

import '../components/Button.css';
import './SwapCoin.css';
import './Homepage.css';

import dropIcon from '../assets/dropdown-icon.svg';
import ethereum from '../assets/coin/ethereum.png';
import switchIcon from '../assets/switch.png';

function SwapCoin() {
    const { selectedAccount, truncateAddress, copyAddress } = useAccount();
    const navigate = useNavigate();
    const [tokens, setTokens] = useState([]);
    const [balances, setBalances] = useState({});
    const [fromToken, setFromToken] = useState({ symbol: 'ETH', logo: ethereum });
    const [toToken, setToToken] = useState(null);
    const [fromAmount, setFromAmount] = useState(0);
    const [showFromTokenDropdown, setShowFromTokenDropdown] = useState(false);
    const [showToTokenDropdown, setShowToTokenDropdown] = useState(false);

    useEffect(() => {
        fetchTokens();
    }, []);

    useEffect(() => {
        if (selectedAccount) {
            const accountBalances = {};
            selectedAccount.balances.forEach(balance => {
                accountBalances[balance.token] = balance.amount;
            });
            setBalances(accountBalances);
        }
    }, [selectedAccount]);

    const fetchTokens = async () => {
        try {
            const response = await fetch('http://localhost:3001/tokens');
            const data = await response.json();
            setTokens(data);
        } catch (error) {
            console.error('Error fetching tokens:', error);
        }
    };

    const getSwapButtonState = () => {
        if (!fromToken || !toToken) {
            return { disabled: true, text: "Select Token" };
        }
        if (!fromAmount) {
            return { disabled: true, text: "Enter an Amount" };
        }
        return { disabled: false, text: "Swap" };
    };

    const swapButtonState = getSwapButtonState();

    const handleCancel = () => {
        navigate('/homepage');
    };

    const handleTokenSelect = (token, setToken) => {
        setToken(token);
        setShowFromTokenDropdown(false);
        setShowToTokenDropdown(false);
    };

    const handleSwitch = () => {
        const temp = fromToken;
        setFromToken(toToken);
        setToToken(temp);
    };

    const getBalance = (token) => {
        if (!token) return 0;
        return balances[token.symbol] || 0;
    };

    return (
        <div className={`app-content-wrapper ${showFromTokenDropdown || showToTokenDropdown ? 'modal-open' : ''}`}>
            <div className='app-content'>
                <Header />
                {selectedAccount && (
                    <AccountHeader
                        selectedAccount={selectedAccount}
                        setShowAccountSelector={() => {}}
                        truncateAddress={truncateAddress}
                        copyAddress={copyAddress}
                    />
                )}
                <div className='swap-coin-wrapper'>
                    <div className="swap-coin-content">
                        <div className='swap-coin-header'>
                            <h2 className='title'>Swap</h2>
                            <button className='btn-link' onClick={handleCancel}>Cancel</button>
                        </div>

                        <div className='prepare-swap-wrapper'>
                            <div className='prepare-swap'>
                                <div className='prepare-swap-from'>
                                    <div className='from-token'>
                                        <div className='from-token-dropdown' onClick={() => setShowFromTokenDropdown(true)}>
                                            <div className='from-token-list'>
                                                {fromToken && <img src={fromToken.logo} alt={fromToken.symbol} className='token-logo' />}
                                                <span className='from-token-name'>{fromToken ? fromToken.symbol : 'Select token'}</span>
                                            </div>
                                            <img src={dropIcon} className="dropdown-search" alt="Dropdown" />
                                        </div>
                                        <input 
                                            type='number' 
                                            value={fromAmount} 
                                            onChange={(e) => setFromAmount(e.target.value)} 
                                            className='amount-input' 
                                        />
                                    </div>
                                    <div className='balance'>
                                        Balance: {getBalance(fromToken)}
                                    </div>
                                    <div className="btn-switch-container">
                                        <button className="btn-switch" onClick={handleSwitch}>
                                            <img src={switchIcon} className="switch-icon" alt="Swap" />
                                        </button>
                                    </div>
                                </div>
                                <div className='prepare-swap-to'>
                                    <div className='to-token'>
                                        <div className='from-token-dropdown' onClick={() => setShowToTokenDropdown(true)}>
                                            <div className='from-token-list'>
                                                {toToken && <img src={toToken.logo} alt={toToken.symbol} className='token-logo' />}
                                                <span className='from-token-name'>{toToken ? toToken.symbol : 'Select token'}</span>
                                            </div>
                                            <img src={dropIcon} className="dropdown-search" alt="Dropdown" />
                                        </div>
                                    </div>
                                    <div className='balance'>
                                        Balance: {getBalance(toToken)}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="swap-footer">
                            <footer className='swap-footer-btn'>
                                <button className="btn-primary" disabled={swapButtonState.disabled}>
                                    {swapButtonState.text}
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
                                <h3>{showFromTokenDropdown ? 'Swap from' : 'Swap to'}</h3>
                                <button onClick={() => {
                                    setShowFromTokenDropdown(false);
                                    setShowToTokenDropdown(false);
                                }}>✕</button>
                            </div>
                            <div className='token-search'>
                                <input type='text' placeholder='Enter token name or paste address' />
                            </div>
                            <div className='token-list'>
                                {tokens.map(token => (
                                    <div
                                        key={token.id}
                                        className='token-item'
                                        onClick={() => handleTokenSelect(token, showFromTokenDropdown ? setFromToken : setToToken)}
                                    >
                                        <img src={token.logo} alt={token.name} className='token-logo' />
                                        <div className='token-info'>
                                            <span className='token-name'>{token.name}</span>
                                            <span className='token-symbol'>{token.symbol}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SwapCoin;
