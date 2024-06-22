// SwapCoin.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountHeader from './AccountHeader';
import Header from '../components/Header';
import { useAccount } from '../AccountContext';
import './SwapCoin.css';
import './Homepage.css';
import dropIcon from '../assets/dropdown-icon.svg';
import swapIcon from '../assets/swap-icon.svg'; // Add path to your swap icon

function SwapCoin() {
    const { selectedAccount, truncateAddress, copyAddress } = useAccount();
    const navigate = useNavigate();
    const [tokens, setTokens] = useState([]);
    const [fromToken, setFromToken] = useState({ symbol: 'DAI', logo: 'path/to/dai-icon.png' });
    const [toToken, setToToken] = useState(null);
    const [fromAmount, setFromAmount] = useState(0);
    const [showFromTokenDropdown, setShowFromTokenDropdown] = useState(false);
    const [showToTokenDropdown, setShowToTokenDropdown] = useState(false);

    useEffect(() => {
        fetchTokens();
    }, []);

    const fetchTokens = async () => {
        try {
            const response = await fetch('http://localhost:3001/tokens');
            const data = await response.json();
            setTokens(data);
        } catch (error) {
            console.error('Error fetching tokens:', error);
        }
    };

    const handleCancel = () => {
        navigate('/homepage');
    };

    const handleTokenSelect = (token, setToken) => {
        setToken(token);
        setShowFromTokenDropdown(false);
        setShowToTokenDropdown(false);
    };

    const handleSwap = () => {
        const temp = fromToken;
        setFromToken(toToken);
        setToToken(temp);
    };

    return (
        <div className={`app-content-wrapper ${showFromTokenDropdown || showToTokenDropdown ? 'modal-open' : ''}`}>
            <div className='app-content'>
                <Header />
                <AccountHeader
                    selectedAccount={selectedAccount}
                    truncateAddress={truncateAddress}
                    copyAddress={copyAddress}
                />
                <div className='swap-coin-wrapper'>
                    <div className="swap-coin-content">
                        <div className='swap-coin-header'>
                            <h2 className='title'>Swap</h2>
                            <button className='btn-link' onClick={handleCancel}>Cancel</button>
                        </div>

                        <div className='prepare-swap'>
                            <div className='prepare-swap-from'>
                                <div className='from-token' onClick={() => setShowFromTokenDropdown(true)}>
                                    <div className='from-token-dropdown'>
                                        {fromToken && <img src={fromToken.logo} alt={fromToken.symbol} />}
                                        <span className='from-token-symbol'>{fromToken ? fromToken.symbol : 'Select token'}</span>
                                        <img src={dropIcon} className="dropdown-icon" alt="Dropdown" />
                                    </div>
                                    <input 
                                        type='number' 
                                        value={fromAmount} 
                                        onChange={(e) => setFromAmount(e.target.value)} 
                                        className='amount-input' 
                                    />
                                </div>
                                <div className='balance'>
                                    Balance: 0
                                </div>
                            </div>
                            <div className="button-wrapper">
                                <button className="round-button" onClick={handleSwap}>
                                    <img src={swapIcon} className="button-icon" alt="Swap" />
                                </button>
                            </div>
                            <div className='prepare-swap-to'>
                                <div className='token-selector' onClick={() => setShowToTokenDropdown(true)}>
                                    <div className='token'>
                                        {toToken && <img src={toToken.logo} alt={toToken.symbol} />}
                                        <span className='to-token-symbol'>{toToken ? toToken.symbol : 'Select token'}</span>
                                        <img src={dropIcon} className="dropdown-icon" alt="Dropdown" />
                                    </div>
                                    <div className='balance'>
                                        Balance: 0
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='swap-footer'>
                            <button className='swap-button'>Swap</button>
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
